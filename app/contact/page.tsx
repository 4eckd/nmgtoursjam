'use client';

import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    // TODO: Replace with actual API call
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      setSubmitStatus('success');
      setFormData({ name: '', email: '', phone: '', message: '' });
      setErrors({});
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="text-white">
      {/* Hero Section */}
      <section className="h-[40vh] flex items-center justify-center">
        <div className="text-center px-6">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 font-caveat">
            Get In Touch
          </h1>
          <p className="text-xl text-zinc-200 max-w-2xl mx-auto">
            Have questions? We'd love to hear from you
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-black/40 backdrop-blur-md rounded-lg p-8 border border-white/10">
            <h2 className="text-3xl font-bold mb-6 text-emerald-400 font-caveat">
              Send Us a Message
            </h2>

            {submitStatus === 'success' && (
              <div className="mb-6 p-4 bg-emerald-500/20 border border-emerald-500/50 rounded-lg">
                <p className="text-emerald-300 font-semibold">
                  Thank you for your message! We'll get back to you soon.
                </p>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg">
                <p className="text-red-300 font-semibold">
                  Something went wrong. Please try again later.
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-sm font-semibold mb-2 text-zinc-300">
                  Your Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full bg-black/50 border ${
                    errors.name ? 'border-red-500' : 'border-white/20'
                  } rounded-lg px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-400 transition`}
                  placeholder="John Doe"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-400">{errors.name}</p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold mb-2 text-zinc-300">
                  Your Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full bg-black/50 border ${
                    errors.email ? 'border-red-500' : 'border-white/20'
                  } rounded-lg px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-400 transition`}
                  placeholder="john@example.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-400">{errors.email}</p>
                )}
              </div>

              {/* Phone Field */}
              <div>
                <label htmlFor="phone" className="block text-sm font-semibold mb-2 text-zinc-300">
                  Phone Number (Optional)
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-400 transition"
                  placeholder="+1 (876) 123-4567"
                />
              </div>

              {/* Message Field */}
              <div>
                <label htmlFor="message" className="block text-sm font-semibold mb-2 text-zinc-300">
                  Your Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className={`w-full bg-black/50 border ${
                    errors.message ? 'border-red-500' : 'border-white/20'
                  } rounded-lg px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-400 transition resize-none`}
                  placeholder="Tell us about your inquiry..."
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-red-400">{errors.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-emerald-400 hover:bg-emerald-300 disabled:bg-emerald-400/50 disabled:cursor-not-allowed text-black font-semibold px-6 py-4 rounded-full transition text-lg"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-black/40 backdrop-blur-md rounded-lg p-8 border border-white/10">
              <h2 className="text-3xl font-bold mb-6 text-emerald-400 font-caveat">
                Contact Information
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-white">
                    Email Us
                  </h3>
                  <a
                    href="mailto:info@nmgtours.com"
                    className="text-zinc-300 hover:text-emerald-400 transition"
                  >
                    info@nmgtours.com
                  </a>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-white">
                    Call Us
                  </h3>
                  <a
                    href="tel:+18761234567"
                    className="text-zinc-300 hover:text-emerald-400 transition"
                  >
                    +1 (876) 123-4567
                  </a>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-white">
                    Visit Us
                  </h3>
                  <p className="text-zinc-300">
                    Montego Bay, Jamaica<br />
                    (Address details coming soon)
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-white">
                    Business Hours
                  </h3>
                  <p className="text-zinc-300">
                    Monday - Sunday: 7:00 AM - 7:00 PM<br />
                    (Jamaica Time / EST -5 hours)
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-emerald-900/50 to-black/30 backdrop-blur-sm rounded-lg p-8 border border-emerald-500/20">
              <h3 className="text-2xl font-bold mb-4 text-white font-caveat">
                Quick Response
              </h3>
              <p className="text-zinc-300">
                We typically respond to inquiries within 24 hours. For urgent matters or last-minute bookings, please call us directly.
              </p>
            </div>

            <div className="bg-black/40 backdrop-blur-md rounded-lg p-8 border border-white/10">
              <h3 className="text-2xl font-bold mb-4 text-white font-caveat">
                Follow Us
              </h3>
              <p className="text-zinc-300 mb-4">
                Stay connected for the latest tours, special offers, and island adventures!
              </p>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="text-zinc-300 hover:text-emerald-400 transition"
                  aria-label="Facebook"
                >
                  Facebook
                </a>
                <a
                  href="#"
                  className="text-zinc-300 hover:text-emerald-400 transition"
                  aria-label="Instagram"
                >
                  Instagram
                </a>
                <a
                  href="#"
                  className="text-zinc-300 hover:text-emerald-400 transition"
                  aria-label="Twitter"
                >
                  Twitter
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
