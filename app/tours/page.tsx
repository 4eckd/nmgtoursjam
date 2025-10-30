import ToursClient from '@/app/components/tours/ToursClient'

interface Tour {
  id: string
  title: string
  slug: string
  description: string
  shortDesc: string
  price: number
  currency: string
  duration: number
  maxGroupSize: number
  difficulty: string
  city: string
  coverImage: string
  category: {
    id: string
    name: string
    slug: string
  }
  featured: boolean
  createdAt: string
  _count: {
    reviews: number
  }
}

interface Category {
  id: string
  name: string
  slug: string
}

async function getTours(): Promise<Tour[]> {
  try {
    // In production, use absolute URL with environment variable
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
    const res = await fetch(`${baseUrl}/api/tours`, {
      cache: 'no-store', // Always fetch fresh data for tours
    })

    if (!res.ok) {
      console.error('Failed to fetch tours:', res.status)
      return []
    }

    const data = await res.json()
    return data.tours || []
  } catch (error) {
    console.error('Error fetching tours:', error)
    return []
  }
}

async function getCategories(): Promise<Category[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
    const res = await fetch(`${baseUrl}/api/categories`, {
      cache: 'force-cache', // Categories change infrequently
    })

    if (!res.ok) {
      console.error('Failed to fetch categories:', res.status)
      return []
    }

    const data = await res.json()
    return data.categories || []
  } catch (error) {
    console.error('Error fetching categories:', error)
    return []
  }
}

export default async function ToursPage() {
  const [tours, categories] = await Promise.all([getTours(), getCategories()])

  return (
    <div>
      {/* Hero Section */}
      <section className="h-[40vh] flex items-center justify-center">
        <div className="text-center px-6">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 font-caveat text-white">
            Discover Jamaica
          </h1>
          <p className="text-xl text-zinc-200">
            Authentic island experiences and unforgettable adventures
          </p>
        </div>
      </section>

      {/* Tours Listing Section */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        {tours.length > 0 ? (
          <ToursClient initialTours={tours} categories={categories} />
        ) : (
          <div className="text-center py-16">
            <div className="bg-black/40 backdrop-blur-md rounded-lg border border-white/10 p-12 max-w-md mx-auto">
              <h3 className="text-2xl font-bold text-white mb-4">
                No Tours Available
              </h3>
              <p className="text-zinc-400 mb-6">
                We're currently updating our tour offerings. Please check back
                soon!
              </p>
              <p className="text-sm text-zinc-500">
                Make sure the database has been seeded with tour data.
              </p>
            </div>
          </div>
        )}
      </section>
    </div>
  )
}
