import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy | NMGToursJam',
  description: 'Privacy policy for NMGToursJam - How we collect, use, and protect your personal information.',
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
        
        <div className="bg-white shadow rounded-lg p-8 space-y-6">
          <div className="text-sm text-gray-600 mb-8">
            <p>Effective Date: October 26, 2024</p>
            <p>Last Updated: October 26, 2024</p>
          </div>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">1. Introduction</h2>
            <p className="text-gray-700">
              NMGToursJam we, our, or us respects your privacy and is committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and services.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">2. Information We Collect</h2>
            
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-800">2.1 Information You Provide</h3>
              <ul className="list-disc ml-6 space-y-1 text-gray-700">
                <li><strong>Account Information:</strong> Name, email address, phone number, password</li>
                <li><strong>Profile Information:</strong> Photo, bio, preferences, interests</li>
                <li><strong>Booking Information:</strong> Tour selections, dates, guest counts, special requirements</li>
                <li><strong>Payment Information:</strong> Billing address, payment method details (processed by our payment provider)</li>
                <li><strong>Communications:</strong> Messages with hosts, support inquiries, reviews</li>
                <li><strong>Identity Verification:</strong> Government ID (for hosts), age verification</li>
              </ul>
            </div>

            <div className="space-y-3 mt-4">
              <h3 className="text-lg font-semibold text-gray-800">2.2 Information Collected Automatically</h3>
              <ul className="list-disc ml-6 space-y-1 text-gray-700">
                <li><strong>Device Information:</strong> IP address, browser type, operating system</li>
                <li><strong>Usage Data:</strong> Pages visited, features used, search queries, booking history</li>
                <li><strong>Location Data:</strong> Approximate location based on IP address, precise location (with permission)</li>
                <li><strong>Cookies:</strong> Session cookies, preference cookies, analytics cookies</li>
              </ul>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">3. How We Use Your Information</h2>
            <div className="space-y-3 text-gray-700">
              <p>We use your information to:</p>
              <ul className="list-disc ml-6 space-y-1">
                <li>Process bookings and payments</li>
                <li>Communicate booking confirmations and updates</li>
                <li>Connect guests with tour guides and hosts</li>
                <li>Provide customer support</li>
                <li>Send marketing communications (with consent)</li>
                <li>Improve our services and develop new features</li>
                <li>Ensure platform safety and prevent fraud</li>
                <li>Comply with legal obligations</li>
                <li>Analyze usage patterns and trends</li>
                <li>Personalize your experience</li>
              </ul>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">4. Information Sharing and Disclosure</h2>
            <div className="space-y-3 text-gray-700">
              <p>We share your information with:</p>
              
              <p><strong>4.1 Tour Guides and Hosts:</strong> When you book, we share necessary information (name, contact details, special requirements) with the provider.</p>
              
              <p><strong>4.2 Service Providers:</strong> We work with third parties for:</p>
              <ul className="list-disc ml-10 space-y-1">
                <li>Payment processing (Stripe)</li>
                <li>Email delivery (SendGrid)</li>
                <li>Analytics (Google Analytics)</li>
                <li>Cloud storage (AWS)</li>
              </ul>
              
              <p><strong>4.3 Legal Requirements:</strong> We may disclose information to comply with legal obligations, court orders, or government requests.</p>
              
              <p><strong>4.4 Business Transfers:</strong> In case of merger, acquisition, or sale, your information may be transferred to the new entity.</p>
              
              <p><strong>4.5 Consent:</strong> With your explicit consent for purposes not covered in this policy.</p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">5. Data Security</h2>
            <div className="space-y-3 text-gray-700">
              <p>We implement appropriate security measures including:</p>
              <ul className="list-disc ml-6 space-y-1">
                <li>Encryption of sensitive data in transit and at rest</li>
                <li>Regular security assessments and updates</li>
                <li>Limited access to personal information</li>
                <li>Secure data centers with physical security controls</li>
                <li>Regular security training for employees</li>
              </ul>
              <p className="mt-3">However, no method of transmission over the internet is 100% secure. We cannot guarantee absolute security of your information.</p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">6. Your Rights and Choices</h2>
            <div className="space-y-3 text-gray-700">
              <p>You have the right to:</p>
              <ul className="list-disc ml-6 space-y-1">
                <li><strong>Access:</strong> Request a copy of your personal information</li>
                <li><strong>Correction:</strong> Update or correct inaccurate information</li>
                <li><strong>Deletion:</strong> Request deletion of your account and associated data</li>
                <li><strong>Portability:</strong> Receive your data in a portable format</li>
                <li><strong>Opt-out:</strong> Unsubscribe from marketing communications</li>
                <li><strong>Restriction:</strong> Limit how we use your information</li>
              </ul>
              <p className="mt-3">To exercise these rights, contact us at privacy@nmgtoursjam.com</p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">7. Cookies and Tracking Technologies</h2>
            <div className="space-y-3 text-gray-700">
              <p>We use cookies and similar technologies to:</p>
              <ul className="list-disc ml-6 space-y-1">
                <li>Keep you logged in</li>
                <li>Remember your preferences</li>
                <li>Analyze site usage</li>
                <li>Personalize content</li>
                <li>Provide targeted advertising</li>
              </ul>
              <p className="mt-3">You can control cookies through your browser settings. Disabling cookies may limit functionality.</p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">8. Third-Party Links</h2>
            <p className="text-gray-700">
              Our Services may contain links to third-party websites. We are not responsible for the privacy practices of these external sites. We encourage you to review their privacy policies.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">9. Children Privacy</h2>
            <p className="text-gray-700">
              Our Services are not intended for children under 18. We do not knowingly collect personal information from children. If we learn we have collected information from a child under 18, we will delete it promptly.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">10. Data Retention</h2>
            <p className="text-gray-700">
              We retain your information as long as necessary to provide our services and comply with legal obligations. When you delete your account, we delete or anonymize your personal information, except where retention is required by law.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">11. International Data Transfers</h2>
            <p className="text-gray-700">
              Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place for international transfers in compliance with applicable laws.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">12. California Privacy Rights</h2>
            <p className="text-gray-700">
              California residents have additional rights under the California Consumer Privacy Act (CCPA), including the right to know what personal information we collect, the right to delete personal information, and the right to opt-out of the sale of personal information. We do not sell personal information.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">13. Changes to This Policy</h2>
            <p className="text-gray-700">
              We may update this Privacy Policy from time to time. We will notify you of material changes by posting the new policy on this page and updating the Last Updated date. Your continued use of our Services after changes constitutes acceptance of the updated policy.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">14. Contact Us</h2>
            <div className="space-y-2 text-gray-700">
              <p>For privacy-related questions or concerns, contact us at:</p>
              <div className="ml-4">
                <p><strong>NMGToursJam Privacy Team</strong></p>
                <p>Email: privacy@nmgtoursjam.com</p>
                <p>Phone: 1-800-NMG-TOUR</p>
                <p>Address: 123 Plaza Street, Santa Fe, NM 87501</p>
              </div>
              <p className="mt-4">For data protection inquiries in the EU, contact our Data Protection Officer at dpo@nmgtoursjam.com</p>
            </div>
          </section>

          <div className="mt-12 p-4 bg-gray-100 rounded-lg">
            <p className="text-sm text-gray-600 text-center">
              This Privacy Policy is part of our Terms & Conditions. By using NMGToursJam, you consent to the data practices described in this policy.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}