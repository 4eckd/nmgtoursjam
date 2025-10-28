import Image from "next/image";
import Link from "next/link";

export default function ToursPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[40vh] flex items-center justify-center">
        <div className="fixed inset-0 -z-20">
          <Image
            src="/NMGTOURS.png"
            alt="Rafting Tours Background"
            fill
            className="object-cover object-center"
          />
        </div>
        <div className="fixed inset-0 bg-black/60 -z-10" />
        <div className="relative z-10 text-center px-6">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 font-caveat">
            Rafting Tours
          </h1>
          <p className="text-xl text-zinc-200">
            Experience Jamaica's rivers like never before
          </p>
        </div>
      </section>

      {/* Tours Listing Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Tour Card Placeholder */}
          <div className="bg-black/40 backdrop-blur-md rounded-lg overflow-hidden border border-white/10 hover:border-emerald-400/50 transition">
            <div className="relative h-48 bg-gradient-to-br from-emerald-600 to-emerald-900">
              <div className="absolute inset-0 flex items-center justify-center text-white/50">
                Tour Image Coming Soon
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-2 text-white">
                Martha Brae Rafting
              </h3>
              <p className="text-zinc-300 mb-4">
                Enjoy a peaceful 3-mile journey down the Martha Brae River on a traditional bamboo raft.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-emerald-400 font-semibold text-lg">
                  From $65/person
                </span>
                <Link
                  href="/contact"
                  className="px-4 py-2 bg-emerald-400 text-black font-semibold rounded-full hover:bg-emerald-300 transition"
                >
                  Book Now
                </Link>
              </div>
            </div>
          </div>

          {/* More tour cards coming soon */}
          <div className="bg-black/40 backdrop-blur-md rounded-lg overflow-hidden border border-white/10 hover:border-emerald-400/50 transition">
            <div className="relative h-48 bg-gradient-to-br from-emerald-600 to-emerald-900">
              <div className="absolute inset-0 flex items-center justify-center text-white/50">
                Tour Image Coming Soon
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-2 text-white">
                Rio Grande Rafting
              </h3>
              <p className="text-zinc-300 mb-4">
                Experience the longest and most scenic rafting adventure on Jamaica's Rio Grande.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-emerald-400 font-semibold text-lg">
                  From $75/person
                </span>
                <Link
                  href="/contact"
                  className="px-4 py-2 bg-emerald-400 text-black font-semibold rounded-full hover:bg-emerald-300 transition"
                >
                  Book Now
                </Link>
              </div>
            </div>
          </div>

          <div className="bg-black/40 backdrop-blur-md rounded-lg overflow-hidden border border-white/10 hover:border-emerald-400/50 transition">
            <div className="relative h-48 bg-gradient-to-br from-emerald-600 to-emerald-900">
              <div className="absolute inset-0 flex items-center justify-center text-white/50">
                Tour Image Coming Soon
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-2 text-white">
                White River Rafting
              </h3>
              <p className="text-zinc-300 mb-4">
                Float down the serene White River surrounded by lush tropical landscapes.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-emerald-400 font-semibold text-lg">
                  From $60/person
                </span>
                <Link
                  href="/contact"
                  className="px-4 py-2 bg-emerald-400 text-black font-semibold rounded-full hover:bg-emerald-300 transition"
                >
                  Book Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
