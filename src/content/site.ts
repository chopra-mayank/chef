/**
 * Site-wide details.
 * PLACEHOLDER: everything marked TODO is dummy copy for the design preview.
 * Replace with the chef's real details before launch.
 */

export const site = {
  name: "Saurabh Sharma",
  fullTitle: "Chef Saurabh Sharma",
  nameHi: "सौरभ शर्मा",
  role: "Chef · Jaipur, Rajasthan",
  // TODO: real positioning line from the chef
  tagline:
    "Keeper of Rajasthan’s royal and forgotten recipes — cooking the way the desert taught us: patiently, honestly, with ghee and fire.",
  greeting: { hi: "पधारो म्हारे देस", en: "Padharo mhare des", meaning: "Welcome to my land" },
  url: "https://chefsaurabhsharma.com", // TODO: final domain
  email: "kitchen@chefsaurabhsharma.com", // TODO
  pressEmail: "press@chefsaurabhsharma.com", // TODO
  phone: "+91 00000 00000", // TODO
  youtube: {
    url: "https://www.youtube.com/", // TODO: channel URL
    handle: "@chefsaurabhsharma", // TODO
    subscribers: "1.2M", // TODO
    videos: "640+", // TODO
  },
  socials: [
    { label: "YouTube", href: "https://www.youtube.com/" },
    { label: "Instagram", href: "https://www.instagram.com/" },
    { label: "Facebook", href: "https://www.facebook.com/" },
    { label: "X", href: "https://x.com/" },
  ],
  restaurant: {
    name: "RajRasa",
    url: "https://www.rajrasa.com/",
    tagline: "All of Rajasthan. One table.",
    city: "Jaipur",
    address: "S-19, 20, 21, Nagar Nigam Colony, near Jorawar Singh Gate, Jaipur 302002",
    hours: ["Lunch 12:00 – 3:30 pm", "Dinner 7:00 – 11:00 pm"],
  },
} as const;

export type NavItem = { label: string; hi: string; href: string };

export const nav: NavItem[] = [
  { label: "Recipes", hi: "व्यंजन", href: "/recipes" },
  { label: "Videos", hi: "वीडियो", href: "/videos" },
  { label: "Story", hi: "कहानी", href: "/story" },
  { label: "Accolades", hi: "सम्मान", href: "/accolades" },
  { label: "Press", hi: "प्रकाशन", href: "/press" },
  { label: "Contact", hi: "संपर्क", href: "/contact" },
];

/** The cultural regions of Rajasthan, used to give every recipe an "address". */
export const REGIONS = [
  "Marwar",
  "Mewar",
  "Dhundhar",
  "Shekhawati",
  "Hadoti",
  "Thar",
  "Mewat",
  "Vagad",
] as const;
export type Region = (typeof REGIONS)[number];

export const regionsHi: Record<Region, string> = {
  Marwar: "मारवाड़",
  Mewar: "मेवाड़",
  Dhundhar: "ढूँढाड़",
  Shekhawati: "शेखावाटी",
  Hadoti: "हाड़ौती",
  Thar: "थार",
  Mewat: "मेवात",
  Vagad: "वागड़",
};
