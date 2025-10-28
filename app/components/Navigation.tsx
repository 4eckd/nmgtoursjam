'use client';

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="fixed top-0 left-0 right-0 z-[9999] w-full bg-emerald-500 border-b-4 border-red-500 shadow-2xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo/Brand - Always visible */}
        <Link href="/" className="flex items-center gap-2 z-10 relative">
          <span className="text-2xl md:text-3xl font-bold font-caveat text-black drop-shadow-lg">
            NMG Tours DEBUG
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6 text-black font-medium relative">
          <Link href="/" className="hover:text-red-600 transition-colors text-base font-bold bg-yellow-300 px-4 py-2">
            Home
          </Link>
          <Link href="/about" className="hover:text-red-600 transition-colors text-base font-bold bg-yellow-300 px-4 py-2">
            About
          </Link>
          <Link href="/tours" className="hover:text-red-600 transition-colors text-base font-bold bg-yellow-300 px-4 py-2">
            Rafting Tours
          </Link>
          <Link href="/gallery" className="hover:text-red-600 transition-colors text-base font-bold bg-yellow-300 px-4 py-2">
            Gallery
          </Link>
          <Link href="/contact" className="hover:text-red-600 transition-colors text-base font-bold bg-yellow-300 px-4 py-2">
            Contact
          </Link>
          <Link
            href="/signup"
            className="ml-2 px-6 py-2 bg-emerald-400 text-black font-semibold rounded-full hover:bg-emerald-300 transition-all shadow-md hover:shadow-lg"
          >
            Book Now
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-white hover:text-emerald-400 transition-colors z-10 p-2"
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-black border-t border-emerald-400/30 px-6 py-6 space-y-4 text-center text-white shadow-xl">
          <Link
            href="/"
            onClick={toggleMenu}
            className="block py-2 hover:text-emerald-400 transition-colors text-lg"
          >
            Home
          </Link>
          <Link
            href="/about"
            onClick={toggleMenu}
            className="block py-2 hover:text-emerald-400 transition-colors text-lg"
          >
            About
          </Link>
          <Link
            href="/tours"
            onClick={toggleMenu}
            className="block py-2 hover:text-emerald-400 transition-colors text-lg"
          >
            Rafting Tours
          </Link>
          <Link
            href="/gallery"
            onClick={toggleMenu}
            className="block py-2 hover:text-emerald-400 transition-colors text-lg"
          >
            Gallery
          </Link>
          <Link
            href="/contact"
            onClick={toggleMenu}
            className="block py-2 hover:text-emerald-400 transition-colors text-lg"
          >
            Contact
          </Link>
          <Link
            href="/signup"
            onClick={toggleMenu}
            className="block mx-auto max-w-xs px-6 py-3 bg-emerald-400 text-black font-semibold rounded-full hover:bg-emerald-300 transition-all shadow-md text-lg mt-4"
          >
            Book Now
          </Link>
        </div>
      )}
    </nav>
  );
}
