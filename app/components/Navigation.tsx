'use client';

import { useState } from "react";
import Link from "next/link";

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        width: '100%',
        backgroundColor: '#000',
        borderBottom: '2px solid rgba(16, 185, 129, 0.3)',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.5)'
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1rem 1.5rem'
        }}
      >
        {/* Logo */}
        <Link href="/" style={{ textDecoration: 'none' }}>
          <span
            style={{
              fontSize: '1.875rem',
              fontWeight: 'bold',
              color: '#10b981',
              fontFamily: 'var(--font-caveat)'
            }}
          >
            NMG Tours
          </span>
        </Link>

        {/* Desktop Menu */}
        <div
          style={{
            display: 'none',
            gap: '2rem',
            alignItems: 'center'
          }}
          className="desktop-nav"
        >
          <Link href="/" style={{ color: '#fff', textDecoration: 'none', fontWeight: 600 }}>Home</Link>
          <Link href="/about" style={{ color: '#fff', textDecoration: 'none', fontWeight: 600 }}>About</Link>
          <Link href="/tours" style={{ color: '#fff', textDecoration: 'none', fontWeight: 600 }}>Tours</Link>
          <Link href="/gallery" style={{ color: '#fff', textDecoration: 'none', fontWeight: 600 }}>Gallery</Link>
          <Link href="/contact" style={{ color: '#fff', textDecoration: 'none', fontWeight: 600 }}>Contact</Link>
          <Link
            href="/signup"
            style={{
              backgroundColor: '#10b981',
              color: '#000',
              padding: '0.5rem 1.5rem',
              borderRadius: '9999px',
              textDecoration: 'none',
              fontWeight: 600
            }}
          >
            Book Now
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            background: 'none',
            border: 'none',
            color: '#fff',
            fontSize: '1.5rem',
            cursor: 'pointer',
            padding: '0.5rem'
          }}
          className="mobile-menu-btn"
          aria-label="Toggle menu"
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div
          style={{
            backgroundColor: '#000',
            borderTop: '1px solid rgba(16, 185, 129, 0.3)',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            textAlign: 'center'
          }}
          className="mobile-menu"
        >
          <Link href="/" onClick={() => setMenuOpen(false)} style={{ color: '#fff', textDecoration: 'none', padding: '0.5rem', fontSize: '1.125rem' }}>Home</Link>
          <Link href="/about" onClick={() => setMenuOpen(false)} style={{ color: '#fff', textDecoration: 'none', padding: '0.5rem', fontSize: '1.125rem' }}>About</Link>
          <Link href="/tours" onClick={() => setMenuOpen(false)} style={{ color: '#fff', textDecoration: 'none', padding: '0.5rem', fontSize: '1.125rem' }}>Tours</Link>
          <Link href="/gallery" onClick={() => setMenuOpen(false)} style={{ color: '#fff', textDecoration: 'none', padding: '0.5rem', fontSize: '1.125rem' }}>Gallery</Link>
          <Link href="/contact" onClick={() => setMenuOpen(false)} style={{ color: '#fff', textDecoration: 'none', padding: '0.5rem', fontSize: '1.125rem' }}>Contact</Link>
          <Link
            href="/signup"
            onClick={() => setMenuOpen(false)}
            style={{
              backgroundColor: '#10b981',
              color: '#000',
              padding: '0.75rem 1.5rem',
              borderRadius: '9999px',
              textDecoration: 'none',
              fontWeight: 600,
              marginTop: '0.5rem',
              display: 'inline-block'
            }}
          >
            Book Now
          </Link>
        </div>
      )}

      <style jsx>{`
        @media (min-width: 768px) {
          .desktop-nav {
            display: flex !important;
          }
          .mobile-menu-btn {
            display: none !important;
          }
        }
      `}</style>
    </nav>
  );
}
