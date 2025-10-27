'use client';

import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative min-h-screen w-screen overflow-hidden text-white font-poppins">

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/70 to-emerald-800/95" />

      {/* Background Image */}
      <Image
        src="../public/NMGTOURS.png"
        alt="NMG Tours Background"
        fill
        priority
        className="object-cover object-center"
      />
    </div>
  );
}
