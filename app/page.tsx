'use client';

import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative w-full overflow-hidden text-white font-poppins">
      {/* Background Image - Fixed position for full viewport coverage */}
      <div className="fixed inset-0 -z-20">
        <Image
          src="/NMGTOURS.png"
          alt="NMG Tours Background"
          fill
          priority
          className="object-cover object-center"
        />
      </div>

      {/* Gradient Overlay */}
      <div className="fixed inset-0 bg-gradient-to-b from-black/30 via-black/70 to-emerald-800/95 -z-10" />

      {/* Hero Content - Accounts for navigation height */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 font-caveat">
          Authentic Island Experiences
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-2xl text-zinc-200">
          Discover the real Jamaica with NMG Tours - rafting adventures, cultural experiences, and unforgettable memories
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/tours"
            className="px-8 py-4 bg-emerald-400 text-black font-semibold rounded-full hover:bg-emerald-300 transition text-lg"
          >
            Explore Tours
          </Link>
          <Link
            href="/contact"
            className="px-8 py-4 bg-white/10 backdrop-blur-md text-white font-semibold rounded-full hover:bg-white/20 transition text-lg border border-white/20"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
