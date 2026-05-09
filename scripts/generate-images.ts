/* eslint-disable no-console */
// Generate themed product/collection imagery via OpenRouter (Gemini 3.1 Flash
// Image, "Nano Banana 2") and upload each image to Supabase Storage at
// /assets/mock/{theme}/{path}.
//
// Usage:
//   yarn images:generate maison
//   yarn images:generate maison pulse        # multiple themes
//   yarn images:generate --all               # every theme
//   yarn images:generate maison --force      # regenerate even if uploaded
//   yarn images:generate maison --dry-run    # plan only, no API calls
//
// Env (read from .env via Node 22+ --env-file at run time):
//   OPENROUTER_API_KEY            required
//   NEXT_PUBLIC_SUPABASE_URL      required
//   SUPABASE_SERVICE_ROLE_KEY     required (uploads bypass bucket policies)

import fs from "node:fs/promises";
import path from "node:path";

import { THEMES, THEME_SLUGS, isThemeSlug } from "../src/lib/shop/themes";
import type {
  ThemeData,
  ThemeImagePrompt,
  ThemeSlug,
} from "../src/lib/shop/themes";

const OPENROUTER_MODEL = "google/gemini-3.1-flash-image-preview";
const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";
const BUCKET = "assets";

type Args = {
  themes: ThemeSlug[];
  force: boolean;
  dryRun: boolean;
};

function parseArgs(): Args {
  const argv = process.argv.slice(2);
  const themes: ThemeSlug[] = [];
  let force = false;
  let dryRun = false;
  let all = false;

  for (const a of argv) {
    if (a === "--force") force = true;
    else if (a === "--dry-run") dryRun = true;
    else if (a === "--all") all = true;
    else if (a.startsWith("--")) throw new Error(`Unknown flag: ${a}`);
    else if (isThemeSlug(a)) themes.push(a);
    else throw new Error(`Unknown theme: ${a}`);
  }

  if (all) return { themes: [...THEME_SLUGS], force, dryRun };
  if (themes.length === 0) {
    throw new Error(
      "Pass at least one theme slug, or --all. Slugs: " +
        THEME_SLUGS.join(", "),
    );
  }
  return { themes, force, dryRun };
}

function requireEnv(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env var: ${name}`);
  return v;
}

function collectPrompts(theme: ThemeData): ThemeImagePrompt[] {
  const out: ThemeImagePrompt[] = [];
  for (const p of theme.products) out.push(...p.images);
  for (const c of theme.collections) if (c.image) out.push(c.image);
  return out;
}

function manifestPath(slug: ThemeSlug): string {
  return path.join(
    process.cwd(),
    "src",
    "lib",
    "shop",
    "themes",
    `${slug}.images.json`,
  );
}

async function readManifest(slug: ThemeSlug): Promise<{ paths: string[] }> {
  try {
    const raw = await fs.readFile(manifestPath(slug), "utf8");
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed?.paths)) return { paths: parsed.paths };
  } catch {
    // No manifest yet.
  }
  return { paths: [] };
}

async function writeManifest(slug: ThemeSlug, paths: string[]): Promise<void> {
  const sorted = [...new Set(paths)].sort();
  await fs.writeFile(
    manifestPath(slug),
    JSON.stringify({ paths: sorted }, null, 2) + "\n",
    "utf8",
  );
}

type GeneratedImage = { mime: string; bytes: Uint8Array };

async function generateImage(
  apiKey: string,
  theme: ThemeData,
  prompt: ThemeImagePrompt,
): Promise<GeneratedImage> {
  const fullPrompt = `${prompt.prompt}\n\nStyle: ${theme.shop.imageStyle}`;
  const body = {
    model: OPENROUTER_MODEL,
    modalities: ["image", "text"],
    messages: [
      {
        role: "user",
        content: fullPrompt,
      },
    ],
  };

  const res = await fetch(OPENROUTER_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "https://mock-shop.local",
      "X-Title": "Mock Shop image generation",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(
      `OpenRouter ${res.status} ${res.statusText}: ${text.slice(0, 500)}`,
    );
  }

  const json = (await res.json()) as {
    choices?: {
      message?: {
        images?: { type?: string; image_url?: { url?: string } }[];
      };
    }[];
    error?: { message?: string };
  };

  const dataUrl =
    json.choices?.[0]?.message?.images?.[0]?.image_url?.url ?? null;
  if (!dataUrl) {
    throw new Error(
      `No image in response: ${JSON.stringify(json).slice(0, 500)}`,
    );
  }

  const m = /^data:([^;,]+);base64,(.+)$/i.exec(dataUrl);
  if (!m) throw new Error(`Unexpected image URL format: ${dataUrl.slice(0, 80)}`);
  const mime = m[1];
  const bytes = Buffer.from(m[2], "base64");
  return { mime, bytes };
}

async function uploadToSupabase(
  supabaseUrl: string,
  serviceKey: string,
  objectKey: string,
  img: GeneratedImage,
  upsert: boolean,
): Promise<string> {
  const url = `${supabaseUrl}/storage/v1/object/${BUCKET}/${objectKey}`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${serviceKey}`,
      apikey: serviceKey,
      "Content-Type": img.mime,
      "Cache-Control": "public, max-age=31536000, immutable",
      "x-upsert": upsert ? "true" : "false",
    },
    body: img.bytes,
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(
      `Supabase upload ${res.status} ${res.statusText}: ${text.slice(0, 300)}`,
    );
  }
  return `${supabaseUrl}/storage/v1/object/public/${BUCKET}/${objectKey}`;
}

