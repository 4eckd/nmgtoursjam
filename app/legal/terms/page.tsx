import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms & Conditions | NMGToursJam',
  description: 'Terms and conditions for using NMGToursJam tourism services, booking tours, and attending cultural jams in New Mexico.',
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-transparent">
      <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-white mb-8">Terms & Conditions</h1>
        
        <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-lg p-8 space-y-6">
          <div className="text-sm text-zinc-400 mb-8">
            <p>Effective Date: October 26, 2024</p>
            <p>Last Updated: October 26, 2024</p>
          </div>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">1. Agreement to Terms</h2>
            <p className="text-zinc-300">
              By accessing or using NMGToursJam ("we," "our," or "us"), including our website, mobile applications, and services (collectively, the "Services"), you agree to be bound by these Terms & Conditions ("Terms"). If you do not agree to these Terms, please do not use our Services.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">2. Services Description</h2>
            <p className="text-zinc-300">
              NMGToursJam provides an online platform that connects tourists with local tour guides and hosts for tours and cultural experiences ("Jams") in New Mexico. We facilitate bookings but are not the direct provider of tours or events unless specifically stated.
            </p>
            <div className="ml-4 space-y-2">
              <h3 className="font-semibold">Our Services include:</h3>
              <ul className="list-disc ml-6 space-y-1 text-zinc-300">
                <li>Tour and event discovery platform</li>
                <li>Booking and reservation system</li>
                <li>Payment processing</li>
                <li>Communication tools between guests and hosts</li>
                <li>Review and rating system</li>
              </ul>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">3. User Accounts</h2>
            <div className="space-y-3 text-zinc-300">
              <p><strong>3.1 Account Creation:</strong> To book tours or host experiences, you must create an account. You must be at least 18 years old to create an account.</p>
              <p><strong>3.2 Account Security:</strong> You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.</p>
              <p><strong>3.3 Accurate Information:</strong> You agree to provide accurate, current, and complete information during registration and to update such information to keep it accurate.</p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">4. Booking Terms</h2>
            <div className="space-y-3 text-zinc-300">
              <p><strong>4.1 Booking Process:</strong> When you book a tour or jam through our platform, you enter into a contract directly with the tour guide or host. NMGToursJam acts solely as an intermediary.</p>
              <p><strong>4.2 Pricing:</strong> All prices are displayed in USD and include applicable taxes unless otherwise stated. Prices are subject to change until booking is confirmed.</p>
              <p><strong>4.3 Payment:</strong> Payment is processed securely through our third-party payment provider. Full payment is required at the time of booking unless otherwise specified.</p>
              <p><strong>4.4 Confirmation:</strong> Upon successful booking, you will receive a confirmation email with booking details, meeting location, and contact information.</p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">5. Cancellation and Refund Policy</h2>
            <div className="space-y-3 text-zinc-300">
              <p><strong>5.1 Guest Cancellations:</strong></p>
              <ul className="list-disc ml-10 space-y-1">
                <li>48+ hours before tour: Full refund minus processing fees</li>
                <li>24-48 hours before tour: 50% refund</li>
                <li>Less than 24 hours: No refund</li>
              </ul>
              <p><strong>5.2 Host Cancellations:</strong> If a host cancels, guests receive a full refund and may be offered alternative tours.</p>
              <p><strong>5.3 Weather/Force Majeure:</strong> Tours cancelled due to severe weather or circumstances beyond control will be rescheduled or fully refunded.</p>
              <p><strong>5.4 No-shows:</strong> Guests who fail to appear at the designated time and location forfeit their payment.</p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">6. Guest Responsibilities</h2>
            <div className="space-y-3 text-zinc-300">
              <p>As a guest, you agree to:</p>
              <ul className="list-disc ml-6 space-y-1">
                <li>Arrive on time at the designated meeting location</li>
                <li>Follow all safety instructions provided by guides/hosts</li>
                <li>Respect local customs, cultures, and environments</li>
                <li>Inform hosts of any medical conditions or special requirements</li>
                <li>Maintain appropriate behavior and not disrupt the experience for others</li>
                <li>Respect photography restrictions at certain locations</li>
              </ul>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">7. Host Terms</h2>
            <div className="space-y-3 text-zinc-300">
              <p>If you list tours or jams on our platform, you additionally agree to:</p>
              <ul className="list-disc ml-6 space-y-1">
                <li>Provide accurate descriptions and images of your offerings</li>
                <li>Maintain all required licenses, permits, and insurance</li>
                <li>Deliver services as described in your listing</li>
                <li>Respond to bookings and inquiries promptly</li>
                <li>Comply with all applicable laws and regulations</li>
                <li>Maintain appropriate safety standards</li>
              </ul>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">8. Prohibited Activities</h2>
            <div className="space-y-3 text-zinc-300">
              <p>You may not:</p>
              <ul className="list-disc ml-6 space-y-1">
                <li>Use the Services for any illegal purpose or in violation of any laws</li>
                <li>Post false, misleading, or fraudulent content</li>
                <li>Harass, abuse, or harm other users</li>
                <li>Attempt to circumvent the booking system for direct transactions</li>
                <li>Use automated systems or software to extract data from the Services</li>
                <li>Interfere with or disrupt the Services or servers</li>
                <li>Impersonate any person or entity</li>
              </ul>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">9. Intellectual Property</h2>
            <div className="space-y-3 text-zinc-300">
              <p><strong>9.1 Our Content:</strong> All content on NMGToursJam, including text, graphics, logos, images, and software, is our property or that of our licensors and is protected by intellectual property laws.</p>
              <p><strong>9.2 User Content:</strong> By posting content on our platform, you grant us a non-exclusive, worldwide, royalty-free license to use, display, and distribute such content in connection with our Services.</p>
              <p><strong>9.3 Feedback:</strong> Any feedback or suggestions you provide may be used by us without any obligation to compensate you.</p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">10. Privacy</h2>
            <p className="text-zinc-300">
              Your use of our Services is also governed by our Privacy Policy, which describes how we collect, use, and protect your personal information. By using our Services, you consent to our data practices as described in the Privacy Policy.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">11. Disclaimers and Limitations of Liability</h2>
            <div className="space-y-3 text-zinc-300">
              <p><strong>11.1 Platform Role:</strong> NMGToursJam is a platform that facilitates connections between guests and tour providers. We are not responsible for the actions, omissions, or negligence of any tour guides, hosts, or guests.</p>
              <p><strong>11.2 No Warranties:</strong> The Services are provided "as is" without warranties of any kind, either express or implied.</p>
              <p><strong>11.3 Assumption of Risk:</strong> You acknowledge that travel and tourism activities involve inherent risks. You voluntarily assume all risks associated with participating in tours and jams.</p>
              <p><strong>11.4 Limitation of Liability:</strong> To the fullest extent permitted by law, NMGToursJam shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the Services.</p>
              <p><strong>11.5 Maximum Liability:</strong> Our total liability to you for any claims shall not exceed the amount you paid to us in the twelve months preceding the claim.</p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">12. Indemnification</h2>
            <p className="text-zinc-300">
              You agree to indemnify, defend, and hold harmless NMGToursJam, its officers, directors, employees, and agents from any claims, damages, losses, liabilities, and expenses (including attorney's fees) arising from your use of the Services, violation of these Terms, or violation of any rights of another.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">13. Dispute Resolution</h2>
            <div className="space-y-3 text-zinc-300">
              <p><strong>13.1 Informal Resolution:</strong> We encourage you to contact us first to resolve any disputes informally.</p>
              <p><strong>13.2 Arbitration:</strong> Any disputes that cannot be resolved informally shall be resolved through binding arbitration in accordance with the rules of the American Arbitration Association.</p>
              <p><strong>13.3 Exceptions:</strong> You may pursue claims in small claims court if they qualify. Either party may seek injunctive relief in court for intellectual property violations.</p>
              <p><strong>13.4 Class Action Waiver:</strong> You agree to resolve disputes only on an individual basis and waive any right to participate in class actions.</p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">14. General Terms</h2>
            <div className="space-y-3 text-zinc-300">
              <p><strong>14.1 Governing Law:</strong> These Terms are governed by the laws of New Mexico, USA, without regard to conflict of law principles.</p>
              <p><strong>14.2 Entire Agreement:</strong> These Terms constitute the entire agreement between you and NMGToursJam regarding the Services.</p>
              <p><strong>14.3 Modifications:</strong> We may modify these Terms at any time. Continued use of the Services after modifications constitutes acceptance of the updated Terms.</p>
              <p><strong>14.4 Severability:</strong> If any provision is found to be unenforceable, the remaining provisions shall continue in effect.</p>
              <p><strong>14.5 Assignment:</strong> You may not assign your rights under these Terms. We may assign our rights to any successor in interest.</p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">15. Contact Information</h2>
            <div className="space-y-2 text-zinc-300">
              <p>For questions about these Terms, please contact us at:</p>
              <div className="ml-4">
                <p><strong>NMGToursJam</strong></p>
                <p>Email: legal@nmgtoursjam.com</p>
                <p>Phone: 1-800-NMG-TOUR</p>
                <p>Address: 123 Plaza Street, Santa Fe, NM 87501</p>
              </div>
            </div>
          </section>

          <div className="mt-12 p-4 bg-emerald-900/30 border border-emerald-500/20 rounded-lg">
            <p className="text-sm text-zinc-400 text-center">
              By using NMGToursJam, you acknowledge that you have read, understood, and agree to be bound by these Terms & Conditions.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}