import type { ThemeData } from "./types";

const STYLE =
  "70s sun-faded outdoor adventure photography, rust and ochre and sage palette, wide horizontal landscape framing, golden-hour light, vintage film grain, western desert and pine atmosphere.";

export const trail: ThemeData = {
  slug: "trail",
  shop: {
    name: "Trail",
    tagline: "Long days, dusty edges.",
    description:
      "Outdoor and adventure apparel with western roots and a long-walk attitude.",
    designPOV:
      "70s sun-faded (rust, ochre, sage), western-condensed display, wide horizontal splits, landscape-led.",
    imageStyle: STYLE,
  },
  products: [
    {
      id: "1901",
      handle: "mesa-field-shirt",
      title: "Mesa Field Shirt",
      description:
        "Garment-dyed slub-cotton field shirt with two chest pockets and a pearl-snap placket.",
      productType: "Tops",
      tags: ["shirt", "western"],
      options: [
        { name: "Color", values: ["Rust", "Sage"] },
        { name: "Size", values: ["S", "M", "L", "XL"] },
      ],
      variants: [
        { id: "2901", title: "Rust / M", price: 118, options: [{ name: "Color", value: "Rust" }, { name: "Size", value: "M" }] },
        { id: "2902", title: "Rust / L", price: 118, options: [{ name: "Color", value: "Rust" }, { name: "Size", value: "L" }] },
        { id: "2903", title: "Sage / M", price: 118, options: [{ name: "Color", value: "Sage" }, { name: "Size", value: "M" }] },
      ],
      images: [
        {
          path: "products/mesa-field-shirt/1.png",
          alt: "Mesa Field Shirt — rust",
          prompt:
            "A rust-colored slub-cotton western field shirt with pearl-snap buttons photographed on a figure standing in a wide desert landscape at golden hour, sun flare, 70s film grain, no logos, no text.",
        },
      ],
      collectionHandles: ["shirts", "field-kit"],
    },
    {
      id: "1902",
      handle: "range-anorak",
      title: "Range Anorak",
      description:
        "Half-zip ripstop pullover with a kangaroo pocket and an adjustable hood.",
      productType: "Outerwear",
      tags: ["outerwear"],
      options: [{ name: "Color", values: ["Ochre", "Sage"] }, { name: "Size", values: ["M", "L"] }],
      variants: [
        { id: "2910", title: "Ochre / M", price: 168, options: [{ name: "Color", value: "Ochre" }, { name: "Size", value: "M" }] },
        { id: "2911", title: "Sage / L", price: 168, options: [{ name: "Color", value: "Sage" }, { name: "Size", value: "L" }] },
      ],
      images: [
        {
          path: "products/range-anorak/1.png",
          alt: "Range Anorak — ochre",
          prompt:
            "An ochre-yellow ripstop half-zip anorak with a kangaroo pocket photographed on a figure walking through a sun-faded prairie at golden hour, wide landscape framing, 70s film grain, no logos, no text.",
        },
      ],
      collectionHandles: ["outerwear", "field-kit"],
    },
    {
      id: "1903",
      handle: "canyon-trucker-cap",
      title: "Canyon Trucker Cap",
      description:
        "Five-panel mesh-back trucker with a sun-faded cotton crown and curved brim.",
      productType: "Accessories",
      tags: ["cap"],
      options: [{ name: "Color", values: ["Rust", "Sand"] }],
      variants: [
        { id: "2920", title: "Rust", price: 38, options: [{ name: "Color", value: "Rust" }] },
        { id: "2921", title: "Sand", price: 38, options: [{ name: "Color", value: "Sand" }] },
      ],
      images: [
        {
          path: "products/canyon-trucker-cap/1.png",
          alt: "Canyon Trucker Cap — rust",
          prompt:
            "A sun-faded rust-colored cotton trucker cap with a tan mesh back, photographed in three-quarter view sitting on a worn wooden picnic table in golden-hour desert light, 70s film grain, no logos, no text.",
        },
      ],
      collectionHandles: ["accessories"],
    },
  ],
  collections: [
    {
      id: "3901",
      handle: "shirts",
      title: "Shirts",
      description: "Snap-front, garment-dyed, sun-ready.",
      image: {
        path: "collections/shirts.png",
        alt: "Shirts collection",
        prompt:
          "Two western-style field shirts in rust and sage hanging from a worn wooden fence in a wide-framed desert landscape at golden hour, 70s film grain, no logos, no text.",
        width: 1200,
        height: 800,
      },
    },
    {
      id: "3902",
      handle: "outerwear",
      title: "Outerwear",
      description: "Layers for the cold half of the trail.",
      image: {
        path: "collections/outerwear.png",
        alt: "Outerwear collection",
        prompt:
          "An ochre anorak laid flat on a sun-faded wood plank surface beside a folded sage flannel and a battered field knife, wide horizontal composition, golden-hour light, 70s film grain, no logos, no text.",
        width: 1200,
        height: 800,
      },
    },
    {
      id: "3903",
      handle: "field-kit",
      title: "Field Kit",
      description: "Everything you walk out the door with.",
      image: {
        path: "collections/field-kit.png",
        alt: "Field Kit landscape",
        prompt:
          "A wide horizontal landscape composition of a folded rust shirt, a sage anorak, a trucker cap, and a worn canvas day pack laid out on a sun-faded wooden surface, golden-hour desert light, 70s film grain, no logos, no text.",
        width: 1200,
        height: 800,
      },
    },
    {
      id: "3904",
      handle: "accessories",
      title: "Accessories",
      description: "Caps, bandanas, and small carry.",
      image: {
        path: "collections/accessories.png",
        alt: "Accessories collection",
        prompt:
          "A rust trucker cap and a folded ochre bandana on a worn wooden picnic table in golden-hour desert light, wide horizontal framing, 70s film grain, no logos, no text.",
        width: 1200,
        height: 800,
      },
    },
  ],
};
