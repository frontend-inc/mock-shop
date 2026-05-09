import type { ThemeData } from "./types";

const STYLE =
  "Retro-modern coffee product photography, espresso brown and warm cream palette, café-counter ambiance, soft side window light, monoline iconography hint, considered editorial composition.";

export const roast: ThemeData = {
  slug: "roast",
  shop: {
    name: "Roast",
    tagline: "Slow pour.",
    description:
      "A small-batch roastery with a tight menu of single origins and house blends.",
    designPOV:
      "Retro-modern, espresso + cream, café-menu structure, monoline iconography.",
    imageStyle: STYLE,
  },
  products: [
    {
      id: "1701",
      handle: "casa-espresso",
      title: "Casa Espresso, Whole Bean",
      description:
        "Our daily espresso. Brazil + Sumatra. Cocoa, brown sugar, walnut.",
      productType: "Whole Bean",
      tags: ["espresso", "house"],
      options: [
        { name: "Grind", values: ["Whole Bean", "Espresso"] },
        { name: "Size", values: ["250g", "1kg"] },
      ],
      variants: [
        { id: "2701", title: "Whole Bean / 250g", price: 22, options: [{ name: "Grind", value: "Whole Bean" }, { name: "Size", value: "250g" }] },
        { id: "2702", title: "Whole Bean / 1kg", price: 76, options: [{ name: "Grind", value: "Whole Bean" }, { name: "Size", value: "1kg" }] },
        { id: "2703", title: "Espresso / 250g", price: 22, options: [{ name: "Grind", value: "Espresso" }, { name: "Size", value: "250g" }] },
      ],
      images: [
        {
          path: "products/casa-espresso/1.png",
          alt: "Casa Espresso bag",
          prompt:
            "A matte cream-colored coffee bag with a thin espresso-brown band and a small monoline coffee-cherry icon on the front, photographed on a warm wood café counter beside a small glass of espresso, soft side window light, retro-modern composition, no extra text.",
        },
      ],
      collectionHandles: ["espresso", "house"],
    },
    {
      id: "1702",
      handle: "sunday-filter",
      title: "Sunday Filter",
      description:
        "A bright, washed Ethiopia. Jasmine, peach, lemon zest.",
      productType: "Whole Bean",
      tags: ["filter", "single-origin"],
      options: [{ name: "Size", values: ["250g"] }],
      variants: [
        { id: "2710", title: "250g", price: 26, options: [{ name: "Size", value: "250g" }] },
      ],
      images: [
        {
          path: "products/sunday-filter/1.png",
          alt: "Sunday Filter bag",
          prompt:
            "A matte cream coffee bag with a soft peach-pink band and a small monoline pour-over icon, photographed on a wooden café counter beside a glass v60 dripper with coffee blooming, soft window light, retro-modern composition, no extra text.",
        },
      ],
      collectionHandles: ["filter"],
    },
    {
      id: "1703",
      handle: "cold-brew-concentrate",
      title: "Cold Brew Concentrate",
      description:
        "Slow-steeped 18-hour concentrate. Cut 1:1 with milk or water.",
      productType: "Cold Brew",
      tags: ["cold-brew"],
      options: [{ name: "Size", values: ["500ml", "1L"] }],
      variants: [
        { id: "2720", title: "500ml", price: 16, options: [{ name: "Size", value: "500ml" }] },
        { id: "2721", title: "1L", price: 26, options: [{ name: "Size", value: "1L" }] },
      ],
      images: [
        {
          path: "products/cold-brew-concentrate/1.png",
          alt: "Cold Brew Concentrate bottle",
          prompt:
            "A clear glass bottle of dark cold-brew concentrate with a cream label and small monoline ice-cube icon, photographed on a warm wood counter with a glass of cold brew over ice beside it, soft retro-modern composition, no extra text.",
        },
      ],
      collectionHandles: ["espresso"],
    },
  ],
  collections: [
    {
      id: "3701",
      handle: "espresso",
      title: "Espresso",
      description: "Built for the bar.",
      image: {
        path: "collections/espresso.png",
        alt: "Espresso menu",
        prompt:
          "Three coffee bags in cream and espresso-brown lined up on a wooden café counter beside a glass of pulled espresso, soft side window light, retro-modern composition, no extra text.",
        width: 1200,
        height: 800,
      },
    },
    {
      id: "3702",
      handle: "filter",
      title: "Filter",
      description: "Bright, single origin, slow extraction.",
      image: {
        path: "collections/filter.png",
        alt: "Filter coffees",
        prompt:
          "Two coffee bags with peach and sage accents on a wood café counter next to a glass v60 dripper and a small ceramic cup, soft window light, retro-modern composition, no extra text.",
        width: 1200,
        height: 800,
      },
    },
    {
      id: "3703",
      handle: "house",
      title: "House",
      description: "What we drink at the bar all day.",
      image: {
        path: "collections/house.png",
        alt: "House blends",
        prompt:
          "An overhead café-counter still life of a cream coffee bag, a glass of espresso, a porcelain cup, and a monoline-illustrated paper menu, soft window light, retro-modern composition, no extra text.",
        width: 1200,
        height: 800,
      },
    },
  ],
};
