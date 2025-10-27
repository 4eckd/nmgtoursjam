import Link from 'next/link'

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Legal Pages Navigation */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <nav className="flex space-x-6 text-sm">
            <Link 
              href="/terms" 
              className="text-gray-600 hover:text-gray-900"
            >
              Terms & Conditions
            </Link>
            <Link 
              href="/privacy" 
              className="text-gray-600 hover:text-gray-900"
            >
              Privacy Policy
            </Link>
            <Link 
              href="/cookies" 
              className="text-gray-600 hover:text-gray-900"
            >
              Cookie Policy
            </Link>
            <Link 
              href="/safety" 
              className="text-gray-600 hover:text-gray-900"
            >
              Safety Guidelines
            </Link>
          </nav>
        </div>
      </div>
      
      {/* Page Content */}
      {children}
      </div>
      )
    }
    