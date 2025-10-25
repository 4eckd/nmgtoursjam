import type { Metadata } from "next";
import { Poppins, Caveat } from "next/font/google";
import "./globals.css";

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
        url: "/NMGTOURS.png", // ✅ Corrected public path
        width: 1920,
        height: 1080,
        alt: "NMG Tours",
      },
    ],
    locale: "en_JM",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico", // ✅ Corrected path
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
        // ✅ Moved gradient to html background instead of fixed body gradient
        style={{
          background:
            "linear-gradient(135deg, #e11d48 0%, #facc15 50%, #16a34a 100%)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        {/* ✅ Do not wrap children in <main>, let each page define its layout */}
        {children}
      </body>
    </html>
  );
}
