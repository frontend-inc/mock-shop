import type { ThemeData } from "./types";

const STYLE =
  "Brutalist studio sneaker photography, monochrome black/white/grey with a single color accent, hard top light, deep cast shadow on a polished concrete floor, clinical product clarity, museum-archive aesthetic.";

export const tread: ThemeData = {
  slug: "tread",
  shop: {
    name: "Tread",
    tagline: "Index. Iterate. Step.",
    description:
      "A small archive of footwear, indexed by silhouette and revisited each season.",
    designPOV:
      "Brutalist mono, off-Helvetica display, indexical numbering (01 / 02 / 03), grid-heavy, b/w + one accent.",
    imageStyle: STYLE,
  },
  products: [
    {
      id: "1401",
      handle: "01-runner-lo",
      title: "01 / Runner Lo",
      description:
        "Low-profile mesh runner over a dual-density EVA midsole. Designed for the daily.",
      productType: "Sneakers",
      tags: ["lo", "runner"],
      options: [
        { name: "Color", values: ["Bone", "Black"] },
        { name: "Size", values: ["8", "9", "10", "11"] },
      ],
      variants: [
        { id: "2401", title: "Bone / 9", price: 168, options: [{ name: "Color", value: "Bone" }, { name: "Size", value: "9" }] },
        { id: "2402", title: "Bone / 10", price: 168, options: [{ name: "Color", value: "Bone" }, { name: "Size", value: "10" }] },
        { id: "2403", title: "Black / 10", price: 168, options: [{ name: "Color", value: "Black" }, { name: "Size", value: "10" }] },
      ],
      images: [
        {
          path: "products/01-runner-lo/1.png",
          alt: "01 Runner Lo profile",
          prompt:
            "A bone-colored low-profile mesh runner sneaker shot in strict side profile, single hard top light casting a long shadow on polished grey concrete, clinical product clarity, brutalist composition, no logos, no text.",
        },
      ],
      collectionHandles: ["lo", "archive"],
    },
    {
      id: "1402",
      handle: "02-court-mid",
      title: "02 / Court Mid",
      description:
        "Mid-cut leather court silhouette, blind-stitched at the toe, vulcanized rubber outsole.",
      productType: "Sneakers",
      tags: ["mid", "court"],
      options: [
        { name: "Color", values: ["White", "Black"] },
        { name: "Size", values: ["9", "10", "11"] },
      ],
      variants: [
        { id: "2410", title: "White / 10", price: 198, options: [{ name: "Color", value: "White" }, { name: "Size", value: "10" }] },
        { id: "2411", title: "Black / 10", price: 198, options: [{ name: "Color", value: "Black" }, { name: "Size", value: "10" }] },
      ],
      images: [
        {
          path: "products/02-court-mid/1.png",
          alt: "02 Court Mid profile",
          prompt:
            "A white leather mid-cut court sneaker with a vulcanized rubber outsole and a single red accent at the heel pull, strict side profile on polished grey concrete, hard top light, brutalist studio aesthetic, no logos, no text.",
        },
      ],
      collectionHandles: ["mid", "archive"],
    },
    {
      id: "1403",
      handle: "03-trail-vector",
      title: "03 / Trail Vector",
      description:
        "Lugged trail silhouette with a TPU shank and a gusseted tongue.",
      productType: "Sneakers",
      tags: ["trail"],
      options: [{ name: "Size", values: ["9", "10", "11"] }],
      variants: [
        { id: "2420", title: "Size 9", price: 218, options: [{ name: "Size", value: "9" }] },
        { id: "2421", title: "Size 10", price: 218, options: [{ name: "Size", value: "10" }] },
      ],
      images: [
        {
          path: "products/03-trail-vector/1.png",
          alt: "03 Trail Vector profile",
          prompt:
            "A black-and-grey lugged trail sneaker with a single safety-orange accent on the speed lacing, strict side profile on polished concrete, hard top studio light, clinical brutalist composition, no logos, no text.",
        },
      ],
      collectionHandles: ["lo", "archive"],
    },
  ],
  collections: [
    {
      id: "3401",
      handle: "lo",
      title: "Lo",
      description: "Low-cut silhouettes.",
      image: {
        path: "collections/lo.png",
        alt: "Lo — three sneakers in profile",
        prompt:
          "Three low-cut sneakers in bone, black, and grey arranged in strict side profile across a horizontal grid on polished concrete, hard top light, brutalist museum aesthetic, no logos, no text.",
        width: 1200,
        height: 800,
      },
    },
    {
      id: "3402",
      handle: "mid",
      title: "Mid",
      description: "Mid-cut silhouettes.",
      image: {
        path: "collections/mid.png",
        alt: "Mid — court silhouettes",
        prompt:
          "Two mid-cut leather court sneakers in white and black, strict side profile on polished concrete, hard top light, brutalist museum composition, no logos, no text.",
        width: 1200,
        height: 800,
      },
    },
    {
      id: "3403",
      handle: "archive",
      title: "Archive",
      description: "Every silhouette, indexed.",
      image: {
        path: "collections/archive.png",
        alt: "Archive — grid of sneakers",
        prompt:
          "An overhead grid of six sneakers (mix of lo, mid, and trail) arranged in strict rows on polished concrete, clinical hard light, brutalist museum aesthetic, no logos, no text.",
        width: 1200,
        height: 800,
      },
    },
  ],
};
