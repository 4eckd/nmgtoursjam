import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Poppins, Caveat } from "next/font/google";
import Footer from "@/app/components/Footer";
import NavBar from "@/app/components/Navigation";
import SessionProvider from "@/app/components/SessionProvider";

// =====================
// Fonts
// =====================
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-poppins",
});

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-caveat",
});

// =====================
// SEO Metadata
// =====================
export const metadata: Metadata = {
  title: "NMG Tours | Authentic Island Experiences",
  description:
    "Discover authentic reggae, culture, and adventure with NMG Tours Jamaica. Book unforgettable experiences across the island — powered by local guides and true island vibes.",

  openGraph: {
    title: "NMG Tours | Authentic Island Experiences",
    description:
      "Experience Jamaica with NMG Tours — authentic, vibrant, and unforgettable.",
    url: "https://nmgtoursjam.com",
    siteName: "NMG Tours",
    images: [
      {
        url: "/twitter.png", // ✅ Using the same image for OG & Twitter
        width: 1200,
        height: 630,
        alt: "NMG Tours — Explore Jamaica",
      },
    ],
    locale: "en_JM",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "NMG Tours | Authentic Island Experiences",
    description:
      "Explore Jamaica with NMG Tours — where authentic island culture meets unforgettable adventure.",
    images: ["/twitter.png"], // ✅ Local image in /public
    site: "@nmgtoursjam", // optional: add your Twitter handle if available
    creator: "@nmgtoursjam",
  },

  icons: {
    icon: "/favicon.ico",
  },
};

// =====================
// Layout Component
// =====================
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${caveat.variable} antialiased min-h-screen text-white`}
        style={{
          background:
            "linear-gradient(135deg, #4747475e 15%, #853e3e83 50%, #55d2836c 90%)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <SessionProvider>
          {/* ✅ Global Navigation */}
          <NavBar />

          {/* ✅ Page Content */}
          <main className="pt-24">{children}</main>

          {/* ✅ Global Footer */}
          <Footer />
        </SessionProvider>

        <Analytics />
      </body>
    </html>
  );
}
