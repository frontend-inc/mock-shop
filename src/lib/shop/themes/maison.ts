import type { ThemeData } from "./types";

const STYLE =
  "Editorial fashion photography, cream and charcoal palette, soft diffuse window light, considered minimal composition, fine-grain 35mm film aesthetic, neutral plaster background.";

export const maison: ThemeData = {
  slug: "maison",
  shop: {
    name: "Maison",
    tagline: "Considered essentials.",
    description:
      "A small studio of fashion essentials, made in considered runs and built to live in.",
    designPOV:
      "Editorial serif typography, cream and charcoal, generous whitespace, slow scroll.",
    imageStyle: STYLE,
  },
  products: [
    {
      id: "1001",
      handle: "selene-linen-tee",
      title: "Selene Linen Tee",
      description:
        "A breezy, oversized linen tee in European-spun flax. Pre-washed for everyday softness and cut with a relaxed dropped shoulder.",
      productType: "Apparel",
      tags: ["new", "linen", "summer"],
      options: [
        { name: "Color", values: ["Bone", "Sage"] },
        { name: "Size", values: ["S", "M", "L"] },
      ],
      variants: [
        { id: "2001", title: "Bone / S", price: 78, options: [{ name: "Color", value: "Bone" }, { name: "Size", value: "S" }] },
        { id: "2002", title: "Bone / M", price: 78, options: [{ name: "Color", value: "Bone" }, { name: "Size", value: "M" }] },
        { id: "2003", title: "Bone / L", price: 78, options: [{ name: "Color", value: "Bone" }, { name: "Size", value: "L" }], available: false, qty: 0 },
        { id: "2004", title: "Sage / S", price: 78, options: [{ name: "Color", value: "Sage" }, { name: "Size", value: "S" }] },
        { id: "2005", title: "Sage / M", price: 78, options: [{ name: "Color", value: "Sage" }, { name: "Size", value: "M" }] },
        { id: "2006", title: "Sage / L", price: 78, options: [{ name: "Color", value: "Sage" }, { name: "Size", value: "L" }] },
      ],
      images: [
        {
          path: "products/selene-linen-tee/1.png",
          alt: "Selene Linen Tee in bone, on figure",
          prompt:
            "An oversized bone-colored washed linen tee with a relaxed dropped shoulder, photographed on a model from chest to waist against a warm cream plaster wall, natural side window light, no logos, no text.",
        },
        {
          path: "products/selene-linen-tee/2.png",
          alt: "Selene Linen Tee folded flat",
          prompt:
            "A bone-colored washed linen tee folded neatly on a textured cream linen surface, soft top-down light, subtle shadow, no logos, no text.",
        },
      ],
      collectionHandles: ["new-arrivals", "essentials"],
    },
    {
      id: "1002",
      handle: "atlas-canvas-tote",
      title: "Atlas Canvas Tote",
      description:
        "A heavyweight 18oz natural canvas tote with reinforced bridle leather handles. Carries a laptop, a sweater, and a baguette without complaint.",
      productType: "Bags",
      tags: ["bestseller", "canvas"],
      options: [{ name: "Color", values: ["Natural", "Charcoal"] }],
      variants: [
        { id: "2010", title: "Natural", price: 64, compareAt: 78, options: [{ name: "Color", value: "Natural" }] },
        { id: "2011", title: "Charcoal", price: 64, compareAt: 78, options: [{ name: "Color", value: "Charcoal" }] },
      ],
      images: [
        {
          path: "products/atlas-canvas-tote/1.png",
          alt: "Atlas Canvas Tote in natural, standing",
          prompt:
            "A heavyweight natural canvas tote bag with brown bridle leather handles, standing upright on a cream marble surface against a soft warm grey wall, museum-light shadow, no logos, no text.",
        },
        {
          path: "products/atlas-canvas-tote/2.png",
          alt: "Atlas Canvas Tote held at the side",
          prompt:
            "A natural canvas tote bag carried at the side of a person walking, lower-frame composition, warm golden hour light on a Parisian cobblestone street, shallow depth of field, no logos, no text.",
        },
        {
          path: "products/atlas-canvas-tote/3.png",
          alt: "Atlas Canvas Tote interior detail",
          prompt:
            "Close-up detail of the leather strap stitching on a heavyweight canvas tote, shallow depth of field, soft cream backlight, fine-grain 35mm aesthetic, no logos, no text.",
        },
      ],
      collectionHandles: ["bestsellers", "accessories"],
    },
    {
      id: "1003",
      handle: "noma-leather-card-case",
      title: "Noma Leather Card Case",
      description:
        "A minimalist three-pocket card case in vegetable-tanned Italian leather. Patinas beautifully with use.",
      productType: "Accessories",
      tags: ["leather", "wallet"],
      options: [{ name: "Color", values: ["Tan", "Black", "Cognac"] }],
      variants: [
        { id: "2050", title: "Tan", price: 58, options: [{ name: "Color", value: "Tan" }] },
        { id: "2051", title: "Black", price: 58, options: [{ name: "Color", value: "Black" }] },
        { id: "2052", title: "Cognac", price: 58, options: [{ name: "Color", value: "Cognac" }] },
      ],
      images: [
        {
          path: "products/noma-leather-card-case/1.png",
          alt: "Noma Card Case in tan",
          prompt:
            "A small minimalist tan vegetable-tanned leather card case, three pockets, photographed top-down on a cream linen surface, soft museum lighting, fine-grain editorial, no logos, no text.",
        },
      ],
      collectionHandles: ["accessories", "bestsellers"],
    },
    {
      id: "1004",
      handle: "ridge-merino-beanie",
      title: "Ridge Merino Beanie",
      description:
        "A fine-gauge merino wool beanie knit in Portugal. Warm without bulk and naturally moisture wicking.",
      productType: "Apparel",
      tags: ["wool", "winter"],
      options: [{ name: "Color", values: ["Charcoal", "Rust", "Stone"] }],
      variants: [
        { id: "2040", title: "Charcoal", price: 42, options: [{ name: "Color", value: "Charcoal" }] },
        { id: "2041", title: "Rust", price: 42, options: [{ name: "Color", value: "Rust" }] },
        { id: "2042", title: "Stone", price: 42, options: [{ name: "Color", value: "Stone" }] },
      ],
      images: [
        {
          path: "products/ridge-merino-beanie/1.png",
          alt: "Ridge Merino Beanie in charcoal",
          prompt:
            "A fine-gauge charcoal merino wool beanie laid flat on a stone surface, soft side-window light, fine-grain editorial photography, no logos, no text.",
        },
      ],
      collectionHandles: ["essentials"],
    },
    {
      id: "1005",
      handle: "harbor-stoneware-mug",
      title: "Harbor Stoneware Mug",
      description:
        "A hand-thrown stoneware mug glazed in soft fog blue. Holds 12oz. Microwave and dishwasher safe.",
      productType: "Home",
      tags: ["ceramic", "kitchen"],
      options: [{ name: "Color", values: ["Fog", "Cream"] }],
      variants: [
        { id: "2020", title: "Fog", price: 28, options: [{ name: "Color", value: "Fog" }] },
        { id: "2021", title: "Cream", price: 28, options: [{ name: "Color", value: "Cream" }] },
      ],
      images: [
        {
          path: "products/harbor-stoneware-mug/1.png",
          alt: "Harbor Mug in fog blue",
          prompt:
            "A hand-thrown stoneware mug glazed in soft fog blue, photographed on a cream linen tablecloth in soft side-window light, slight steam rising, fine-grain 35mm aesthetic, no logos, no text.",
        },
      ],
      collectionHandles: ["home"],
    },
    {
      id: "1006",
      handle: "drift-incense-bundle",
      title: "Drift Incense Bundle",
      description:
        "A trio of slow-burning Japanese incense in cedar, citrus, and sea salt. 40 sticks per box.",
      productType: "Home",
      tags: ["gift", "scent"],
      options: [{ name: "Scent", values: ["Cedar", "Citrus", "Sea Salt"] }],
      variants: [
        { id: "2070", title: "Cedar", price: 24, options: [{ name: "Scent", value: "Cedar" }] },
        { id: "2071", title: "Citrus", price: 24, options: [{ name: "Scent", value: "Citrus" }] },
        { id: "2072", title: "Sea Salt", price: 24, options: [{ name: "Scent", value: "Sea Salt" }] },
      ],
      images: [
        {
          path: "products/drift-incense-bundle/1.png",
          alt: "Drift Incense bundle, three boxes",
          prompt:
            "Three minimalist kraft paper incense boxes stacked at slight angles on a cream linen surface, soft side window light, fine-grain editorial composition, no logos, no text.",
        },
      ],
      collectionHandles: ["home"],
    },
  ],
  collections: [
    {
      id: "3001",
      handle: "new-arrivals",
      title: "New Arrivals",
      description: "Fresh additions to the studio, restocked weekly.",
      image: {
        path: "collections/new-arrivals.png",
        alt: "New arrivals — folded linen on cream",
        prompt:
          "An overhead editorial still life of folded bone linen garments arranged on a cream plaster surface with a single sage-colored swatch, soft window light, considered minimal composition, no logos, no text.",
        width: 1200,
        height: 800,
      },
    },
    {
      id: "3002",
      handle: "bestsellers",
      title: "Bestsellers",
      description: "The pieces our customers come back for.",
      image: {
        path: "collections/bestsellers.png",
        alt: "Bestsellers — leather and canvas grouping",
        prompt:
          "An editorial flat lay of a natural canvas tote, a tan leather card case, and a charcoal merino beanie arranged on a cream linen surface, soft window light, fine-grain editorial, no logos, no text.",
        width: 1200,
        height: 800,
      },
    },
    {
      id: "3003",
      handle: "essentials",
      title: "Essentials",
      description: "The wardrobe basics we keep restocking.",
      image: {
        path: "collections/essentials.png",
        alt: "Essentials — neutral wardrobe stack",
        prompt:
          "A neutral stack of folded bone linen tees and stone merino beanies on a cream plaster surface, soft side window light, considered editorial composition, no logos, no text.",
        width: 1200,
        height: 800,
      },
    },
    {
      id: "3004",
      handle: "accessories",
      title: "Accessories",
      description: "Small goods that finish an outfit.",
      image: {
        path: "collections/accessories.png",
        alt: "Accessories — leather and small goods",
        prompt:
          "A flat lay of vegetable-tanned tan and cognac leather card cases on a warm cream linen surface, soft top-down light, fine-grain editorial, no logos, no text.",
        width: 1200,
        height: 800,
      },
    },
    {
      id: "3005",
      handle: "home",
      title: "Home & Living",
      description: "Objects for the table, the kitchen, and the bedside.",
      image: {
        path: "collections/home.png",
        alt: "Home — stoneware and incense still life",
        prompt:
          "A still life of a fog-blue stoneware mug and a kraft incense box on a cream linen tablecloth in soft window light, considered editorial composition, no logos, no text.",
        width: 1200,
        height: 800,
      },
    },
  ],
};
