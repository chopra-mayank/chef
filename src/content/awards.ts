/**
 * Honours & accolades.
 * PLACEHOLDER: award names and awarding bodies below are fictional, for layout only.
 */

export interface Award {
  year: number;
  title: string;
  body: string;
  place?: string;
  featured?: boolean;
  image?: string;
  citation?: string;
}

export const awards: Award[] = [
  {
    year: 2026,
    title: "Chef of the Year — Regional Indian Cuisine",
    body: "Indian Culinary Honours",
    place: "New Delhi",
    featured: true,
    image: "/images/plating-bw-window.jpg",
    citation: "For bringing the forgotten recipes of Rajasthan back to the national table.",
  },
  {
    year: 2025,
    title: "Best Heritage Restaurant — RajRasa",
    body: "Rajasthan Hospitality Guild",
    place: "Jaipur",
    featured: true,
    image: "/images/city-palace-blue.jpg",
    citation: "One menu, every region of Rajasthan — cooked without shortcuts.",
  },
  {
    year: 2025,
    title: "Excellence in Culinary Preservation",
    body: "Heritage Foods Foundation",
    place: "Udaipur",
  },
  {
    year: 2024,
    title: "Top 50 Chefs of India",
    body: "Food & Travel Quarterly",
    featured: true,
    image: "/images/chef-kitchen-night.jpg",
    citation: "Listed at No. 12, and the highest-placed chef cooking regional Rajasthani food.",
  },
  {
    year: 2023,
    title: "Food Creator of the Year",
    body: "Digital Kitchen Awards",
    place: "Mumbai",
  },
  {
    year: 2022,
    title: "Gold Medal — Live Regional Cooking",
    body: "National Culinary Championship",
    place: "Bengaluru",
  },
  {
    year: 2019,
    title: "Executive Chef of the Year",
    body: "Hotel & Hospitality Awards",
    place: "Jaipur",
  },
  {
    year: 2016,
    title: "Young Chef of the Year",
    body: "Western India Culinary Forum",
    place: "Ahmedabad",
  },
];

/** Headline numbers — PLACEHOLDER */
export const stats = [
  { value: "25", suffix: "+", label: "Years in professional kitchens" },
  { value: "18", suffix: "", label: "National & state honours" },
  { value: "600", suffix: "+", label: "Recipes published" },
  { value: "1.2", suffix: "M", label: "Subscribers on YouTube" },
];

export const roles = [
  { title: "Jury member", detail: "National Culinary Championship · 2023–2025" },
  { title: "Visiting chef", detail: "Institute of Hotel Management, Jaipur" },
  { title: "Culinary advisor", detail: "Rajasthan heritage food festival" },
];
