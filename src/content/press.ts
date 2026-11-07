/**
 * Publications & press.
 * PLACEHOLDER: the books, outlets and headlines below are fictional, for layout only.
 */

export interface Publication {
  kind: "Book" | "Column" | "Guide";
  title: string;
  subtitle?: string;
  publisher: string;
  year: number;
  cover: "indigo" | "laal" | "sand";
  blurb: string;
  href?: string;
}

export const publications: Publication[] = [
  {
    kind: "Book",
    title: "The Royal Rasoi",
    subtitle: "Recipes from the kitchens of Rajasthan",
    publisher: "Publisher name",
    year: 2025,
    cover: "indigo",
    blurb:
      "One hundred recipes from the havelis, hunting camps and wedding kitchens of Rajasthan, each with the story of the region it comes from.",
  },
  {
    kind: "Book",
    title: "Desert Pantry",
    subtitle: "Cooking with the wild larder of the Thar",
    publisher: "Publisher name",
    year: 2022,
    cover: "laal",
    blurb: "Ker, sangri, kachri and kumatiya — the ingredients that let the desert feed itself, and how to cook them today.",
  },
  {
    kind: "Column",
    title: "Rasoi Notes",
    subtitle: "A monthly column on regional food",
    publisher: "The Jaipur Ledger",
    year: 2021,
    cover: "sand",
    blurb: "Five years of essays on the ingredients, rituals and cooks of Rajasthan.",
  },
];

export interface PressItem {
  outlet: string;
  headline: string;
  date: string;
  kind: "Print" | "Digital" | "Television" | "Podcast";
  excerpt?: string;
  href?: string;
}

export const pressItems: PressItem[] = [
  {
    outlet: "Travel + Table",
    headline: "The chef who put all of Rajasthan on one menu",
    date: "2026-08-04",
    kind: "Print",
    excerpt: "At RajRasa, every dish arrives with an address — and a story to go with it.",
  },
  {
    outlet: "The Saffron Review",
    headline: "Why the best Laal Maas in India has no tomato in it",
    date: "2026-05-19",
    kind: "Digital",
  },
  {
    outlet: "Heritage Living",
    headline: "In conversation: cooking as an act of memory",
    date: "2026-02-11",
    kind: "Print",
    excerpt: "“A recipe that is not cooked is a recipe that dies.”",
  },
  {
    outlet: "The Gourmet Post",
    headline: "Ten chefs redefining regional Indian food",
    date: "2025-11-27",
    kind: "Digital",
  },
  {
    outlet: "Desert Dispatch",
    headline: "Saurabh Sharma on millets, ghee and patience",
    date: "2025-09-08",
    kind: "Podcast",
  },
  {
    outlet: "City Plate TV",
    headline: "Royal Kitchens of Rajasthan — a six-part series",
    date: "2025-03-15",
    kind: "Television",
  },
];

/** Outlet names for the "As featured in" strip — PLACEHOLDER */
export const featuredIn = [
  { name: "Travel + Table", style: "serif" },
  { name: "THE SAFFRON REVIEW", style: "caps" },
  { name: "Heritage Living", style: "italic" },
  { name: "The Gourmet Post", style: "serif" },
  { name: "DESERT DISPATCH", style: "caps" },
  { name: "City Plate", style: "italic" },
] as const;

export const quotes = [
  {
    text: "Every plate at RajRasa carries an address. Sharma cooks Rajasthan the way it was always meant to taste.",
    source: "Travel + Table",
  },
  {
    text: "Few chefs cook with this much patience — or this much ghee.",
    source: "The Saffron Review",
  },
];
