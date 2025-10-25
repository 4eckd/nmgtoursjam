import type { Metadata } from "next";
import { Poppins, Caveat } from "next/font/google";
import "./globals.css";

// Fonts — modern + relaxed handwriting accent
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
    siteName: "NMG Tours Jamaica",
    images: [
      {
        url: "/NMGTOURS.png", // replace with your actual image path
        width: 1200,
        height: 630,
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
            "linear-gradient(135deg, #e11d48 0%, #facc15 50%, #16a34a 100%)",
          backgroundAttachment: "fixed",
          backgroundSize: "cover",
        }}
      >
        <main className="flex flex-col items-center justify-center min-h-screen px-6">
          {children}
        </main>
      </body>
    </html>
  );
}
