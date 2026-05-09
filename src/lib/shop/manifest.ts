// Per-theme image manifest. The image-generation script writes the matching
// JSON file under themes/{slug}.images.json. The runtime reads it to decide
// whether to serve a Supabase URL (image is generated) or a placeholder.

import type { ThemeSlug } from "./themes";

import maisonManifest from "./themes/maison.images.json";
import pulseManifest from "./themes/pulse.images.json";
import fermentManifest from "./themes/ferment.images.json";
import pantryManifest from "./themes/pantry.images.json";
import treadManifest from "./themes/tread.images.json";
import bloomManifest from "./themes/bloom.images.json";
import hearthManifest from "./themes/hearth.images.json";
import roastManifest from "./themes/roast.images.json";
import frameManifest from "./themes/frame.images.json";
import trailManifest from "./themes/trail.images.json";

type Manifest = { paths: string[] };

const manifests: Record<ThemeSlug, Manifest> = {
  maison: maisonManifest,
  pulse: pulseManifest,
  ferment: fermentManifest,
  pantry: pantryManifest,
  tread: treadManifest,
  bloom: bloomManifest,
  hearth: hearthManifest,
  roast: roastManifest,
  frame: frameManifest,
  trail: trailManifest,
};

export function loadManifest(slug: ThemeSlug): string[] {
  return manifests[slug]?.paths ?? [];
}
