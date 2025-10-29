import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full text-white font-poppins">
      {/* Hero Content */}
      <div className="flex flex-col items-center justify-center min-h-[80vh] px-6 text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 font-caveat">
          Authentic Island Experiences
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-2xl text-zinc-200">
          Discover the real Jamaica with NMG Tours - rafting adventures, cultural experiences, and unforgettable memories
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/tours"
            className="px-8 py-4 bg-emerald-400 text-black font-semibold rounded-full hover:bg-emerald-300 transition text-lg"
          >
            Explore Tours
          </Link>
          <Link
            href="/contact"
            className="px-8 py-4 bg-white/10 backdrop-blur-md text-white font-semibold rounded-full hover:bg-white/20 transition text-lg border border-white/20"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
