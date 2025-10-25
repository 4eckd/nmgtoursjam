import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-red-600 via-yellow-400 to-green-600 text-white font-poppins">
      <main className="flex flex-col items-center justify-center w-full max-w-4xl px-6 py-20 text-center sm:px-12">
        {/* Logo */}
        <Image
          src="/favicon.png"
          alt="NMG Tours Logo"
          width={120}
          height={120}
          className="drop-shadow-lg mb-6"
          priority
        />

        {/* Hero Text */}
        <h1 className="text-4xl sm:text-6xl font-bold leading-tight drop-shadow-md">
          NMG  <span className="text-yellow-300"> Tours</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-white/90 leading-relaxed">
          
        </p>

        {/* Call to Action Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          <Link
            href="/book"
            className="px-8 py-4 rounded-full bg-white text-green-700 font-semibold hover:bg-yellow-300 transition"
          >
            DONATE
          </Link>
          <Link
            href="/about"
            className="px-8 py-4 rounded-full border border-white/80 text-white hover:bg-white/10 transition"
          >
            Learn More
          </Link>
        </div>

        {/* Footer */}
        <footer className="mt-16 text-sm text-white/80">
          © {new Date().getFullYear()} · All Rights Reserved
        </footer>
      </main>
    </div>
  );
}
