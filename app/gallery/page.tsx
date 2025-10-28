import Image from "next/image";

export default function GalleryPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[40vh] flex items-center justify-center">
        <div className="fixed inset-0 -z-20">
          <Image
            src="/NMGTOURS.png"
            alt="Gallery Background"
            fill
            className="object-cover object-center"
          />
        </div>
        <div className="fixed inset-0 bg-black/60 -z-10" />
        <div className="relative z-10 text-center px-6">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 font-caveat">
            Gallery
          </h1>
          <p className="text-xl text-zinc-200">
            Moments from our unforgettable tours
          </p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Gallery Item Placeholders */}
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
            <div
              key={item}
              className="relative aspect-square bg-gradient-to-br from-emerald-600 to-emerald-900 rounded-lg overflow-hidden border border-white/10 hover:border-emerald-400/50 transition group cursor-pointer"
            >
              <div className="absolute inset-0 flex items-center justify-center text-white/50 group-hover:text-white/70 transition">
                <div className="text-center">
                  <p className="text-sm">Gallery Image {item}</p>
                  <p className="text-xs mt-2">Coming Soon</p>
                </div>
              </div>
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition" />
            </div>
          ))}
        </div>

        {/* Info Box */}
        <div className="mt-16 bg-black/40 backdrop-blur-md rounded-lg p-8 border border-white/10 text-center">
          <h2 className="text-3xl font-bold mb-4 text-white font-caveat">
            Share Your Experience
          </h2>
          <p className="text-zinc-300 mb-6 max-w-2xl mx-auto">
            We love seeing photos from our guests! Tag us on social media with your favorite moments from your NMG Tours adventure.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <span className="text-emerald-400 font-semibold">
              #NMGTours
            </span>
            <span className="text-emerald-400 font-semibold">
              #JamaicaRafting
            </span>
            <span className="text-emerald-400 font-semibold">
              #IslandExperiences
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
