// Static tour data for development/fallback
// This will be replaced with database queries once DB is connected

export interface Tour {
  id: string
  title: string
  slug: string
  description: string
  shortDesc: string
  price: number
  currency: string
  duration: number
  maxGroupSize: number
  difficulty: 'EASY' | 'MODERATE' | 'CHALLENGING' | 'EXTREME'
  city: string
  meetingPoint: string
  coverImage: string
  category: {
    id: string
    name: string
    slug: string
  }
  featured: boolean
  included: string[]
  notIncluded: string[]
  highlights: string[]
  whatToBring: string[]
  rating: number
  reviewCount: number
  images: {
    id: string
    url: string
    alt: string | null
    caption: string | null
    order: number
  }[]
}

export const staticTours: Tour[] = [
  {
    id: '1',
    title: 'Martha Brae Rafting',
    slug: 'martha-brae-rafting',
    description: 'Experience the tranquil beauty of the Martha Brae River on a traditional bamboo raft. Your expert guide will pole you down the 3-mile river while sharing fascinating stories about Jamaican culture and local wildlife. This peaceful journey through lush tropical scenery is perfect for couples, families, and anyone seeking a relaxing escape into nature.',
    shortDesc: 'Glide down the Martha Brae River on a traditional bamboo raft with an expert local guide',
    price: 85,
    currency: 'USD',
    duration: 3,
    maxGroupSize: 2,
    difficulty: 'EASY',
    city: 'Ocho Rios',
    meetingPoint: 'Martha Brae Rafters Village, Rafters Avenue, Falmouth',
    coverImage: '/tours/martha-brae.jpg',
    category: {
      id: 'water',
      name: 'Water Activities',
      slug: 'water-activities',
    },
    featured: true,
    included: [
      'Traditional bamboo raft experience',
      'Expert local guide',
      'Welcome drink (coconut water)',
      'Round-trip transportation',
      'All safety equipment',
      'Souvenir photos available',
    ],
    notIncluded: [
      'Lunch and additional beverages',
      'Gratuities (optional)',
      'Hotel pickup (available on request)',
    ],
    highlights: [
      'Relax on a 30-foot bamboo raft',
      'Learn about Jamaican culture and history',
      'Spot tropical birds and wildlife',
      'Visit the historic Rafters Village',
      'Perfect for couples and families',
    ],
    whatToBring: [
      'Sunscreen',
      'Water shoes',
      'Towel',
      'Camera',
      'Change of clothes',
      'Hat and sunglasses',
    ],
    rating: 4.9,
    reviewCount: 127,
    images: [],
  },
  {
    id: '2',
    title: "Dunn's River Falls Adventure",
    slug: 'dunns-river-falls',
    description: "Climb the iconic 600-foot terraced waterfall with an experienced guide. Cool off in natural pools and enjoy stunning tropical scenery. This exhilarating adventure is one of Jamaica's most famous attractions and a must-do for any visitor to the island.",
    shortDesc: "Climb Jamaica's famous 600-foot waterfall with expert guides",
    price: 95,
    currency: 'USD',
    duration: 4,
    maxGroupSize: 15,
    difficulty: 'MODERATE',
    city: 'Ocho Rios',
    meetingPoint: "Dunn's River Falls Park, Ocho Rios",
    coverImage: '/tours/dunns-river.jpg',
    category: {
      id: 'adventure',
      name: 'Adventure',
      slug: 'adventure',
    },
    featured: true,
    included: [
      'Entrance fees',
      'Professional guide',
      'Water shoes rental',
      'Changing facilities',
      'Safety briefing',
    ],
    notIncluded: [
      'Photos and videos',
      'Food and drinks',
      'Transportation',
    ],
    highlights: [
      'Climb iconic terraced waterfall',
      'Swim in natural pools',
      'Professional photography available',
      'Beautiful tropical gardens',
      'Beach access included',
    ],
    whatToBring: [
      'Swimsuit',
      'Towel',
      'Waterproof camera',
      'Sunscreen',
      'Change of clothes',
    ],
    rating: 4.8,
    reviewCount: 234,
    images: [],
  },
  {
    id: '3',
    title: 'Blue Hole Adventure',
    slug: 'blue-hole-adventure',
    description: 'Discover the secret Blue Hole, a hidden gem in the Jamaican jungle. Jump from cliffs, swing from ropes, and swim in crystal-clear turquoise waters. This off-the-beaten-path adventure is perfect for thrill-seekers looking for an authentic Jamaican experience.',
    shortDesc: 'Jump, swim, and explore the secret Blue Hole in the jungle',
    price: 110,
    currency: 'USD',
    duration: 5,
    maxGroupSize: 12,
    difficulty: 'CHALLENGING',
    city: 'Ocho Rios',
    meetingPoint: 'Blue Hole Mineral Spring, Ocho Rios',
    coverImage: '/tours/blue-hole.jpg',
    category: {
      id: 'adventure',
      name: 'Adventure',
      slug: 'adventure',
    },
    featured: true,
    included: [
      'Experienced guide',
      'Safety equipment',
      'Cliff jumping opportunities',
      'Rope swings',
      'Natural water slides',
    ],
    notIncluded: [
      'Food and drinks',
      'Transportation',
      'Photos',
    ],
    highlights: [
      'Jump from cliffs up to 25 feet',
      'Swing on rope into crystal waters',
      'Explore hidden caves',
      'Natural water slides',
      'Small groups for personalized experience',
    ],
    whatToBring: [
      'Swimsuit',
      'Water shoes',
      'Towel',
      'Waterproof camera',
      'Dry clothes',
    ],
    rating: 5.0,
    reviewCount: 89,
    images: [],
  },
  {
    id: '4',
    title: 'Negril Sunset Cruise',
    slug: 'negril-sunset-cruise',
    description: 'Sail along the stunning Negril coastline as the sun sets over the Caribbean Sea. Enjoy refreshing drinks, local music, and the chance to cliff dive at Rick\'s Cafe. This romantic cruise is the perfect way to end your day in Jamaica.',
    shortDesc: 'Sail into the sunset with drinks, music, and cliff diving',
    price: 75,
    currency: 'USD',
    duration: 3,
    maxGroupSize: 30,
    difficulty: 'EASY',
    city: 'Negril',
    meetingPoint: 'Negril Harbour, West End Road',
    coverImage: '/tours/negril-sunset.jpg',
    category: {
      id: 'water',
      name: 'Water Activities',
      slug: 'water-activities',
    },
    featured: false,
    included: [
      'Catamaran cruise',
      'Unlimited drinks',
      'Music and entertainment',
      'Snorkeling equipment',
      'Safety equipment',
    ],
    notIncluded: [
      'Food',
      'Transportation to harbor',
      'Photos',
    ],
    highlights: [
      'Watch stunning Caribbean sunset',
      'Open bar with rum punch',
      'Stop at Rick\'s Cafe',
      'Snorkeling opportunities',
      'Live reggae music',
    ],
    whatToBring: [
      'Swimsuit',
      'Towel',
      'Camera',
      'Sunscreen',
      'Light jacket for evening',
    ],
    rating: 4.7,
    reviewCount: 156,
    images: [],
  },
  {
    id: '5',
    title: 'Bob Marley Museum Tour',
    slug: 'bob-marley-museum',
    description: 'Visit the former home of reggae legend Bob Marley, now a museum dedicated to his life and legacy. Explore the recording studio, see personal artifacts, and learn about the cultural impact of this iconic musician.',
    shortDesc: 'Explore the home and legacy of reggae legend Bob Marley',
    price: 60,
    currency: 'USD',
    duration: 2,
    maxGroupSize: 20,
    difficulty: 'EASY',
    city: 'Kingston',
    meetingPoint: 'Bob Marley Museum, 56 Hope Road, Kingston',
    coverImage: '/tours/bob-marley.jpg',
    category: {
      id: 'cultural',
      name: 'Cultural Tours',
      slug: 'cultural-tours',
    },
    featured: false,
    included: [
      'Museum entrance fee',
      'Guided tour',
      'Access to recording studio',
      'Gift shop discount',
    ],
    notIncluded: [
      'Transportation',
      'Food and drinks',
      'Merchandise',
    ],
    highlights: [
      'See Bob Marley\'s personal artifacts',
      'Visit the recording studio',
      'Learn about reggae history',
      'Photo opportunities',
      'Museum gift shop',
    ],
    whatToBring: [
      'Camera',
      'Comfortable walking shoes',
      'Water bottle',
    ],
    rating: 4.9,
    reviewCount: 203,
    images: [],
  },
  {
    id: '6',
    title: 'River Tubing Adventure',
    slug: 'river-tubing',
    description: 'Float down the pristine Rio Bueno on an inflatable tube, navigating gentle rapids and enjoying the lush tropical scenery. This fun-filled adventure is perfect for all ages and skill levels.',
    shortDesc: 'Float down scenic river rapids on inflatable tubes',
    price: 70,
    currency: 'USD',
    duration: 3,
    maxGroupSize: 16,
    difficulty: 'MODERATE',
    city: 'Montego Bay',
    meetingPoint: 'Rio Bueno Adventure Park, Trelawny',
    coverImage: '/tours/river-tubing.jpg',
    category: {
      id: 'water',
      name: 'Water Activities',
      slug: 'water-activities',
    },
    featured: false,
    included: [
      'Inflatable tube',
      'Safety helmet',
      'Life jacket',
      'Guide',
      'Light refreshments',
    ],
    notIncluded: [
      'Transportation',
      'Lunch',
      'Photos',
    ],
    highlights: [
      'Navigate gentle river rapids',
      'Scenic jungle views',
      'Safe for all ages',
      'Cool mountain water',
      'Fun for families',
    ],
    whatToBring: [
      'Swimsuit',
      'Water shoes',
      'Towel',
      'Sunscreen',
      'Waterproof camera',
    ],
    rating: 4.6,
    reviewCount: 98,
    images: [],
  },
]

export function getTourBySlug(slug: string): Tour | undefined {
  return staticTours.find((tour) => tour.slug === slug)
}

export function getFeaturedTours(): Tour[] {
  return staticTours.filter((tour) => tour.featured)
}
