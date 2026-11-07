import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Halant, Tiro_Devanagari_Hindi } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { ArchDefs } from "@/components/ornaments/Arch";
import { site } from "@/content/site";
import "./globals.css";

/* Zodiak & Ranade: Indian Type Foundry (ITF Free Font License). Tiro Devanagari: SIL OFL. */
const zodiak = localFont({
  variable: "--font-zodiak",
  display: "swap",
  src: [
    { path: "../fonts/Zodiak-300.woff2", weight: "300", style: "normal" },
    { path: "../fonts/Zodiak-300-italic.woff2", weight: "300", style: "italic" },
    { path: "../fonts/Zodiak-400.woff2", weight: "400", style: "normal" },
    { path: "../fonts/Zodiak-400-italic.woff2", weight: "400", style: "italic" },
    { path: "../fonts/Zodiak-700.woff2", weight: "700", style: "normal" },
  ],
});

const ranade = localFont({
  variable: "--font-ranade",
  display: "swap",
  src: [
    { path: "../fonts/Ranade-300.woff2", weight: "300", style: "normal" },
    { path: "../fonts/Ranade-400.woff2", weight: "400", style: "normal" },
    { path: "../fonts/Ranade-400-italic.woff2", weight: "400", style: "italic" },
    { path: "../fonts/Ranade-500.woff2", weight: "500", style: "normal" },
    { path: "../fonts/Ranade-700.woff2", weight: "700", style: "normal" },
  ],
});

const tiro = Tiro_Devanagari_Hindi({
  variable: "--font-tiro",
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["devanagari", "latin"],
  display: "swap",
});

/* Halant Light (Indian Type Foundry, SIL OFL) — large Devanagari display lines */
const halant = Halant({
  variable: "--font-halant",
  weight: "300",
  subsets: ["devanagari"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.fullTitle} — Recipes & stories from Rajasthan`,
    template: `%s — ${site.fullTitle}`,
  },
  description: site.tagline,
  openGraph: {
    type: "website",
    siteName: site.fullTitle,
    locale: "en_IN",
    images: [{ url: "/images/dal-baati-ghee.jpg", width: 2200, height: 2200 }],
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#fbf7f0",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${zodiak.variable} ${ranade.variable} ${tiro.variable} ${halant.variable}`}
    >
      <head>
        {/* Lets CSS hide scroll-reveal content only when JavaScript is running */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <ArchDefs />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <SmoothScroll />
      </body>
    </html>
  );
}
