import Footer from "../components/Footer";

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-zinc-100">
      <main className="flex-1 p-8 max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
        <p className="text-zinc-300 mb-6">
          Have questions? We’d love to hear from you.
        </p>
        <form className="flex flex-col gap-4">
          <input type="text" placeholder="Your Name" className="bg-zinc-900 border border-zinc-700 rounded px-4 py-3 text-white" />
          <input type="email" placeholder="Your Email" className="bg-zinc-900 border border-zinc-700 rounded px-4 py-3 text-white" />
          <textarea placeholder="Your Message" className="bg-zinc-900 border border-zinc-700 rounded px-4 py-3 text-white h-32" />
          <button type="submit" className="bg-emerald-600 hover:bg-emerald-500 text-black font-semibold px-6 py-3 rounded-full">
            Send Message
          </button>
        </form>
      </main>
      <Footer />
    </div>
  );
}
