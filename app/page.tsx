import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full text-content-primary font-poppins">
      {/* Hero Content */}
      <div className="flex flex-col items-center justify-center min-h-[80vh] px-6 text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 font-caveat">
          Authentic Island Experiences
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-2xl text-content-secondary">
          Discover the real Jamaica with NMG Tours - rafting adventures, cultural experiences, and unforgettable memories
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/tours"
            className="px-8 py-4 bg-primary text-content-on-primary font-semibold rounded-full hover:bg-primary-hover transition-colors text-lg inline-flex items-center justify-center"
          >
            Explore Tours
          </Link>
          <Link
            href="/contact"
            className="px-8 py-4 bg-surface-elevated backdrop-blur-md text-content-primary font-semibold rounded-full hover:bg-surface-card transition-colors text-lg border border-border-primary inline-flex items-center justify-center"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
