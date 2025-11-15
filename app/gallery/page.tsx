'use client';

import Image from "next/image";
import { useState } from "react";

interface GalleryItem {
  id: number;
  title: string;
  category: 'rafting' | 'culture' | 'nature' | 'food';
  placeholder: string;
}

const galleryItems: GalleryItem[] = [
  { id: 1, title: 'Bamboo Rafting on the Rio Grande', category: 'rafting', placeholder: 'from-blue-600 to-emerald-700' },
  { id: 2, title: 'Traditional Jamaican Cuisine', category: 'food', placeholder: 'from-orange-600 to-red-700' },
  { id: 3, title: 'Dunn\'s River Falls Adventure', category: 'nature', placeholder: 'from-emerald-600 to-teal-700' },
  { id: 4, title: 'Local Cultural Performance', category: 'culture', placeholder: 'from-purple-600 to-pink-700' },
  { id: 5, title: 'Sunset Cruise Experience', category: 'rafting', placeholder: 'from-yellow-600 to-orange-700' },
  { id: 6, title: 'Tropical Rainforest Hiking', category: 'nature', placeholder: 'from-green-700 to-emerald-800' },
  { id: 7, title: 'Reggae Music & Dance', category: 'culture', placeholder: 'from-red-600 to-yellow-600' },
  { id: 8, title: 'Fresh Tropical Fruits', category: 'food', placeholder: 'from-lime-600 to-green-700' },
  { id: 9, title: 'Beach Paradise Views', category: 'nature', placeholder: 'from-cyan-600 to-blue-700' },
  { id: 10, title: 'Martha Brae River Rafting', category: 'rafting', placeholder: 'from-teal-600 to-emerald-700' },
  { id: 11, title: 'Historic Rose Hall Tour', category: 'culture', placeholder: 'from-stone-600 to-zinc-700' },
  { id: 12, title: 'Jerk Chicken Cooking Class', category: 'food', placeholder: 'from-amber-600 to-red-700' },
];

const categories = [
  { value: 'all', label: 'All Photos' },
  { value: 'rafting', label: 'Rafting' },
  { value: 'culture', label: 'Culture' },
  { value: 'nature', label: 'Nature' },
  { value: 'food', label: 'Food' },
];

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredItems = selectedCategory === 'all'
    ? galleryItems
    : galleryItems.filter(item => item.category === selectedCategory);

  return (
    <div className="min-h-screen text-white">
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

      {/* Gallery Content */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        {/* Category Filter */}
        <div className="mb-12">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category.value}
                onClick={() => setSelectedCategory(category.value)}
                className={`px-6 py-2 rounded-full font-semibold transition ${
                  selectedCategory === category.value
                    ? 'bg-emerald-400 text-black'
                    : 'bg-black/40 text-white border border-white/20 hover:border-emerald-400/50'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="relative aspect-square bg-gradient-to-br rounded-lg overflow-hidden border border-white/10 hover:border-emerald-400/50 transition group cursor-pointer"
            >
              {/* Placeholder gradient background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${item.placeholder}`} />

              {/* Content overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/60 transition">
                <div className="text-center p-4">
                  <p className="text-white font-semibold text-lg mb-2">
                    {item.title}
                  </p>
                  <span className="inline-block px-3 py-1 bg-emerald-400/20 border border-emerald-400/50 rounded-full text-emerald-300 text-xs uppercase tracking-wide">
                    {item.category}
                  </span>
                  <p className="text-zinc-300 text-xs mt-3">
                    Photo Coming Soon
                  </p>
                </div>
              </div>

              {/* Hover effect */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-emerald-400/30 transition rounded-lg" />
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
