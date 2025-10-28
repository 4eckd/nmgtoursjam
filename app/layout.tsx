import type { Metadata } from "next";
import { Poppins, Caveat } from "next/font/google";
import Footer from "@/app/components/Footer";
import NavBar from "@/app/components/Navigation";

// Fonts
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

// SEO Metadata
export const metadata: Metadata = {
  title: "NMG Tours | Authentic Island Experiences",
  description:
    "Discover authentic reggae, culture, and adventure with NMG Tours Jamaica. Book unforgettable experiences across the island — powered by local guides and true island vibes.",
  openGraph: {
    title: "NMG Tours",
    description:
      "Experience Jamaica with NMG Tours — authentic, vibrant, and unforgettable.",
    url: "https://nmgtoursjam.com",
    siteName: "NMG Tours",
    images: [
      {
        url: "/NMGTOURS.png",
        width: 1920,
        height: 1080,
        alt: "NMG Tours",
      },
    ],
    locale: "en_JM",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

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
        {/* ✅ Global Navigation */}
        <NavBar />

        {/* ✅ Page Content */}
        <main className="pt-24">{children}</main>

        {/* ✅ Optional Global Footer (add later if desired) */}
        <Footer />
      </body>
    </html>
  );
}
