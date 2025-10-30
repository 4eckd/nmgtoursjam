'use client';

import { useState } from "react";
import Link from "next/link";
// TODO: Re-enable in TRACK 4 - Authentication
// import { useSession, signOut } from 'next-auth/react';
import { useSession, signOut } from '@/app/components/SessionProviderWrapper';
import { User, LogOut, LayoutDashboard } from 'lucide-react';

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { data: session, status } = useSession();
  const isLoading = status === 'loading';

  return (
    <nav className="fixed top-0 left-0 right-0 z-[9999] w-full bg-surface-dark border-b-2 border-border-accent shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="no-underline">
          <span className="text-3xl font-bold text-primary font-[var(--font-caveat)]">
            NMG Tours
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 items-center">
          <Link href="/" className="text-content-primary no-underline font-semibold hover:text-primary transition-colors">
            Home
          </Link>
          <Link href="/about" className="text-content-primary no-underline font-semibold hover:text-primary transition-colors">
            About
          </Link>
          <Link href="/tours" className="text-content-primary no-underline font-semibold hover:text-primary transition-colors">
            Tours
          </Link>
          <Link href="/gallery" className="text-content-primary no-underline font-semibold hover:text-primary transition-colors">
            Gallery
          </Link>
          <Link href="/contact" className="text-content-primary no-underline font-semibold hover:text-primary transition-colors">
            Contact
          </Link>

          {/* Auth Buttons */}
          {session ? (
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="bg-primary hover:bg-primary-hover text-content-on-primary px-4 py-2 rounded-full border-none cursor-pointer font-semibold flex items-center gap-2 transition-colors"
              >
                <User size={18} />
                {session?.user?.name?.split(' ')[0] || 'Account'}
              </button>

              {userMenuOpen && (
                <div className="absolute top-full right-0 mt-2 bg-surface-dark border border-border-accent rounded-lg min-w-[200px] shadow-lg z-[10000]">
                  <Link
                    href="/dashboard"
                    onClick={() => setUserMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 text-content-primary no-underline border-b border-border-primary hover:bg-surface-elevated transition-colors"
                  >
                    <LayoutDashboard size={18} />
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      setUserMenuOpen(false);
                      signOut({ callbackUrl: '/' });
                    }}
                    className="flex items-center gap-3 w-full px-4 py-3 text-error bg-transparent border-none cursor-pointer text-left font-medium hover:bg-surface-elevated transition-colors"
                  >
                    <LogOut size={18} />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="text-content-primary no-underline font-semibold hover:text-primary transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                className="bg-primary hover:bg-primary-hover text-content-on-primary px-6 py-2 rounded-full no-underline font-semibold transition-colors"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden bg-transparent border-none text-content-primary text-2xl cursor-pointer p-2"
          aria-label="Toggle menu"
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="bg-surface-dark border-t border-border-accent p-6 flex flex-col gap-4 text-center md:hidden">
          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            className="text-content-primary no-underline py-2 text-lg hover:text-primary transition-colors"
          >
            Home
          </Link>
          <Link
            href="/about"
            onClick={() => setMenuOpen(false)}
            className="text-content-primary no-underline py-2 text-lg hover:text-primary transition-colors"
          >
            About
          </Link>
          <Link
            href="/tours"
            onClick={() => setMenuOpen(false)}
            className="text-content-primary no-underline py-2 text-lg hover:text-primary transition-colors"
          >
            Tours
          </Link>
          <Link
            href="/gallery"
            onClick={() => setMenuOpen(false)}
            className="text-content-primary no-underline py-2 text-lg hover:text-primary transition-colors"
          >
            Gallery
          </Link>
          <Link
            href="/contact"
            onClick={() => setMenuOpen(false)}
            className="text-content-primary no-underline py-2 text-lg hover:text-primary transition-colors"
          >
            Contact
          </Link>

          {/* Mobile Auth Buttons */}
          {!isLoading && (
            session ? (
              <>
                <Link
                  href="/dashboard"
                  onClick={() => setMenuOpen(false)}
                  className="bg-primary hover:bg-primary-hover text-content-on-primary px-6 py-3 rounded-full no-underline font-semibold mt-2 inline-block transition-colors"
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    signOut({ callbackUrl: '/' });
                  }}
                  className="text-error bg-transparent border-none py-2 text-lg cursor-pointer font-medium"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setMenuOpen(false)}
                  className="text-content-primary no-underline py-2 text-lg hover:text-primary transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setMenuOpen(false)}
                  className="bg-primary hover:bg-primary-hover text-content-on-primary px-6 py-3 rounded-full no-underline font-semibold mt-2 inline-block transition-colors"
                >
                  Sign Up
                </Link>
              </>
            )
          )}
        </div>
      )}
    </nav>
  );
}
