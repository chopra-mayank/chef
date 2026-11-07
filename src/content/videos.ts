/**
 * YouTube videos.
 * PLACEHOLDER: titles, durations and thumbnails are dummies. Paste the real YouTube video
 * IDs into `youtubeId` and the player will embed them; thumbnails can then come from
 * https://i.ytimg.com/vi/<id>/maxresdefault.jpg.
 */

export const SERIES = ["Royal Kitchens", "Desert Pantry", "Festive Sweets", "Street Stories", "Shorts"] as const;
export type Series = (typeof SERIES)[number];

export interface Video {
  id: string;
  youtubeId?: string;
  title: string;
  series: Series;
  duration: string;
  thumb: string;
  published: string;
  views: string;
  recipeSlug?: string;
  vertical?: boolean;
}

export const videos: Video[] = [
  {
    id: "v1",
    title: "Laal Maas the Marwari way — with dhungar smoke",
    series: "Royal Kitchens",
    duration: "18:42",
    thumb: "/images/laal-maas.jpg",
    published: "2026-09-14",
    views: "1.4M",
    recipeSlug: "laal-maas",
  },
  {
    id: "v2",
    title: "Dal Baati Churma: the Mewar Sunday lunch",
    series: "Royal Kitchens",
    duration: "22:10",
    thumb: "/images/dal-baati-ghee.jpg",
    published: "2026-08-30",
    views: "2.1M",
    recipeSlug: "dal-baati-churma",
  },
  {
    id: "v3",
    title: "Inside my masala dabba — the seven spices of a Rajasthani kitchen",
    series: "Desert Pantry",
    duration: "07:35",
    thumb: "/images/masala-dabba-indigo.jpg",
    published: "2026-08-12",
    views: "860K",
  },
  {
    id: "v4",
    title: "Gatte ki Sabzi — a curry without a single vegetable",
    series: "Desert Pantry",
    duration: "13:15",
    thumb: "/images/gatte-ki-sabzi.jpg",
    published: "2026-07-21",
    views: "990K",
    recipeSlug: "gatte-ki-sabzi",
  },
  {
    id: "v5",
    title: "Ghevar for Teej: the honeycomb sweet of the monsoon",
    series: "Festive Sweets",
    duration: "14:05",
    thumb: "/images/ghevar.jpg",
    published: "2026-07-02",
    views: "1.1M",
    recipeSlug: "ghevar",
  },
  {
    id: "v6",
    title: "A morning at Jaipur’s chai stalls",
    series: "Street Stories",
    duration: "09:48",
    thumb: "/images/street-chai-bw.jpg",
    published: "2026-06-18",
    views: "540K",
  },
  {
    id: "v7",
    title: "Safed Maas from the royal kitchens of Mewar",
    series: "Royal Kitchens",
    duration: "16:20",
    thumb: "/images/safed-maas.jpg",
    published: "2026-05-18",
    views: "720K",
    recipeSlug: "safed-maas",
  },
  {
    id: "v8",
    title: "Moong Dal Halwa — slow, patient, perfect",
    series: "Festive Sweets",
    duration: "11:02",
    thumb: "/images/moong-dal-halwa.jpg",
    published: "2026-01-12",
    views: "1.6M",
    recipeSlug: "moong-dal-halwa",
  },
  {
    id: "s1",
    title: "The ghee pour",
    series: "Shorts",
    duration: "0:45",
    thumb: "/images/dal-baati-ghee.jpg",
    published: "2026-09-20",
    views: "3.2M",
    vertical: true,
  },
  {
    id: "s2",
    title: "Plating Laal Maas in 30 seconds",
    series: "Shorts",
    duration: "0:31",
    thumb: "/images/plating-bw-1.jpg",
    published: "2026-09-08",
    views: "1.9M",
    vertical: true,
  },
  {
    id: "s3",
    title: "Why Mathania chillies?",
    series: "Shorts",
    duration: "0:52",
    thumb: "/images/masala-dabba-dark.jpg",
    published: "2026-08-25",
    views: "2.4M",
    vertical: true,
  },
  {
    id: "s4",
    title: "Laddoo, the right way",
    series: "Shorts",
    duration: "0:40",
    thumb: "/images/laddoo-hands.jpg",
    published: "2026-08-11",
    views: "1.2M",
    vertical: true,
  },
];

export const longform = videos.filter((v) => !v.vertical);
export const shorts = videos.filter((v) => v.vertical);
