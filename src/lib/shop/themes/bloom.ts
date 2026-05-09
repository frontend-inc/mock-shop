import type { ThemeData } from "./types";

const STYLE =
  "Soft pastel beauty product photography, peach / butter / sage palette, diffuse window light from camera left, frosted glass and ceramic surfaces, breathy minimal composition, fine-grain editorial.";

export const bloom: ThemeData = {
  slug: "bloom",
  shop: {
    name: "Bloom",
    tagline: "Quiet skin.",
    description:
      "Clean, well-formulated skincare with short ingredient lists and softer scents.",
    designPOV:
      "Soft pastels (peach, butter, sage), bento grids, mixed serif + grotesk, lots of air.",
    imageStyle: STYLE,
  },
  products: [
    {
      id: "1501",
      handle: "quiet-cleansing-balm",
      title: "Quiet Cleansing Balm",
      description:
        "A melting oil-to-milk cleanser with squalane and chamomile. Removes SPF without stripping.",
      productType: "Cleanser",
      tags: ["cleanse", "new"],
      options: [{ name: "Size", values: ["50ml", "100ml"] }],
      variants: [
        { id: "2501", title: "50ml", price: 32, options: [{ name: "Size", value: "50ml" }] },
        { id: "2502", title: "100ml", price: 48, options: [{ name: "Size", value: "100ml" }] },
      ],
      images: [
        {
          path: "products/quiet-cleansing-balm/1.png",
          alt: "Quiet Cleansing Balm jar",
          prompt:
            "A small frosted-glass jar of soft butter-yellow cleansing balm with a peach minimal label, photographed top-down on a sage ceramic plate with a sprig of chamomile, diffuse window light, breathy pastel composition, no extra text.",
        },
      ],
      collectionHandles: ["cleanse", "everyday"],
    },
    {
      id: "1502",
      handle: "petal-toning-mist",
      title: "Petal Toning Mist",
      description:
        "Fine-spray mist of rose hydrosol and 1% niacinamide. Sets makeup, cools the face.",
      productType: "Toner",
      tags: ["mist"],
      options: [{ name: "Size", values: ["100ml"] }],
      variants: [
        { id: "2510", title: "100ml", price: 28, options: [{ name: "Size", value: "100ml" }] },
      ],
      images: [
        {
          path: "products/petal-toning-mist/1.png",
          alt: "Petal Toning Mist bottle",
          prompt:
            "A frosted glass mist bottle with a soft peach gradient label, photographed standing on a butter-yellow paper backdrop next to scattered fresh rose petals, diffuse window light, soft pastel composition, no extra text.",
        },
      ],
      collectionHandles: ["everyday"],
    },
    {
      id: "1503",
      handle: "sunlit-vitamin-c-serum",
      title: "Sunlit Vitamin C Serum",
      description:
        "10% stabilized THD ascorbate serum. Brightens, evens tone, stable in daylight.",
      productType: "Serum",
      tags: ["treat", "bestseller"],
      options: [{ name: "Size", values: ["30ml"] }],
      variants: [
        { id: "2520", title: "30ml", price: 64, options: [{ name: "Size", value: "30ml" }] },
      ],
      images: [
        {
          path: "products/sunlit-vitamin-c-serum/1.png",
          alt: "Sunlit Vitamin C Serum",
          prompt:
            "A small amber-tinted dropper bottle with a butter-yellow label sitting on a sage ceramic dish, soft window light, breathy pastel beauty composition, no extra text.",
        },
      ],
      collectionHandles: ["treat", "everyday"],
    },
  ],
  collections: [
    {
      id: "3501",
      handle: "cleanse",
      title: "Cleanse",
      description: "First step. Slow and soft.",
      image: {
        path: "collections/cleanse.png",
        alt: "Cleanse collection",
        prompt:
          "An overhead bento-grid still life of a cleansing balm jar, a frosted bottle of micellar water, and a folded cream washcloth on a butter-yellow paper background, diffuse window light, breathy pastel composition, no extra text.",
        width: 1200,
        height: 800,
      },
    },
    {
      id: "3502",
      handle: "treat",
      title: "Treat",
      description: "Targeted, uncluttered, formulated for skin you respect.",
      image: {
        path: "collections/treat.png",
        alt: "Treat collection",
        prompt:
          "Three small dropper serum bottles in butter, peach, and sage tones arranged on a sage ceramic plate, soft window light, breathy pastel beauty composition, no extra text.",
        width: 1200,
        height: 800,
      },
    },
    {
      id: "3503",
      handle: "everyday",
      title: "Everyday",
      description: "What you actually use every morning.",
      image: {
        path: "collections/everyday.png",
        alt: "Everyday set",
        prompt:
          "A breathy pastel flat lay on a butter-yellow paper background showing a cleansing balm jar, a mist bottle, and a serum dropper arranged on a soft peach linen, scattered chamomile flowers, diffuse window light, no extra text.",
        width: 1200,
        height: 800,
      },
    },
  ],
};
