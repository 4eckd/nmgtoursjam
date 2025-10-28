import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cookie Policy | NMGToursJam',
  description: 'Learn about how NMGToursJam uses cookies and similar technologies.',
}

export default function CookiesPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Cookie Policy</h1>
      
      <div className="bg-white shadow rounded-lg p-8 space-y-6">
        <p className="text-sm text-gray-600 mb-6">Last Updated: October 26, 2024</p>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">What Are Cookies?</h2>
          <p className="text-gray-700">
            Cookies are small text files stored on your device when you visit our website. 
            They help us provide a better user experience by remembering your preferences 
            and understanding how you use our services.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Types of Cookies We Use</h2>
          
          <div className="space-y-3">
            <div>
              <h3 className="font-semibold text-lg">Essential Cookies</h3>
              <p className="text-gray-700">Required for the website to function properly.</p>
              <ul className="list-disc ml-6 mt-2 text-gray-600">
                <li>Session management</li>
                <li>Security tokens</li>
                <li>Load balancing</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-lg">Functional Cookies</h3>
              <p className="text-gray-700">Enhance your experience by remembering your choices.</p>
              <ul className="list-disc ml-6 mt-2 text-gray-600">
                <li>Language preferences</li>
                <li>Login information</li>
                <li>Accessibility settings</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-lg">Analytics Cookies</h3>
              <p className="text-gray-700">Help us understand how visitors use our website.</p>
              <ul className="list-disc ml-6 mt-2 text-gray-600">
                <li>Google Analytics</li>
                <li>Page view tracking</li>
                <li>User journey analysis</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-lg">Marketing Cookies</h3>
              <p className="text-gray-700">Used to show relevant advertisements.</p>
              <ul className="list-disc ml-6 mt-2 text-gray-600">
                <li>Retargeting pixels</li>
                <li>Social media cookies</li>
                <li>Ad performance tracking</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Managing Cookies</h2>
          <p className="text-gray-700">
            You can control cookies through your browser settings. Note that disabling 
            certain cookies may impact the functionality of our website.
          </p>
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold mb-2">Browser Cookie Settings:</p>
            <ul className="space-y-1 text-sm text-gray-600">
              <li>• Chrome: Settings → Privacy and security → Cookies</li>
              <li>• Firefox: Settings → Privacy & Security → Cookies</li>
              <li>• Safari: Preferences → Privacy → Cookies</li>
              <li>• Edge: Settings → Privacy, search, and services → Cookies</li>
            </ul>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Contact Us</h2>
          <p className="text-gray-700">
            If you have questions about our use of cookies, please contact us at{' '}
            <a href="mailto:privacy@nmgtoursjam.com" className="text-blue-600 hover:underline">
              privacy@nmgtoursjam.com
            </a>
          </p>
        </section>
      </div>
    </div>
  )
}