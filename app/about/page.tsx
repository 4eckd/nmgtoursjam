export default function AboutPage() {
  return (
    <div className="text-white">
      {/* Hero Section */}
      <section className="h-[40vh] flex items-center justify-center">
        <div className="text-center px-6">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 font-caveat">
            About NMG Tours
          </h1>
          <p className="text-xl text-zinc-200 max-w-2xl mx-auto">
            Your gateway to authentic Jamaican experiences
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        {/* Our Story */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold mb-6 text-emerald-400 font-caveat">
            Our Story
          </h2>
          <div className="prose prose-lg prose-invert max-w-none">
            <p className="text-zinc-300 leading-relaxed mb-4">
              Welcome to NMG Tours Jamaica - your trusted partner for discovering the authentic beauty and culture of Jamaica. Founded by local guides with deep roots in the island's rich heritage, we specialize in creating unforgettable experiences that go beyond typical tourist attractions.
            </p>
            <p className="text-zinc-300 leading-relaxed mb-4">
              What started as a passion project to share Jamaica's hidden gems has grown into a premier tour operation, serving thousands of satisfied guests from around the world. Our commitment remains the same: to provide genuine, locally-guided experiences that showcase the real Jamaica.
            </p>
          </div>
        </div>

        {/* Our Mission */}
        <div className="mb-16 bg-black/40 backdrop-blur-md rounded-lg p-8 border border-white/10">
          <h2 className="text-4xl font-bold mb-6 text-emerald-400 font-caveat">
            Our Mission
          </h2>
          <p className="text-zinc-300 leading-relaxed text-lg">
            To connect travelers with the soul of Jamaica through authentic experiences, sustainable tourism practices, and genuine hospitality. We believe in supporting local communities while preserving the natural beauty that makes our island paradise so special.
          </p>
        </div>

        {/* What Sets Us Apart */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold mb-8 text-emerald-400 font-caveat">
            What Sets Us Apart
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-black/30 backdrop-blur-sm rounded-lg p-6 border border-white/10">
              <h3 className="text-2xl font-bold mb-3 text-emerald-300">
                Local Expertise
              </h3>
              <p className="text-zinc-300">
                All our guides are born and raised in Jamaica, bringing insider knowledge and authentic stories you won't find in guidebooks.
              </p>
            </div>
            <div className="bg-black/30 backdrop-blur-sm rounded-lg p-6 border border-white/10">
              <h3 className="text-2xl font-bold mb-3 text-emerald-300">
                Small Groups
              </h3>
              <p className="text-zinc-300">
                We keep our tour groups intimate to ensure personalized attention and a more meaningful connection with the experience.
              </p>
            </div>
            <div className="bg-black/30 backdrop-blur-sm rounded-lg p-6 border border-white/10">
              <h3 className="text-2xl font-bold mb-3 text-emerald-300">
                Sustainable Tourism
              </h3>
              <p className="text-zinc-300">
                We're committed to eco-friendly practices that protect Jamaica's natural beauty for future generations while supporting local communities.
              </p>
            </div>
            <div className="bg-black/30 backdrop-blur-sm rounded-lg p-6 border border-white/10">
              <h3 className="text-2xl font-bold mb-3 text-emerald-300">
                Safety First
              </h3>
              <p className="text-zinc-300">
                Your safety is our top priority. All our tours follow strict safety protocols, and our guides are trained and certified professionals.
              </p>
            </div>
          </div>
        </div>

        {/* Our Specialties */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold mb-8 text-emerald-400 font-caveat">
            Our Specialties
          </h2>
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-emerald-900/50 to-black/30 backdrop-blur-sm rounded-lg p-6 border border-emerald-500/20">
              <h3 className="text-2xl font-bold mb-2 text-white">
                Bamboo Rafting Adventures
              </h3>
              <p className="text-zinc-300">
                Experience the tranquil beauty of Jamaica's rivers on a traditional bamboo raft, guided by expert raftsmen who share stories of the island's history and culture.
              </p>
            </div>
            <div className="bg-gradient-to-r from-emerald-900/50 to-black/30 backdrop-blur-sm rounded-lg p-6 border border-emerald-500/20">
              <h3 className="text-2xl font-bold mb-2 text-white">
                Cultural Experiences
              </h3>
              <p className="text-zinc-300">
                Immerse yourself in authentic Jamaican culture - from local cuisine and music to historical sites and community interactions that showcase the real island life.
              </p>
            </div>
            <div className="bg-gradient-to-r from-emerald-900/50 to-black/30 backdrop-blur-sm rounded-lg p-6 border border-emerald-500/20">
              <h3 className="text-2xl font-bold mb-2 text-white">
                Natural Wonders
              </h3>
              <p className="text-zinc-300">
                Discover Jamaica's breathtaking natural beauty - from pristine beaches and cascading waterfalls to lush rainforests teeming with tropical wildlife.
              </p>
            </div>
          </div>
        </div>

        {/* Meet Our Team (Placeholder) */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold mb-8 text-emerald-400 font-caveat text-center">
            Meet Our Team
          </h2>
          <div className="text-center bg-black/40 backdrop-blur-md rounded-lg p-12 border border-white/10">
            <p className="text-zinc-300 text-lg mb-4">
              Our team of passionate local guides is ready to share their love for Jamaica with you.
            </p>
            <p className="text-zinc-400">
              Team profiles and photos coming soon!
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gradient-to-r from-emerald-600 to-emerald-800 rounded-lg p-12">
          <h2 className="text-3xl font-bold mb-4 text-white font-caveat">
            Ready to Experience the Real Jamaica?
          </h2>
          <p className="text-white/90 mb-6 text-lg">
            Join us for an unforgettable adventure that will create memories to last a lifetime.
          </p>
          <a
            href="/tours"
            className="inline-block px-8 py-4 bg-white text-emerald-900 font-semibold rounded-full hover:bg-zinc-100 transition text-lg"
          >
            Browse Our Tours
          </a>
        </div>
      </section>
    </div>
  );
}
