import type { Region } from "./site";

/**
 * Recipe archive.
 * PLACEHOLDER: these recipes, quantities and stories are sample content written for
 * the design preview. Replace with the chef's own recipes (or connect a CMS).
 */

export type Course = "Mains" | "Breads" | "Snacks" | "Sweets";
export type Diet = "veg" | "nonveg";
export type Difficulty = "Easy" | "Medium" | "Involved";

export interface Ingredient {
  qty?: number;
  unit?: string;
  name: string;
  note?: string;
}
export interface IngredientGroup {
  title?: string;
  items: Ingredient[];
}
export interface Step {
  title: string;
  text: string;
  tip?: string;
}

export interface Recipe {
  slug: string;
  title: string;
  titleHi: string;
  region: Region;
  course: Course;
  diet: Diet;
  image: string;
  imageAlt: string;
  /** one line for cards */
  summary: string;
  /** a few short paragraphs in the chef's voice */
  intro: string[];
  prepMins: number;
  cookMins: number;
  serves: number;
  difficulty: Difficulty;
  ingredients: IngredientGroup[];
  steps: Step[];
  chefNote?: string;
  serveWith?: { label: string; slug?: string }[];
  youtubeId?: string;
  featured?: boolean;
  /** position (1–5) in the home page's "Signature recipes" row; leave out to hide */
  signature?: number;
  published: string;
}

export const COURSES: Course[] = ["Mains", "Breads", "Snacks", "Sweets"];

