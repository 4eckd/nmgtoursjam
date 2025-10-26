'use client';

import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative min-h-screen w-screen overflow-hidden text-white font-poppins">
      {/* Background Image */}
      <Image
        src="/NMGTOURS.png"
        alt="NMG Tours Background"
        fill
        priority
        className="object-cover object-center"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/70 to-emerald-800/95" />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center">
        {/* Logo */}
        <div className="mb-6">
          <Image
            src="/favicon.ico"
            alt="NMG Tours Logo"
            width={320}
            height={320}
            className="drop-shadow-lg mx-auto"
            priority
          />
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl font-bold leading-tight drop-shadow-md tracking-tight">
          NMG <span className="text-emerald-400">Tour Jams</span>
        </h1>

        {/* Subtext */}
        <p className="mt-4 text-lg text-white/90 max-w-md leading-relaxed">
          Discover your next water adventure with <span className="text-emerald-400">NMG Tours</span>.
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center">
          <Link
            href="/signup"
            className="px-8 py-4 rounded-full bg-emerald-400 text-black font-semibold hover:bg-emerald-300 transition text-center"
          >
            START HERE
          </Link>
          <Link
            href="/about"
            className="px-8 py-4 rounded-full border border-white/80 text-white hover:bg-white/10 transition text-center"
          >
            Learn More
          </Link>
        </div>

        {/* Footer */}
        <footer className="mt-16 text-sm text-white/80">
          © {new Date().getFullYear()} NMG Tour Jams · All Rights Reserved
        </footer>
      </div>
    </div>
  );
}
