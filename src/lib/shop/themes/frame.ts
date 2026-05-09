import type { ThemeData } from "./types";

const STYLE =
  "Architectural eyewear photography, monochrome black and white, gallery wall backdrop, single overhead spotlight casting a clean shadow, full-bleed crispness, museum-label restraint, oversized scale.";

export const frame: ThemeData = {
  slug: "frame",
  shop: {
    name: "Frame",
    tagline: "Look thoughtfully.",
    description:
      "An eyewear studio making a small archive of optical and sun frames.",
    designPOV:
      "Monochrome architectural, oversized type, full-bleed product photography, museum-label captions.",
    imageStyle: STYLE,
  },
  products: [
    {
      id: "1801",
      handle: "plinth-optical",
      title: "Plinth Optical",
      description:
        "Heavy-set acetate optical frame with squared brow line. Hand-polished in Cadore, Italy.",
      productType: "Optical",
      tags: ["optical", "acetate"],
      options: [
        { name: "Color", values: ["Black", "Tortoise"] },
        { name: "Size", values: ["48", "50", "52"] },
      ],
      variants: [
        { id: "2801", title: "Black / 50", price: 295, options: [{ name: "Color", value: "Black" }, { name: "Size", value: "50" }] },
        { id: "2802", title: "Tortoise / 50", price: 295, options: [{ name: "Color", value: "Tortoise" }, { name: "Size", value: "50" }] },
      ],
      images: [
        {
          path: "products/plinth-optical/1.png",
          alt: "Plinth Optical frame",
          prompt:
            "A heavy-set black acetate optical eyewear frame photographed in strict three-quarter view against a clean white gallery wall, single overhead spotlight casting a precise shadow on the wall, museum archival presentation, no logos, no text.",
        },
      ],
      collectionHandles: ["optical", "archive"],
    },
    {
      id: "1802",
      handle: "vista-sun",
      title: "Vista Sun",
      description:
        "Oversized rectangular sun frame with smoke-grey lenses and pin hinges.",
      productType: "Sun",
      tags: ["sun"],
      options: [{ name: "Color", values: ["Black", "Crystal"] }],
      variants: [
        { id: "2810", title: "Black", price: 325, options: [{ name: "Color", value: "Black" }] },
        { id: "2811", title: "Crystal", price: 325, options: [{ name: "Color", value: "Crystal" }] },
      ],
      images: [
        {
          path: "products/vista-sun/1.png",
          alt: "Vista Sun frame",
          prompt:
            "An oversized rectangular black acetate sun frame with smoke-grey lenses, photographed in strict front view full-bleed against a white gallery wall, single overhead spotlight casting a clean shadow, monochrome architectural presentation, no logos, no text.",
        },
      ],
      collectionHandles: ["sun", "archive"],
    },
    {
      id: "1803",
      handle: "index-reader",
      title: "Index Reader",
      description:
        "A pared-back metal reader frame in brushed silver. Available in +1.0 to +2.5.",
      productType: "Optical",
      tags: ["reader"],
      options: [{ name: "Strength", values: ["+1.0", "+1.5", "+2.0", "+2.5"] }],
      variants: [
        { id: "2820", title: "+1.5", price: 165, options: [{ name: "Strength", value: "+1.5" }] },
        { id: "2821", title: "+2.0", price: 165, options: [{ name: "Strength", value: "+2.0" }] },
      ],
      images: [
        {
          path: "products/index-reader/1.png",
          alt: "Index Reader frame",
          prompt:
            "A minimal brushed-silver metal reader eyewear frame photographed in three-quarter view against a clean white gallery wall, single overhead spotlight, precise shadow, museum-archival composition, no logos, no text.",
        },
      ],
      collectionHandles: ["optical"],
    },
  ],
  collections: [
    {
      id: "3801",
      handle: "optical",
      title: "Optical",
      description: "Frames designed to live on a face every day.",
      image: {
        path: "collections/optical.png",
        alt: "Optical archive",
        prompt:
          "Three optical eyewear frames (black, tortoise, brushed silver) arranged in a clean horizontal row against a white gallery wall, single overhead spotlight, museum archival monochrome composition, no logos, no text.",
        width: 1200,
        height: 800,
      },
    },
    {
      id: "3802",
      handle: "sun",
      title: "Sun",
      description: "Tinted, polished, generous in scale.",
      image: {
        path: "collections/sun.png",
        alt: "Sun frames",
        prompt:
          "Two oversized sun frames (one black, one crystal) arranged at slight angles on a white gallery wall, single overhead spotlight, monochrome architectural composition, no logos, no text.",
        width: 1200,
        height: 800,
      },
    },
    {
      id: "3803",
      handle: "archive",
      title: "Archive",
      description: "Every frame, indexed.",
      image: {
        path: "collections/archive.png",
        alt: "Archive — full grid of frames",
        prompt:
          "An overhead grid of six eyewear frames arranged in strict rows against a white surface, museum archival monochrome composition with single overhead light, no logos, no text.",
        width: 1200,
        height: 800,
      },
    },
  ],
};
