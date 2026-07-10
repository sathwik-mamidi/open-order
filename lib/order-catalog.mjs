export const moods = [
  { id: "comfort", label: "Comfort" },
  { id: "fresh", label: "Fresh" },
  { id: "quick", label: "Quick" },
];

export const mains = [
  {
    id: "tacos",
    title: "Short rib tacos",
    description: "Best seller with bold flavor.",
    price: 16,
    moodIds: ["comfort"],
    image: "/assets/short-rib-tacos.png",
    pairingIds: ["corn", "orange"],
  },
  {
    id: "rigatoni",
    title: "Vodka rigatoni",
    description: "Creamy, warm, crowd favorite.",
    price: 18,
    moodIds: ["comfort"],
    image: "/assets/vodka-rigatoni.png",
    pairingIds: ["bread", "spritz"],
  },
  {
    id: "salad",
    title: "Halloumi salad",
    description: "Light, crisp, easy dinner.",
    price: 15,
    moodIds: ["fresh"],
    image: "/assets/halloumi-salad.png",
    pairingIds: ["lemonade", "fries"],
  },
  {
    id: "bowl",
    title: "Citrus grain bowl",
    description: "Fast and filling without feeling heavy.",
    price: 14,
    moodIds: ["fresh", "quick"],
    image: "/assets/citrus-grain-bowl.png",
    pairingIds: ["tea", "cookie"],
  },
  {
    id: "panini",
    title: "Pesto panini",
    description: "Easy lunch pick for fast tables.",
    price: 13,
    moodIds: ["quick"],
    image: "/assets/pesto-panini.png",
    pairingIds: ["iced-latte", "chips"],
  },
  {
    id: "sliders",
    title: "Wagyu sliders",
    description: "Premium swap for indulgent tables.",
    price: 19,
    moodIds: ["comfort", "quick"],
    image: "/assets/wagyu-sliders.png",
    pairingIds: ["fries", "cola"],
  },
];

export const pairings = {
  corn: {
    id: "corn",
    title: "Smoky corn",
    description: "Easy side add-on.",
    price: 6,
    image: "/assets/smoky-corn.png",
  },
  orange: {
    id: "orange",
    title: "Blood orange soda",
    description: "Popular with tacos.",
    price: 5,
    image: "/assets/blood-orange-soda.png",
  },
  bread: {
    id: "bread",
    title: "Garlic bread",
    description: "Classic pasta pair.",
    price: 5,
    image: "/assets/garlic-bread.png",
  },
  spritz: {
    id: "spritz",
    title: "Citrus spritz",
    description: "Premium drink attach.",
    price: 7,
    image: "/assets/citrus-spritz.png",
  },
  lemonade: {
    id: "lemonade",
    title: "House lemonade",
    description: "Low-friction beverage add.",
    price: 4,
    image: "/assets/house-lemonade.png",
  },
  fries: {
    id: "fries",
    title: "Chili-lime fries",
    description: "Shareable side.",
    price: 7,
    image: "/assets/chili-lime-fries.png",
  },
  tea: {
    id: "tea",
    title: "Peach iced tea",
    description: "Quick drink add.",
    price: 4,
    image: "/assets/peach-iced-tea.png",
  },
  cookie: {
    id: "cookie",
    title: "Warm cookie",
    description: "Soft dessert upsell.",
    price: 5,
    image: "/assets/warm-cookie.png",
  },
  "iced-latte": {
    id: "iced-latte",
    title: "Iced latte",
    description: "Cafe-style combo move.",
    price: 5,
    image: "/assets/iced-latte.png",
  },
  chips: {
    id: "chips",
    title: "Sea salt chips",
    description: "Fast side add.",
    price: 3,
    image: "/assets/sea-salt-chips.png",
  },
  cola: {
    id: "cola",
    title: "Craft cola",
    description: "Easy beverage upsell.",
    price: 4,
    image: "/assets/craft-cola.png",
  },
};

export function getMainsForMood(moodId) {
  return mains.filter((item) => item.moodIds.includes(moodId));
}

export function getPairingsForMain(main) {
  return main.pairingIds.map((id) => pairings[id]).filter(Boolean);
}

export function validateCatalog() {
  const issues = [];
  const moodIds = new Set(moods.map((mood) => mood.id));
  const items = [...mains, ...Object.values(pairings)];
  const itemIds = new Set();

  if (moodIds.size !== moods.length) {
    issues.push("Mood ids must be unique.");
  }

  for (const item of items) {
    if (itemIds.has(item.id)) {
      issues.push(`Duplicate item id: ${item.id}`);
    }
    itemIds.add(item.id);

    if (!item.title || !item.description) {
      issues.push(`Item ${item.id} is missing display copy.`);
    }
    if (!Number.isFinite(item.price) || item.price <= 0) {
      issues.push(`Item ${item.id} must have a positive numeric price.`);
    }
    if (!/^\/assets\/[a-z0-9-]+\.png$/.test(item.image)) {
      issues.push(`Item ${item.id} has an invalid asset path: ${item.image}`);
    }
  }

  for (const main of mains) {
    if (main.moodIds.length === 0) {
      issues.push(`Main ${main.id} must belong to at least one mood.`);
    }
    for (const moodId of main.moodIds) {
      if (!moodIds.has(moodId)) {
        issues.push(`Main ${main.id} references unknown mood: ${moodId}`);
      }
    }
    for (const pairingId of main.pairingIds) {
      if (!pairings[pairingId]) {
        issues.push(`Main ${main.id} references unknown pairing: ${pairingId}`);
      }
    }
  }

  for (const [pairingId, pairing] of Object.entries(pairings)) {
    if (pairingId !== pairing.id) {
      issues.push(`Pairing key ${pairingId} does not match id ${pairing.id}.`);
    }
  }

  return issues;
}
