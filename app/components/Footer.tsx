import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full border-t border-zinc-800 bg-black text-zinc-400 py-8 px-6 text-sm flex flex-col sm:flex-row justify-between items-center">
      <div className="flex flex-wrap gap-4 justify-center sm:justify-start">
        <Link href="/terms" className="hover:text-white transition">Terms & Conditions</Link>
        <Link href="/privacy" className="hover:text-white transition">Privacy Policy</Link>
        <Link href="/refunds" className="hover:text-white transition">Refund & Cancellation</Link>
        <Link href="/contact" className="hover:text-white transition">Contact</Link>
        <Link href="/about" className="hover:text-white transition">About</Link>
        <Link href="/signup" className="hover:text-white transition">Sign Up</Link>
      </div>
      <p className="mt-4 sm:mt-0 text-zinc-600 text-xs">© {new Date().getFullYear()} NMG Tours. All rights reserved.</p>
    </footer>
  );
}
