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
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/60 to-green-800 opacity-95" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center">
        {/* Logo */}
        <div className="mb-6">
          <Image
            src="/favicon.ico"
            alt="NMG Tours Logo"
            width={120}
            height={120}
            className="drop-shadow-lg mx-auto"
            priority
          />
        </div>

        {/* Hero Text */}
        <h1 className="text-4xl sm:text-6xl font-bold leading-tight drop-shadow-md">
          NMG <span className="text-yellow-300">Tours</span>
        </h1>

        {/* Subtext */}
        <p className="mt-4 text-lg text-white/90 max-w-md leading-relaxed">
          Discover your next adventure with NMG Tours.
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center">
          <Link
            href="/start"
            className="px-8 py-4 rounded-full bg-yellow-400 text-green-900 font-semibold hover:bg-yellow-300 transition text-center"
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
          © {new Date().getFullYear()} · All Rights Reserved
        </footer>
      </div>
    </div>
  );
}
