import Link from "next/link";

export default function Footer({ className = "", children }: { className?: string; children?: React.ReactNode }) {
  return (
    <footer className={`w-full border-t border-zinc-800 bg-black text-zinc-400 py-8 px-6 text-sm flex flex-col sm:flex-row justify-between items-center ${className}`}>
      <div className="flex flex-wrap gap-4 justify-center sm:justify-start">
        <Link href="/about" className="hover:text-white transition">About</Link>
        <Link href="/tours" className="hover:text-white transition">Tours</Link>
        <Link href="/gallery" className="hover:text-white transition">Gallery</Link>
        <Link href="/contact" className="hover:text-white transition">Contact</Link>
        <Link href="/signup" className="hover:text-white transition">Book Now</Link>
        <span className="text-zinc-700">|</span>
        <Link href="/legal/terms" className="hover:text-white transition">Terms</Link>
        <Link href="/legal/privacy" className="hover:text-white transition">Privacy</Link>
        <Link href="/legal/cookies" className="hover:text-white transition">Cookies</Link>
        <Link href="/legal/refunds" className="hover:text-white transition">Refunds</Link>
        <Link href="/legal/safety" className="hover:text-white transition">Safety</Link>
      </div>
      <p className="mt-4 sm:mt-0 text-zinc-600 text-xs">
        {children ? children : <>© {new Date().getFullYear()} NMG Tours. All rights reserved.</>}
      </p>
    </footer>
  );
}
