import type { ThemeData } from "./types";

const STYLE =
  "Cinematic moody interior photography, low-key warm tungsten lighting, deep shadow with a single warm amber accent, hand-poured candles glowing softly on dark wood, slow editorial mood, warm grain.";

export const hearth: ThemeData = {
  slug: "hearth",
  shop: {
    name: "Hearth",
    tagline: "Light low.",
    description:
      "Slow-burning candles, room sprays, and incense for the long hours of the evening.",
    designPOV:
      "Moody cinematic — warm low-key imagery, oversized serif drop caps, slow editorial scroll.",
    imageStyle: STYLE,
  },
  products: [
    {
      id: "1601",
      handle: "smoldering-cedar-candle",
      title: "Smoldering Cedar Candle",
      description:
        "Hand-poured 9oz coconut-soy candle with cedar, leather, and a thread of tobacco smoke.",
      productType: "Candle",
      tags: ["candle", "bestseller"],
      options: [{ name: "Size", values: ["6oz", "9oz"] }],
      variants: [
        { id: "2601", title: "6oz", price: 38, options: [{ name: "Size", value: "6oz" }] },
        { id: "2602", title: "9oz", price: 56, options: [{ name: "Size", value: "9oz" }] },
      ],
      images: [
        {
          path: "products/smoldering-cedar-candle/1.png",
          alt: "Smoldering Cedar Candle, lit",
          prompt:
            "A hand-poured candle in an amber smoked-glass vessel, lit, photographed on a dark walnut surface in a near-black room, single warm amber rim of candlelight, deep cinematic shadow, slow editorial mood, no extra text.",
        },
      ],
      collectionHandles: ["candles", "evening"],
    },
    {
      id: "1602",
      handle: "dusk-room-spray",
      title: "Dusk Room Spray",
      description:
        "Bergamot, vetiver, and a whisper of clove. Refreshes a room in two breaths.",
      productType: "Room Spray",
      tags: ["spray"],
      options: [{ name: "Size", values: ["100ml"] }],
      variants: [
        { id: "2610", title: "100ml", price: 42, options: [{ name: "Size", value: "100ml" }] },
      ],
      images: [
        {
          path: "products/dusk-room-spray/1.png",
          alt: "Dusk Room Spray bottle",
          prompt:
            "A dark amber-glass room-spray bottle with a matte black collar, photographed on a dark walnut surface against deep shadow, single warm tungsten side light, cinematic editorial mood, no extra text.",
        },
      ],
      collectionHandles: ["sprays", "evening"],
    },
    {
      id: "1603",
      handle: "ember-reed-diffuser",
      title: "Ember Reed Diffuser",
      description:
        "Slow-release reed diffuser in fig, oak, and a smoky resin base.",
      productType: "Diffuser",
      tags: ["diffuser"],
      options: [{ name: "Size", values: ["200ml"] }],
      variants: [
        { id: "2620", title: "200ml", price: 68, options: [{ name: "Size", value: "200ml" }] },
      ],
      images: [
        {
          path: "products/ember-reed-diffuser/1.png",
          alt: "Ember Reed Diffuser",
          prompt:
            "A short, dark-glass reed-diffuser bottle with thin natural reeds rising from it, photographed on a dark walnut shelf with a single warm tungsten light catching the bottle edge, deep shadow, slow cinematic editorial mood, no extra text.",
        },
      ],
      collectionHandles: ["evening"],
    },
  ],
  collections: [
    {
      id: "3601",
      handle: "candles",
      title: "Candles",
      description: "Hand-poured, long-burning, scented for the long hours.",
      image: {
        path: "collections/candles.png",
        alt: "Candles collection",
        prompt:
          "Three lit hand-poured candles on a dark walnut shelf in a near-black room, warm amber glow, deep cinematic shadow, slow editorial mood, no extra text.",
        width: 1200,
        height: 800,
      },
    },
    {
      id: "3602",
      handle: "sprays",
      title: "Sprays",
      description: "Bottled atmosphere.",
      image: {
        path: "collections/sprays.png",
        alt: "Sprays collection",
        prompt:
          "Two dark amber-glass spray bottles arranged on a dark walnut surface, single warm tungsten light from the side, deep shadow, cinematic editorial composition, no extra text.",
        width: 1200,
        height: 800,
      },
    },
    {
      id: "3603",
      handle: "evening",
      title: "Evening",
      description: "Everything we light at dusk.",
      image: {
        path: "collections/evening.png",
        alt: "Evening — fragrance still life",
        prompt:
          "A still life of a lit amber candle, a small reed diffuser, and a glass of wine on a dark walnut table in a near-black room, warm tungsten glow, slow cinematic editorial mood, no extra text.",
        width: 1200,
        height: 800,
      },
    },
  ],
};
