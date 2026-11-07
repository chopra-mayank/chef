import type { Region } from "./site";

/**
 * "Every dish has an address" — the regions shown on the home page.
 * PLACEHOLDER: dish lists are indicative; the chef should confirm them.
 */
export interface RegionInfo {
  name: Region;
  hi: string;
  districts: string;
  dishes: string[];
  image: string;
  note: string;
}

export const regionGuide: RegionInfo[] = [
  {
    name: "Marwar",
    hi: "मारवाड़",
    districts: "Jodhpur · Barmer · Nagaur · Pali",
    dishes: ["Laal Maas", "Mirchi Bada", "Mawa Kachori"],
    image: "/images/jodhpur-lane.jpg",
    note: "Mathania chillies, smoke and ghee — the fierce heart of the desert kitchen.",
  },
  {
    name: "Mewar",
    hi: "मेवाड़",
    districts: "Udaipur · Chittorgarh · Rajsamand",
    dishes: ["Dal Baati Churma", "Safed Maas", "Makki ki Raab"],
    image: "/images/amber-reflection.jpg",
    note: "Lake-country cooking from the royal kitchens — rich, creamy, unhurried.",
  },
  {
    name: "Dhundhar",
    hi: "ढूँढाड़",
    districts: "Jaipur · Dausa · Tonk",
    dishes: ["Ghevar", "Pyaaz Kachori", "Moong Dal Halwa"],
    image: "/images/hawa-mahal.jpg",
    note: "The Pink City’s sweet tooth and its famous breakfast kachoris.",
  },
  {
    name: "Shekhawati",
    hi: "शेखावाटी",
    districts: "Jhunjhunu · Sikar · Churu",
    dishes: ["Raabdi", "Bajre ki Khichdi", "Kair Sangri"],
    image: "/images/haveli-niche.jpg",
    note: "Painted havelis and frugal genius — millet, buttermilk and patience.",
  },
  {
    name: "Hadoti",
    hi: "हाड़ौती",
    districts: "Kota · Bundi · Baran · Jhalawar",
    dishes: ["Kota Kachori", "Kachori Sabzi", "Imarti"],
    image: "/images/arched-window-view.jpg",
    note: "River country in the south-east, famous for its fried breakfasts.",
  },
  {
    name: "Thar",
    hi: "थार",
    districts: "Jaisalmer · Bikaner",
    dishes: ["Kachri Keema", "Papad ki Sabzi", "Panchkuta"],
    image: "/images/dunes-gold.jpg",
    note: "Where nothing grows easily, nothing is wasted — the pantry of the dunes.",
  },
];
