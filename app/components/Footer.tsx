import Link from "next/link";

export default function Footer({ className = "", children }: { className?: string; children?: React.ReactNode }) {
  return (
    <footer className={`w-full border-t border-border-secondary bg-surface-dark text-content-secondary py-8 px-6 text-sm flex flex-col sm:flex-row justify-between items-center ${className}`}>
      <div className="flex flex-wrap gap-4 justify-center sm:justify-start">
        <Link href="/about" className="hover:text-content-primary transition-colors">About</Link>
        <Link href="/tours" className="hover:text-content-primary transition-colors">Tours</Link>
        <Link href="/gallery" className="hover:text-content-primary transition-colors">Gallery</Link>
        <Link href="/contact" className="hover:text-content-primary transition-colors">Contact</Link>
        <Link href="/signup" className="hover:text-content-primary transition-colors">Book Now</Link>
        <span className="text-content-tertiary">|</span>
        <Link href="/legal/terms" className="hover:text-content-primary transition-colors">Terms</Link>
        <Link href="/legal/privacy" className="hover:text-content-primary transition-colors">Privacy</Link>
        <Link href="/legal/cookies" className="hover:text-content-primary transition-colors">Cookies</Link>
        <Link href="/legal/refunds" className="hover:text-content-primary transition-colors">Refunds</Link>
        <Link href="/legal/safety" className="hover:text-content-primary transition-colors">Safety</Link>
      </div>
      <p className="mt-4 sm:mt-0 text-content-tertiary text-xs">
        {children ? children : <>© {new Date().getFullYear()} NMG Tours. All rights reserved.</>}
      </p>
    </footer>
  );
}
