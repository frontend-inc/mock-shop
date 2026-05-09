import type { ThemeData } from "./types";

const STYLE =
  "Food-zine still life, kraft paper and warm earth tones (terracotta, ochre, moss), botanical line-illustration motifs, soft natural daylight on a wooden farmhouse table, considered editorial composition, fine-grain analog feel.";

export const pantry: ThemeData = {
  slug: "pantry",
  shop: {
    name: "Pantry",
    tagline: "One ingredient. Done well.",
    description:
      "A small pantry of single-origin staples — olive oil, miso, hot sauce — sourced from makers we know.",
    designPOV:
      "Kraft + warm earth tones, botanical line motifs, serif headings, food-zine feel.",
    imageStyle: STYLE,
  },
  products: [
    {
      id: "1301",
      handle: "arbequina-olive-oil",
      title: "Cold-Pressed Arbequina Olive Oil",
      description:
        "Single-estate Arbequina pressed within hours of harvest. Buttery, peppery, fresh-cut grass on the finish.",
      productType: "Olive Oil",
      tags: ["oil", "single-origin"],
      options: [{ name: "Size", values: ["250ml", "500ml"] }],
      variants: [
        { id: "2301", title: "250ml", price: 28, options: [{ name: "Size", value: "250ml" }] },
        { id: "2302", title: "500ml", price: 48, options: [{ name: "Size", value: "500ml" }] },
      ],
      images: [
        {
          path: "products/arbequina-olive-oil/1.png",
          alt: "Arbequina olive oil bottle",
          prompt:
            "A dark green glass olive oil bottle with a kraft paper label featuring a botanical line illustration of an olive branch, photographed on a worn farmhouse wood table with a sprig of olive leaves beside it, warm natural daylight, food-zine still life, no extra text.",
        },
      ],
      collectionHandles: ["oils", "shelf-staples"],
    },
    {
      id: "1302",
      handle: "aged-white-miso",
      title: "Aged White Miso",
      description:
        "12-month aged shiro miso made with organic koji. Sweet, mellow, and deeply savory.",
      productType: "Ferment",
      tags: ["ferment", "miso"],
      options: [{ name: "Size", values: ["300g", "600g"] }],
      variants: [
        { id: "2310", title: "300g", price: 18, options: [{ name: "Size", value: "300g" }] },
        { id: "2311", title: "600g", price: 32, options: [{ name: "Size", value: "600g" }] },
      ],
      images: [
        {
          path: "products/aged-white-miso/1.png",
          alt: "Aged white miso jar",
          prompt:
            "A small ceramic jar of pale yellow miso paste sealed with a kraft paper lid wrap and twine, beside a wooden spoon with a smear of miso, on a warm wood farmhouse table in soft daylight, botanical line motif on the label, food-zine still life, no extra text.",
        },
      ],
      collectionHandles: ["ferments", "shelf-staples"],
    },
    {
      id: "1303",
      handle: "smoked-habanero-hot-sauce",
      title: "Smoked Habanero Hot Sauce",
      description:
        "Habaneros smoked over apple wood, fermented for six weeks, finished with sea salt.",
      productType: "Hot Sauce",
      tags: ["hot-sauce", "ferment"],
      options: [{ name: "Heat", values: ["Medium", "Hot"] }],
      variants: [
        { id: "2320", title: "Medium", price: 14, options: [{ name: "Heat", value: "Medium" }] },
        { id: "2321", title: "Hot", price: 14, options: [{ name: "Heat", value: "Hot" }] },
      ],
      images: [
        {
          path: "products/smoked-habanero-hot-sauce/1.png",
          alt: "Smoked habanero hot sauce bottle",
          prompt:
            "A small clear glass hot-sauce bottle with deep orange-red sauce inside and a kraft paper label featuring a botanical chili line illustration, beside a couple of dried habaneros on a wooden farmhouse table in warm daylight, food-zine still life, no extra text.",
        },
      ],
      collectionHandles: ["hot-sauces"],
    },
  ],
  collections: [
    {
      id: "3301",
      handle: "oils",
      title: "Oils",
      description: "Single-estate, fresh-pressed, cold-shipped.",
      image: {
        path: "collections/oils.png",
        alt: "Oils — bottles on wood",
        prompt:
          "Three dark glass olive oil bottles with kraft labels arranged on a worn farmhouse wood table with sprigs of fresh herbs, warm soft daylight, food-zine still life, no extra text.",
        width: 1200,
        height: 800,
      },
    },
    {
      id: "3302",
      handle: "ferments",
      title: "Ferments",
      description: "Slow-aged, koji-built, deeply savory.",
      image: {
        path: "collections/ferments.png",
        alt: "Ferments — jars and koji",
        prompt:
          "Two ceramic jars of miso paste with kraft-and-twine wraps on a worn farmhouse wood surface with a scattering of soybeans, warm daylight, food-zine still life, no extra text.",
        width: 1200,
        height: 800,
      },
    },
    {
      id: "3303",
      handle: "hot-sauces",
      title: "Hot Sauces",
      description: "Fermented, smoked, salt-finished.",
      image: {
        path: "collections/hot-sauces.png",
        alt: "Hot sauces — bottles and chilies",
        prompt:
          "A row of three small hot-sauce bottles with kraft chili-illustration labels on a wood farmhouse surface with a few dried chilies and a botanical sprig, warm daylight, food-zine still life, no extra text.",
        width: 1200,
        height: 800,
      },
    },
    {
      id: "3304",
      handle: "shelf-staples",
      title: "Shelf Staples",
      description: "The pantry essentials we restock first.",
      image: {
        path: "collections/shelf-staples.png",
        alt: "Shelf staples — pantry overview",
        prompt:
          "An overhead farmhouse-table flat lay of an olive oil bottle, a miso jar, a hot-sauce bottle, and fresh herbs, kraft labels with botanical line illustrations, warm soft daylight, food-zine still life, no extra text.",
        width: 1200,
        height: 800,
      },
    },
  ],
};
