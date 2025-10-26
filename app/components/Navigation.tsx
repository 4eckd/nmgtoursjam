'use client';

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="fixed top-0 left-0 z-50 w-full bg-black/70 backdrop-blur-md border-b border-white/10">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/favicon.ico"
            alt="NMG Tours Logo"
            width={40}
            height={40}
            className="rounded-full"
          />
          <span className="text-xl font-semibold tracking-tight text-white">
            NMG <span className="text-emerald-400">Tours</span>
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 text-white font-medium">
          <Link href="/" className="hover:text-emerald-400 transition">Home</Link>
          <Link href="/about" className="hover:text-emerald-400 transition">About</Link>
          <Link href="/tours" className="hover:text-emerald-400 transition">Rafting Tours</Link>
          <Link href="/gallery" className="hover:text-emerald-400 transition">Gallery</Link>
          <Link href="/contact" className="hover:text-emerald-400 transition">Contact</Link>

          {/* CTA Button */}
          <Link
            href="/signup"
            className="ml-4 px-6 py-2 bg-emerald-400 text-black font-semibold rounded-full hover:bg-emerald-300 transition"
          >
            Book Now
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-white hover:text-emerald-400 transition"
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-black/90 backdrop-blur-md border-t border-white/10 px-6 py-6 space-y-4 text-center text-white">
          <Link href="/" onClick={toggleMenu} className="block hover:text-emerald-400 transition">Home</Link>
          <Link href="/about" onClick={toggleMenu} className="block hover:text-emerald-400 transition">About</Link>
          <Link href="/tours" onClick={toggleMenu} className="block hover:text-emerald-400 transition">Rafting Tours</Link>
          <Link href="/gallery" onClick={toggleMenu} className="block hover:text-emerald-400 transition">Gallery</Link>
          <Link href="/contact" onClick={toggleMenu} className="block hover:text-emerald-400 transition">Contact</Link>
          <Link
            href="/signup"
            onClick={toggleMenu}
            className="block px-6 py-3 bg-emerald-400 text-black font-semibold rounded-full hover:bg-emerald-300 transition"
          >
            Book Now
          </Link>
        </div>
      )}
    </nav>
  );
}
