import type { ThemeData } from "./types";

const STYLE =
  "Dark studio sports photography, low-key cinematic lighting with a single hard rim light, sodium-orange accent glow, technical mood, deep blacks, sweat-and-tarmac realism, sharp focus.";

export const pulse: ThemeData = {
  slug: "pulse",
  shop: {
    name: "Pulse",
    tagline: "Train colder. Run hotter.",
    description:
      "High-performance activewear engineered for athletes who track every metric.",
    designPOV:
      "Dark-mode default, technical mono accents, sodium-orange spike, hard edges (radius=none), large numeric data treatments.",
    imageStyle: STYLE,
  },
  products: [
    {
      id: "1101",
      handle: "strain-compression-tee",
      title: "Strain Compression Tee",
      description:
        "Engineered four-way stretch, seamless-knit compression. Worn under or as outer.",
      productType: "Tops",
      tags: ["new", "compression"],
      options: [
        { name: "Color", values: ["Black", "Carbon"] },
        { name: "Size", values: ["S", "M", "L", "XL"] },
      ],
      variants: [
        { id: "2101", title: "Black / S", price: 88, options: [{ name: "Color", value: "Black" }, { name: "Size", value: "S" }] },
        { id: "2102", title: "Black / M", price: 88, options: [{ name: "Color", value: "Black" }, { name: "Size", value: "M" }] },
        { id: "2103", title: "Black / L", price: 88, options: [{ name: "Color", value: "Black" }, { name: "Size", value: "L" }] },
        { id: "2104", title: "Carbon / M", price: 88, options: [{ name: "Color", value: "Carbon" }, { name: "Size", value: "M" }] },
      ],
      images: [
        {
          path: "products/strain-compression-tee/1.png",
          alt: "Strain Compression Tee on athlete",
          prompt:
            "A black seamless-knit compression tee on a muscular athlete from chest to waist, dark studio backdrop, single hard rim light from camera right with a sodium-orange edge glow, sweat sheen, no logos, no text.",
        },
      ],
      collectionHandles: ["training", "compression"],
    },
    {
      id: "1102",
      handle: "vector-run-short",
      title: "Vector 5\" Run Short",
      description:
        "Featherweight ripstop running short with internal liner. Reflective tab on rear hem.",
      productType: "Bottoms",
      tags: ["run", "summer"],
      options: [{ name: "Color", values: ["Black", "Sodium"] }],
      variants: [
        { id: "2110", title: "Black", price: 64, options: [{ name: "Color", value: "Black" }] },
        { id: "2111", title: "Sodium", price: 64, options: [{ name: "Color", value: "Sodium" }] },
      ],
      images: [
        {
          path: "products/vector-run-short/1.png",
          alt: "Vector Run Short in black",
          prompt:
            "A pair of featherweight black 5-inch ripstop running shorts photographed flat on a black asphalt surface under a hard sodium-orange streetlight, deep shadow, sharp focus, no logos, no text.",
        },
      ],
      collectionHandles: ["training"],
    },
    {
      id: "1103",
      handle: "apex-training-hoodie",
      title: "Apex Training Hoodie",
      description:
        "Heavyweight French terry hoodie with bonded seams and a thumbhole cuff.",
      productType: "Outerwear",
      tags: ["bestseller"],
      options: [{ name: "Color", values: ["Carbon", "Black"] }, { name: "Size", values: ["M", "L", "XL"] }],
      variants: [
        { id: "2120", title: "Carbon / M", price: 128, options: [{ name: "Color", value: "Carbon" }, { name: "Size", value: "M" }] },
        { id: "2121", title: "Carbon / L", price: 128, options: [{ name: "Color", value: "Carbon" }, { name: "Size", value: "L" }] },
        { id: "2122", title: "Black / L", price: 128, options: [{ name: "Color", value: "Black" }, { name: "Size", value: "L" }] },
      ],
      images: [
        {
          path: "products/apex-training-hoodie/1.png",
          alt: "Apex Training Hoodie on figure",
          prompt:
            "A heavyweight charcoal training hoodie shown on a hooded athlete from chest up, low-key dark studio, single hard rim light, sodium-orange highlight catching the hood edge, technical mood, no logos, no text.",
        },
      ],
      collectionHandles: ["training", "outerwear"],
    },
    {
      id: "1104",
      handle: "pulse-hr-strap",
      title: "Pulse HR Strap",
      description:
        "Bluetooth heart-rate chest strap. 18-month battery, 30m water resistance.",
      productType: "Accessories",
      tags: ["tech"],
      options: [{ name: "Size", values: ["S/M", "L/XL"] }],
      variants: [
        { id: "2130", title: "S/M", price: 96, options: [{ name: "Size", value: "S/M" }] },
        { id: "2131", title: "L/XL", price: 96, options: [{ name: "Size", value: "L/XL" }] },
      ],
      images: [
        {
          path: "products/pulse-hr-strap/1.png",
          alt: "Pulse HR Strap product shot",
          prompt:
            "A black bluetooth heart-rate chest strap with a small sensor module, photographed flat on dark brushed metal, single hard rim light from above with sodium-orange edge highlight, technical product photography, no logos, no text.",
        },
      ],
      collectionHandles: ["accessories"],
    },
  ],
  collections: [
    {
      id: "3101",
      handle: "training",
      title: "Training",
      description: "Built for the hardest sets of the week.",
      image: {
        path: "collections/training.png",
        alt: "Training collection — athlete in motion",
        prompt:
          "An athlete sprinting on a dark indoor track, motion blur on legs, single sodium-orange rim light, deep cinematic blacks, no logos, no text.",
        width: 1200,
        height: 800,
      },
    },
    {
      id: "3102",
      handle: "compression",
      title: "Compression",
      description: "Second-skin layers that move with you.",
      image: {
        path: "collections/compression.png",
        alt: "Compression — close-up of seamless knit",
        prompt:
          "Close-up macro of black seamless-knit compression fabric stretched over an arm, dark studio with a single hard sodium rim light, deep cinematic blacks, no logos, no text.",
        width: 1200,
        height: 800,
      },
    },
    {
      id: "3103",
      handle: "outerwear",
      title: "Outerwear",
      description: "Warmups, hoods, and shells.",
      image: {
        path: "collections/outerwear.png",
        alt: "Outerwear — hoodie on figure",
        prompt:
          "A hooded athlete in a charcoal training hoodie facing away from camera under a streetlight at night, sodium-orange backlight, dark cinematic mood, no logos, no text.",
        width: 1200,
        height: 800,
      },
    },
    {
      id: "3104",
      handle: "accessories",
      title: "Accessories",
      description: "Straps, sensors, and small kit.",
      image: {
        path: "collections/accessories.png",
        alt: "Accessories — gear flat lay",
        prompt:
          "A dark flat lay of a black HR strap, a digital stopwatch, and a black water bottle on dark brushed metal, single sodium-orange rim light, technical product still life, no logos, no text.",
        width: 1200,
        height: 800,
      },
    },
  ],
};
