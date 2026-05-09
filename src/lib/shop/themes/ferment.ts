import type { ThemeData } from "./types";

const STYLE =
  "Y2K-coded product photography, saturated acid-green and electric-pink palette, glossy bottle highlights, soft chrome reflections, playful sticker and badge motifs in the composition, hyper-cheerful pop aesthetic.";

export const ferment: ThemeData = {
  slug: "ferment",
  shop: {
    name: "Ferment",
    tagline: "Fizz forward.",
    description:
      "Live-cultured kombucha, sparkling tonics, and zero-proof mocktails for people who like flavor loud.",
    designPOV:
      "Y2K-coded, saturated acid green + electric pink, big rounded display sans, sticker and badge motifs.",
    imageStyle: STYLE,
  },
  products: [
    {
      id: "1201",
      handle: "yuzu-ginger-kombucha",
      title: "Yuzu Ginger Kombucha",
      description:
        "Live-cultured kombucha brewed with Japanese yuzu and fresh-pressed ginger. 12oz, four-pack.",
      productType: "Kombucha",
      tags: ["kombucha", "live-culture"],
      options: [{ name: "Pack", values: ["4-pack", "12-pack"] }],
      variants: [
        { id: "2201", title: "4-pack", price: 18, options: [{ name: "Pack", value: "4-pack" }] },
        { id: "2202", title: "12-pack", price: 48, options: [{ name: "Pack", value: "12-pack" }] },
      ],
      images: [
        {
          path: "products/yuzu-ginger-kombucha/1.png",
          alt: "Yuzu Ginger Kombucha bottle",
          prompt:
            "A glass kombucha bottle with an acid-green liquid and an electric-pink wraparound label that reads YUZU GINGER in giant rounded sans-serif, photographed against a glossy chrome backdrop with bubbly cartoon sticker motifs, hyper-saturated Y2K aesthetic, no extra text.",
        },
      ],
      collectionHandles: ["kombucha", "new-arrivals"],
    },
    {
      id: "1202",
      handle: "strawberry-basil-sparkling",
      title: "Strawberry Basil Sparkling",
      description:
        "Lightly sweetened sparkling water with cold-pressed strawberry and fresh basil oil.",
      productType: "Sparkling",
      tags: ["sparkling"],
      options: [{ name: "Pack", values: ["4-pack", "12-pack"] }],
      variants: [
        { id: "2210", title: "4-pack", price: 16, options: [{ name: "Pack", value: "4-pack" }] },
        { id: "2211", title: "12-pack", price: 42, options: [{ name: "Pack", value: "12-pack" }] },
      ],
      images: [
        {
          path: "products/strawberry-basil-sparkling/1.png",
          alt: "Strawberry Basil Sparkling can",
          prompt:
            "An aluminum can with an electric-pink body and acid-green wave label, photographed in three-quarter view against a glossy chrome backdrop with cartoon strawberry and basil-leaf sticker motifs, hyper-saturated Y2K product photography, no extra text.",
        },
      ],
      collectionHandles: ["sparkling", "new-arrivals"],
    },
    {
      id: "1203",
      handle: "clear-mojito-mocktail-mix",
      title: "Clear Mojito Mocktail Mix",
      description:
        "Concentrated lime-mint syrup. Just add soda. Yields 12 mocktails per bottle.",
      productType: "Mocktail",
      tags: ["mocktail", "zero-proof"],
      options: [{ name: "Size", values: ["375ml", "750ml"] }],
      variants: [
        { id: "2220", title: "375ml", price: 22, options: [{ name: "Size", value: "375ml" }] },
        { id: "2221", title: "750ml", price: 38, options: [{ name: "Size", value: "750ml" }] },
      ],
      images: [
        {
          path: "products/clear-mojito-mocktail-mix/1.png",
          alt: "Clear Mojito Mocktail bottle",
          prompt:
            "A tall clear glass bottle with a clear minty syrup inside and a wraparound acid-green label, fresh mint-leaf sticker decals around the bottle, glossy chrome backdrop, hyper-saturated Y2K aesthetic, no extra text.",
        },
      ],
      collectionHandles: ["mocktails"],
    },
  ],
  collections: [
    {
      id: "3201",
      handle: "kombucha",
      title: "Kombucha",
      description: "Live-cultured, low-sugar, full-flavor.",
      image: {
        path: "collections/kombucha.png",
        alt: "Kombucha collection",
        prompt:
          "Three glass kombucha bottles in acid green, electric pink, and lemon yellow lined up against a chrome wave backdrop, oversized cartoon bubble sticker decals, hyper-saturated Y2K composition, no extra text.",
        width: 1200,
        height: 800,
      },
    },
    {
      id: "3202",
      handle: "sparkling",
      title: "Sparkling",
      description: "Botanical-led fizz, by the can.",
      image: {
        path: "collections/sparkling.png",
        alt: "Sparkling collection",
        prompt:
          "A grid of four sparkling water cans in pink, green, blue, and yellow on a glossy chrome surface with cartoon water-droplet sticker decals, Y2K hyper-pop product photography, no extra text.",
        width: 1200,
        height: 800,
      },
    },
    {
      id: "3203",
      handle: "mocktails",
      title: "Mocktails",
      description: "Zero-proof, full effort.",
      image: {
        path: "collections/mocktails.png",
        alt: "Mocktails collection",
        prompt:
          "Two highball glasses with brightly-colored mocktails (acid green and electric pink) on a chrome bar surface, mint and citrus garnish, sticker-style sparkles overlaid, Y2K composition, no extra text.",
        width: 1200,
        height: 800,
      },
    },
    {
      id: "3204",
      handle: "new-arrivals",
      title: "New Arrivals",
      description: "Just released this week.",
      image: {
        path: "collections/new-arrivals.png",
        alt: "New arrivals — bright cans",
        prompt:
          "An overhead shot of pink and green beverage cans arranged in a starburst pattern on a chrome surface with NEW badge sticker motifs in the composition, Y2K hyper-pop, no extra text.",
        width: 1200,
        height: 800,
      },
    },
  ],
};