export const recipes: Recipe[] = [
  {
    slug: "laal-maas",
    signature: 3,
    title: "Laal Maas",
    titleHi: "लाल मांस",
    region: "Marwar",
    course: "Mains",
    diet: "nonveg",
    image: "/images/laal-maas.jpg",
    imageAlt: "Laal maas, a deep red mutton curry, in a steel kadai on a dark table",
    summary: "The fiery mutton curry of the Marwar hunting camps, finished with a breath of smoke.",
    intro: [
      "Laal Maas was born in the hunting camps of Marwar — game cooked over an open fire with nothing but ghee, garlic and the red chillies of Mathania.",
      "My version keeps the old rules: no tomato, no cream, and the patience to let the meat cook slowly in its own juices until the masala turns the colour of a desert sunset.",
    ],
    prepMins: 30,
    cookMins: 150,
    serves: 4,
    difficulty: "Medium",
    ingredients: [
      {
        title: "For the chilli paste",
        items: [
          { qty: 20, unit: "", name: "Mathania dried red chillies", note: "stems removed" },
          { qty: 12, unit: "cloves", name: "garlic" },
        ],
      },
      {
        title: "For the curry",
        items: [
          { qty: 1, unit: "kg", name: "mutton, bone-in", note: "shoulder and ribs" },
          { qty: 120, unit: "g", name: "ghee" },
          { qty: 3, unit: "", name: "onions", note: "thinly sliced" },
          { qty: 200, unit: "g", name: "yoghurt", note: "whisked" },
          { qty: 2, unit: "tbsp", name: "coriander powder" },
          { qty: 0.5, unit: "tsp", name: "turmeric" },
          { qty: 2, unit: "", name: "bay leaves" },
          { qty: 2, unit: "", name: "black cardamom" },
          { qty: 6, unit: "", name: "cloves" },
          { name: "salt", note: "to taste" },
        ],
      },
      {
        title: "For the dhungar (smoke)",
        items: [
          { qty: 1, unit: "piece", name: "natural charcoal" },
          { qty: 1, unit: "tsp", name: "ghee" },
        ],
      },
    ],
    steps: [
      {
        title: "Soak the chillies",
        text: "Soak the chillies in hot water for 30 minutes, then grind them with the garlic into a coarse paste. Keep a spoonful of the soaking water.",
      },
      {
        title: "Marinate",
        text: "Whisk the yoghurt with the coriander powder, turmeric and salt. Coat the mutton and leave it for at least an hour — overnight is better.",
      },
      {
        title: "Build the base",
        text: "Heat the ghee in a heavy kadai until it shimmers. Add the whole spices, then the onions, and cook until they are deep golden at the edges.",
      },
      {
        title: "Sear the meat",
        text: "Add the mutton on high heat and keep it moving for 8–10 minutes, until the edges catch and the marinade has dried onto the meat.",
      },
      {
        title: "Cook it slowly",
        text: "Stir in the chilli paste, lower the heat, cover and cook for about two hours. Add a splash of hot water whenever the masala sticks to the pan.",
        tip: "It is ready when the ghee separates and floats in a red ring around the edge.",
      },
      {
        title: "Finish with smoke",
        text: "Set a glowing coal in a small steel bowl on top of the curry, pour the ghee over it and cover tightly for five minutes.",
      },
    ],
    chefNote:
      "Mathania chillies give colour more than fire. If you can’t find them, use Kashmiri chillies with two or three hotter ones for bite.",
    serveWith: [
      { label: "Bajre ki roti" },
      { label: "Sliced onion and lime" },
      { label: "Moong Dal Halwa", slug: "moong-dal-halwa" },
    ],
    featured: true,
    published: "2026-09-14",
  },
  {
    slug: "dal-baati-churma",
    signature: 1,
    title: "Dal Baati Churma",
    titleHi: "दाल बाटी चूरमा",
    region: "Mewar",
    course: "Mains",
    diet: "veg",
    image: "/images/dal-baati-ghee.jpg",
    imageAlt: "Ghee being poured over dal in a brass bowl, with papad on a silver platter",
    summary: "Baked wheat dumplings, five-lentil dal and sweet churma — the Sunday lunch of Mewar.",
    intro: [
      "In Mewar, Sunday lunch meant baatis buried in the embers of the chulha, cracked open and soaked in ghee.",
      "It is a lesson in desert thrift: the same dough becomes bread and dessert, and five humble lentils make a dal that tastes of everything.",
    ],
    prepMins: 30,
    cookMins: 75,
    serves: 6,
    difficulty: "Medium",
    ingredients: [
      {
        title: "For the baati",
        items: [
          { qty: 500, unit: "g", name: "coarse whole-wheat flour" },
          { qty: 50, unit: "g", name: "semolina" },
          { qty: 100, unit: "g", name: "ghee", note: "for the dough" },
          { qty: 1, unit: "tsp", name: "ajwain" },
          { qty: 1, unit: "tsp", name: "salt" },
          { qty: 200, unit: "g", name: "ghee", note: "warm, for dipping" },
        ],
      },
      {
        title: "For the panchmel dal",
        items: [
          { qty: 50, unit: "g", name: "toor dal" },
          { qty: 50, unit: "g", name: "chana dal" },
          { qty: 50, unit: "g", name: "moong dal" },
          { qty: 30, unit: "g", name: "urad dal" },
          { qty: 30, unit: "g", name: "masoor dal" },
          { qty: 3, unit: "tbsp", name: "ghee" },
          { qty: 1, unit: "tsp", name: "cumin" },
          { qty: 1, unit: "pinch", name: "asafoetida" },
          { qty: 1, unit: "tbsp", name: "ginger", note: "grated" },
          { qty: 2, unit: "", name: "green chillies", note: "slit" },
        ],
      },
      {
        title: "For the churma",
        items: [
          { qty: 4, unit: "", name: "baked baatis" },
          { qty: 100, unit: "g", name: "jaggery", note: "grated" },
          { qty: 3, unit: "tbsp", name: "ghee" },
          { qty: 0.5, unit: "tsp", name: "green cardamom powder" },
        ],
      },
    ],
    steps: [
      {
        title: "Make the dough",
        text: "Rub the ghee into the flour, semolina, ajwain and salt until the mixture holds when pressed. Add water little by little for a stiff dough, then rest it for 20 minutes.",
      },
      {
        title: "Shape and bake",
        text: "Divide into 14 balls, press a thumbprint into each and bake at 200°C for 35–40 minutes, turning once, until cracked and golden.",
      },
      {
        title: "Cook the five lentils",
        text: "Pressure-cook the dals with turmeric and salt. Temper with ghee, cumin, asafoetida, ginger and chillies and simmer together for ten minutes.",
      },
      {
        title: "Dip the baatis",
        text: "Crack each hot baati and soak it in warm ghee for a minute.",
        tip: "Do this just before serving — the ghee should hiss.",
      },
      {
        title: "Make the churma",
        text: "Crush four baatis into coarse crumbs and mix with warm ghee, jaggery and cardamom.",
      },
    ],
    chefNote: "Coarse flour is the secret to a baati that shatters. Fine atta makes it bready.",
    serveWith: [{ label: "Green garlic chutney" }, { label: "Rajasthani Kadhi", slug: "rajasthani-kadhi" }],
    featured: true,
    published: "2026-08-30",
  },
  {
    slug: "gatte-ki-sabzi",
    signature: 2,
    title: "Gatte ki Sabzi",
    titleHi: "गट्टे की सब्ज़ी",
    region: "Marwar",
    course: "Mains",
    diet: "veg",
    image: "/images/gatte-ki-sabzi.jpg",
    imageAlt: "Gram-flour dumplings in a golden yoghurt curry in a copper handi",
    summary: "Gram-flour dumplings in a tangy yoghurt curry — a vegetable dish without a single vegetable.",
    intro: [
      "When the desert offered no vegetables, the Marwari kitchen made its own out of besan.",
      "The gatte are poached, sliced and simmered in yoghurt that has to be stirred with care so it never splits.",
    ],
    prepMins: 20,
    cookMins: 40,
    serves: 4,
    difficulty: "Easy",
    ingredients: [
      {
        title: "For the gatte",
        items: [
          { qty: 150, unit: "g", name: "besan (gram flour)" },
          { qty: 2, unit: "tbsp", name: "yoghurt" },
          { qty: 2, unit: "tbsp", name: "ghee" },
          { qty: 0.5, unit: "tsp", name: "ajwain" },
          { qty: 0.5, unit: "tsp", name: "red chilli powder" },
        ],
      },
      {
        title: "For the curry",
        items: [
          { qty: 250, unit: "g", name: "yoghurt", note: "whisked smooth" },
          { qty: 2, unit: "tbsp", name: "ghee" },
          { qty: 1, unit: "tsp", name: "cumin" },
          { qty: 1, unit: "tbsp", name: "coriander powder" },
          { qty: 0.5, unit: "tsp", name: "turmeric" },
          { qty: 1, unit: "tsp", name: "kasuri methi" },
        ],
      },
    ],
    steps: [
      { title: "Make the dough", text: "Knead the gatte ingredients into a firm dough and roll into finger-thick logs." },
      { title: "Poach", text: "Boil the logs for 10 minutes until they float. Cool, then slice into rounds. Keep the water." },
      {
        title: "Make the curry",
        text: "Whisk the spices into the yoghurt. Temper cumin in ghee, add the yoghurt and stir constantly until it comes to a simmer.",
        tip: "Keep stirring in one direction until it boils, and the yoghurt won’t split.",
      },
      { title: "Bring it together", text: "Add the gatte and a cup of their cooking water. Simmer for five minutes and finish with kasuri methi." },
    ],
    serveWith: [{ label: "Steamed rice" }, { label: "Phulka" }],
    published: "2026-07-21",
  },
  {
    slug: "rajasthani-kadhi",
    title: "Rajasthani Kadhi",
    titleHi: "राजस्थानी कढ़ी",
    region: "Shekhawati",
    course: "Mains",
    diet: "veg",
    image: "/images/rajasthani-kadhi.jpg",
    imageAlt: "A spoon lifting golden kadhi from a white bowl",
    summary: "Thin, sharp and fragrant with fenugreek — buttermilk curry the way Shekhawati makes it.",
    intro: [
      "Rajasthani kadhi is thinner and sharper than its Gujarati and Punjabi cousins — made to be drunk from the plate as much as eaten.",
    ],
    prepMins: 10,
    cookMins: 30,
    serves: 4,
    difficulty: "Easy",
    ingredients: [
      {
        items: [
          { qty: 500, unit: "ml", name: "sour buttermilk" },
          { qty: 3, unit: "tbsp", name: "besan" },
          { qty: 2, unit: "tbsp", name: "ghee" },
          { qty: 0.5, unit: "tsp", name: "methi seeds" },
          { qty: 1, unit: "tsp", name: "cumin" },
          { qty: 4, unit: "", name: "dried red chillies" },
          { qty: 8, unit: "", name: "curry leaves" },
          { qty: 0.5, unit: "tsp", name: "turmeric" },
        ],
      },
    ],
    steps: [
      { title: "Whisk", text: "Whisk the besan into the buttermilk with turmeric and salt until there are no lumps." },
      { title: "Simmer", text: "Bring to a boil, stirring, then simmer gently for 20 minutes until it coats a spoon." },
      { title: "Temper", text: "Crackle methi, cumin, chillies and curry leaves in ghee and pour over the kadhi." },
    ],
    published: "2026-06-02",
  },
  {
    slug: "safed-maas",
    signature: 4,
    title: "Safed Maas",
    titleHi: "सफ़ेद मांस",
    region: "Mewar",
    course: "Mains",
    diet: "nonveg",
    image: "/images/safed-maas.jpg",
    imageAlt: "A creamy white mutton curry in a brass bowl with smoke rising",
    summary: "The white mutton curry of the royal kitchens — cashew, cream and cardamom.",
    intro: [
      "Where Laal Maas belongs to the hunt, Safed Maas belongs to the palace: mild, perfumed and pale as marble.",
    ],
    prepMins: 20,
    cookMins: 90,
    serves: 4,
    difficulty: "Medium",
    ingredients: [
      {
        items: [
          { qty: 800, unit: "g", name: "mutton, bone-in" },
          { qty: 80, unit: "g", name: "ghee" },
          { qty: 60, unit: "g", name: "cashews", note: "soaked and ground" },
          { qty: 200, unit: "g", name: "yoghurt" },
          { qty: 100, unit: "ml", name: "cream" },
          { qty: 6, unit: "", name: "green cardamom" },
          { qty: 1, unit: "tsp", name: "white pepper" },
        ],
      },
    ],
    steps: [
      { title: "Seal", text: "Cook the mutton in ghee with cardamom without letting it brown." },
      { title: "Braise", text: "Add yoghurt and a little water, cover and cook gently for an hour." },
      { title: "Finish", text: "Stir in the cashew paste and cream, season with white pepper and simmer until silky." },
    ],
    published: "2026-05-18",
  },
  {
    slug: "junglee-maas",
    title: "Junglee Maas",
    titleHi: "जंगली मांस",
    region: "Dhundhar",
    course: "Mains",
    diet: "nonveg",
    image: "/images/junglee-maas.jpg",
    imageAlt: "Dark meat curry with saffron rice and flatbreads on a dark table",
    summary: "Four ingredients and a fire: meat, ghee, red chillies and salt.",
    intro: [
      "The simplest dish in this archive and the hardest to get right — there is nowhere for a mistake to hide.",
    ],
    prepMins: 10,
    cookMins: 120,
    serves: 4,
    difficulty: "Involved",
    ingredients: [
      {
        items: [
          { qty: 1, unit: "kg", name: "mutton, bone-in" },
          { qty: 150, unit: "g", name: "ghee" },
          { qty: 15, unit: "", name: "dried red chillies" },
          { name: "salt", note: "to taste" },
        ],
      },
    ],
    steps: [
      { title: "Heat", text: "Heat the ghee in a heavy pot and add the meat with the whole chillies." },
      { title: "Cook it down", text: "Cook on low heat, adding water a little at a time, for about two hours." },
      { title: "Rest", text: "Rest for ten minutes before serving so the ghee settles." },
    ],
    published: "2026-04-11",
  },
  {
    slug: "kachri-keema",
    title: "Kachri Keema",
    titleHi: "कचरी कीमा",
    region: "Thar",
    course: "Mains",
    diet: "nonveg",
    image: "/images/kachri-keema.jpg",
    imageAlt: "Spiced minced meat in a steel kadai with naan beside it",
    summary: "Minced mutton tenderised with kachri, the wild desert cucumber.",
    intro: ["Kachri is a tiny wild melon of the Thar. Dried and powdered, it tenderises meat and adds a gentle sourness."],
    prepMins: 20,
    cookMins: 45,
    serves: 4,
    difficulty: "Medium",
    ingredients: [
      {
        items: [
          { qty: 600, unit: "g", name: "minced mutton" },
          { qty: 2, unit: "tbsp", name: "kachri powder" },
          { qty: 2, unit: "", name: "onions", note: "finely chopped" },
          { qty: 4, unit: "tbsp", name: "ghee" },
          { qty: 1, unit: "tsp", name: "red chilli powder" },
        ],
      },
    ],
    steps: [
      { title: "Marinate", text: "Mix the mince with kachri powder and salt and rest for 30 minutes." },
      { title: "Cook", text: "Brown the onions in ghee, add the mince and spices and cook until dry and fragrant." },
    ],
    published: "2026-03-07",
  },
  {
    slug: "papad-ki-sabzi",
    title: "Papad ki Sabzi",
    titleHi: "पापड़ की सब्ज़ी",
    region: "Thar",
    course: "Mains",
    diet: "veg",
    image: "/images/papad-ki-sabzi.jpg",
    imageAlt: "Orange yoghurt curry in a copper bowl with rice and papad",
    summary: "Roasted papad in a spiced yoghurt curry — ready in twenty minutes.",
    intro: ["A store-cupboard curry from the dunes, where papad was easier to keep than vegetables."],
    prepMins: 5,
    cookMins: 20,
    serves: 4,
    difficulty: "Easy",
    ingredients: [
      {
        items: [
          { qty: 4, unit: "", name: "moong papad", note: "roasted and broken" },
          { qty: 250, unit: "g", name: "yoghurt" },
          { qty: 2, unit: "tbsp", name: "ghee" },
          { qty: 1, unit: "tsp", name: "cumin" },
        ],
      },
    ],
    steps: [
      { title: "Make the curry", text: "Temper cumin in ghee, add the spiced yoghurt and stir to a simmer." },
      { title: "Add the papad", text: "Add the papad just before serving so it stays tender, not soggy." },
    ],
    published: "2026-02-19",
  },
  {
    slug: "moong-dal-halwa",
    title: "Moong Dal Halwa",
    titleHi: "मूंग दाल हलवा",
    region: "Dhundhar",
    course: "Sweets",
    diet: "veg",
    image: "/images/moong-dal-halwa.jpg",
    imageAlt: "Moong dal halwa topped with slivered nuts in a brass plate",
    summary: "An hour of stirring, a lifetime of memory — the winter sweet of Jaipur weddings.",
    intro: [
      "There are no shortcuts to moong dal halwa. The lentils must roast in ghee until the whole house smells of it.",
    ],
    prepMins: 20,
    cookMins: 60,
    serves: 6,
    difficulty: "Involved",
    ingredients: [
      {
        items: [
          { qty: 200, unit: "g", name: "split moong dal", note: "soaked 4 hours" },
          { qty: 180, unit: "g", name: "ghee" },
          { qty: 200, unit: "g", name: "sugar" },
          { qty: 300, unit: "ml", name: "milk" },
          { qty: 1, unit: "pinch", name: "saffron" },
        ],
      },
    ],
    steps: [
      { title: "Grind", text: "Grind the soaked dal to a coarse paste with very little water." },
      { title: "Roast", text: "Roast in ghee on low heat, stirring constantly, for 40 minutes until it smells of biscuits." },
      { title: "Finish", text: "Add the hot milk, saffron and sugar and cook until the ghee separates." },
    ],
    published: "2026-01-12",
  },
  {
    slug: "ghevar",
    signature: 5,
    title: "Ghevar",
    titleHi: "घेवर",
    region: "Dhundhar",
    course: "Sweets",
    diet: "veg",
    image: "/images/ghevar.jpg",
    imageAlt: "A golden honeycomb disc of ghevar topped with a rose",
    summary: "The honeycomb sweet of Teej and the monsoon, soaked in syrup and crowned with rabdi.",
    intro: ["Ghevar is made only in the monsoon months. Batter is poured in a thin stream into hot ghee until it sets like lace."],
    prepMins: 30,
    cookMins: 60,
    serves: 8,
    difficulty: "Involved",
    ingredients: [
      {
        items: [
          { qty: 250, unit: "g", name: "plain flour" },
          { qty: 60, unit: "g", name: "ghee", note: "chilled" },
          { qty: 600, unit: "ml", name: "ice-cold water" },
          { qty: 300, unit: "g", name: "sugar", note: "for syrup" },
        ],
      },
    ],
    steps: [
      { title: "Make the batter", text: "Whip the chilled ghee with ice until white, then whisk in flour and ice water." },
      { title: "Fry", text: "Pour the batter in a thin stream into a ring mould of hot ghee, one ladle at a time." },
      { title: "Soak", text: "Lift out and soak in warm syrup. Top with rabdi and pistachio." },
    ],
    published: "2025-08-03",
  },
  {
    slug: "motichoor-laddoo",
    title: "Motichoor Laddoo",
    titleHi: "मोतीचूर लड्डू",
    region: "Mewar",
    course: "Sweets",
    diet: "veg",
    image: "/images/motichoor-laddoo.jpg",
    imageAlt: "Saffron motichoor laddoos on a dark table with smoke rising",
    summary: "Pearls of fried besan bound in cardamom syrup — the laddoo of every celebration.",
    intro: ["The name means ‘crushed pearls’. Each laddoo is a thousand tiny drops of batter."],
    prepMins: 20,
    cookMins: 50,
    serves: 12,
    difficulty: "Medium",
    ingredients: [
      {
        items: [
          { qty: 250, unit: "g", name: "besan" },
          { qty: 300, unit: "g", name: "sugar" },
          { qty: 1, unit: "tsp", name: "cardamom powder" },
          { name: "ghee", note: "for frying" },
        ],
      },
    ],
    steps: [
      { title: "Fry the pearls", text: "Press thin batter through a perforated ladle into hot ghee and fry briefly." },
      { title: "Soak and shape", text: "Fold into one-string syrup, rest 15 minutes, then shape with damp palms." },
    ],
    published: "2025-10-20",
  },
  {
    slug: "imarti",
    title: "Imarti",
    titleHi: "इमरती",
    region: "Hadoti",
    course: "Sweets",
    diet: "veg",
    image: "/images/imarti.jpg",
    imageAlt: "Imarti in an ornate silver bowl on a mustard cloth",
    summary: "Jalebi’s regal cousin — urad dal piped into flowers and soaked in saffron syrup.",
    intro: ["Imarti is piped in rings of tiny loops, so every bite is crisp at the edges and soaked at the heart."],
    prepMins: 30,
    cookMins: 40,
    serves: 6,
    difficulty: "Medium",
    ingredients: [
      {
        items: [
          { qty: 200, unit: "g", name: "urad dal", note: "soaked 4 hours" },
          { qty: 300, unit: "g", name: "sugar" },
          { qty: 1, unit: "pinch", name: "saffron" },
        ],
      },
    ],
    steps: [
      { title: "Whip", text: "Grind the dal to a smooth, airy batter and whip until a drop floats in water." },
      { title: "Pipe and fry", text: "Pipe flowers into medium-hot ghee and fry until crisp, then soak in warm syrup." },
    ],
    published: "2025-11-02",
  },
];

/** The five recipes shown on the home page, in order */
export function signatureRecipes() {
  return recipes
    .filter((r) => r.signature !== undefined)
    .sort((a, b) => (a.signature ?? 0) - (b.signature ?? 0))
    .slice(0, 5);
}

export function getRecipe(slug: string) {
  return recipes.find((r) => r.slug === slug);
}

export function relatedRecipes(recipe: Recipe, count = 3) {
  const others = recipes.filter((r) => r.slug !== recipe.slug);
  const score = (r: Recipe) => (r.region === recipe.region ? 2 : 0) + (r.course === recipe.course ? 1 : 0);
  return [...others].sort((a, b) => score(b) - score(a)).slice(0, count);
}