async function existsInSupabase(
  supabaseUrl: string,
  objectKey: string,
): Promise<boolean> {
  const url = `${supabaseUrl}/storage/v1/object/public/${BUCKET}/${objectKey}`;
  const res = await fetch(url, { method: "HEAD" });
  return res.ok;
}

async function processTheme(
  slug: ThemeSlug,
  args: Args,
  env: { openrouter: string; supabaseUrl: string; serviceKey: string },
): Promise<void> {
  const theme = THEMES[slug];
  console.log(`\n=== ${slug} (${theme.shop.name}) ===`);

  const prompts = collectPrompts(theme);
  const manifest = await readManifest(slug);
  const known = new Set(manifest.paths);

  let generated = 0;
  let skipped = 0;
  let failed = 0;

  for (const p of prompts) {
    const objectKey = `mock/${slug}/${p.path}`;
    const isKnown = known.has(p.path);

    if (!args.force && isKnown) {
      console.log(`  skip   ${p.path} (manifest)`);
      skipped++;
      continue;
    }
    if (!args.force) {
      const present = await existsInSupabase(env.supabaseUrl, objectKey);
      if (present) {
        console.log(`  skip   ${p.path} (already in storage)`);
        known.add(p.path);
        skipped++;
        continue;
      }
    }

    if (args.dryRun) {
      console.log(`  plan   ${p.path}`);
      continue;
    }

    process.stdout.write(`  gen    ${p.path} ... `);
    try {
      const img = await generateImage(env.openrouter, theme, p);
      const publicUrl = await uploadToSupabase(
        env.supabaseUrl,
        env.serviceKey,
        objectKey,
        img,
        true,
      );
      known.add(p.path);
      generated++;
      console.log(`ok (${(img.bytes.byteLength / 1024).toFixed(0)}kb) → ${publicUrl}`);
      // Persist after each upload so a crash doesn't lose progress.
      await writeManifest(slug, [...known]);
    } catch (err) {
      failed++;
      console.log(`FAILED: ${(err as Error).message}`);
    }
  }

  if (!args.dryRun) await writeManifest(slug, [...known]);
  console.log(
    `  ${slug}: generated ${generated}, skipped ${skipped}, failed ${failed}`,
  );
}

async function main() {
  const args = parseArgs();

  const env = {
    openrouter: requireEnv("OPENROUTER_API_KEY"),
    supabaseUrl: requireEnv("NEXT_PUBLIC_SUPABASE_URL").replace(/\/+$/, ""),
    serviceKey: requireEnv("SUPABASE_SERVICE_ROLE_KEY"),
  };

  console.log(
    `Themes: ${args.themes.join(", ")} · model=${OPENROUTER_MODEL} · ${
      args.dryRun ? "DRY RUN" : args.force ? "FORCE" : "incremental"
    }`,
  );

  for (const slug of args.themes) {
    await processTheme(slug, args, env);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
