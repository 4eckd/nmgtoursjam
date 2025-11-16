import { PrismaClient, Role, Difficulty } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌴 Starting seed for NMG Tours Jamaica...')

  // Clean existing data (in development only)
  await prisma.review.deleteMany()
  await prisma.booking.deleteMany()
  await prisma.availability.deleteMany()
  await prisma.image.deleteMany()
  await prisma.tour.deleteMany()
  await prisma.category.deleteMany()
  await prisma.account.deleteMany()
  await prisma.session.deleteMany()
  await prisma.user.deleteMany()

  console.log('✅ Cleaned existing data')

  // ============================================
  // 1. Create Test Users
  // ============================================
  const hashedPassword = await hash('Password123!', 12)

  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@nmgtours.com',
      name: 'Admin User',
      hashedPassword,
      role: Role.ADMIN,
      phone: '+1-876-555-0001',
      emailVerified: new Date(),
    },
  })

  const guideUser = await prisma.user.create({
    data: {
      email: 'guide@nmgtours.com',
      name: 'Marcus Thompson',
      hashedPassword,
      role: Role.GUIDE,
      phone: '+1-876-555-0002',
      emailVerified: new Date(),
    },
  })

  const testUser = await prisma.user.create({
    data: {
      email: 'user@example.com',
      name: 'Sarah Johnson',
      hashedPassword,
      role: Role.USER,
      phone: '+1-876-555-0003',
      emailVerified: new Date(),
    },
  })

  console.log('✅ Created 3 test users (admin, guide, user)')

  // ============================================
  // 2. Create Tour Categories
  // ============================================
  const raftingCategory = await prisma.category.create({
    data: {
      name: 'Rafting Tours',
      slug: 'rafting',
      description: 'Experience the thrill of bamboo rafting on Jamaica\'s pristine rivers',
      icon: '🚣',
    },
  })

  const culturalCategory = await prisma.category.create({
    data: {
      name: 'Cultural Experiences',
      slug: 'cultural',
      description: 'Immerse yourself in authentic Jamaican culture and heritage',
      icon: '🎭',
    },
  })

  const beachCategory = await prisma.category.create({
    data: {
      name: 'Beach & Water',
      slug: 'beach',
      description: 'Explore Jamaica\'s stunning beaches and crystal-clear waters',
      icon: '🏖️',
    },
  })

  const adventureCategory = await prisma.category.create({
    data: {
      name: 'Adventure Tours',
      slug: 'adventure',
      description: 'Thrilling outdoor adventures through Jamaica\'s natural wonders',
      icon: '⛰️',
    },
  })

  const foodCategory = await prisma.category.create({
    data: {
      name: 'Food & Drink',
      slug: 'food-drink',
      description: 'Taste authentic Jamaican cuisine and locally crafted spirits',
      icon: '🍽️',
    },
  })

  console.log('✅ Created 5 tour categories')

  // ============================================
  // 3. Create Tours with Images
  // ============================================

  // Tour 1: Rio Grande Bamboo Rafting
  const rioGrandeTour = await prisma.tour.create({
    data: {
      title: 'Rio Grande Bamboo Rafting Experience',
      slug: 'rio-grande-bamboo-rafting',
      description: 'Glide down the legendary Rio Grande on a handcrafted 30-foot bamboo raft, guided by an expert local captain. This iconic Jamaican experience takes you through lush tropical landscapes, past limestone cliffs, and into the heart of Portland\'s natural beauty. Your captain will share stories of the river\'s history while you relax and soak in the serene atmosphere. The gentle 2-hour journey is perfect for couples, families, and anyone seeking an authentic taste of Jamaica.',
      shortDesc: 'Romantic bamboo raft journey down the historic Rio Grande River',
      price: 85.00,
      duration: 2,
      maxGroupSize: 2,
      difficulty: Difficulty.EASY,
      meetingPoint: 'Berridale, Port Antonio, Portland',
      city: 'Port Antonio',
      coordinates: { lat: 18.1497, lng: -76.4503 },
      coverImage: '/images/tours/rio-grande-rafting.jpg',
      included: [
        'Expert bamboo raft captain',
        'Life jackets',
        'Return transportation from meeting point',
        'Fresh coconut water',
        'Photo opportunities',
      ],
      notIncluded: [
        'Lunch',
        'Gratuities',
        'Hotel pickup (available for additional fee)',
      ],
      highlights: [
        'Glide on a traditional 30-foot bamboo raft',
        'Learn about Jamaican river culture',
        'See tropical birds and river wildlife',
        'Swim in crystal-clear river pools',
        'Enjoy stunning mountain views',
      ],
      whatToBring: [
        'Swimwear and towel',
        'Waterproof camera',
        'Sunscreen and hat',
        'Water shoes (optional)',
        'Cash for souvenirs',
      ],
      categoryId: raftingCategory.id,
      featured: true,
      metaTitle: 'Rio Grande Bamboo Rafting - Authentic Jamaica Experience',
      metaDescription: 'Experience the romance of bamboo rafting on the legendary Rio Grande River in Port Antonio. Guided tours with local experts.',
      images: {
        create: [
          {
            url: '/images/tours/rio-grande-1.jpg',
            alt: 'Bamboo raft on Rio Grande River',
            caption: 'Traditional bamboo rafting experience',
            order: 1,
          },
          {
            url: '/images/tours/rio-grande-2.jpg',
            alt: 'River captain guiding raft',
            caption: 'Expert local river captains',
            order: 2,
          },
          {
            url: '/images/tours/rio-grande-3.jpg',
            alt: 'Lush tropical scenery',
            caption: 'Stunning Portland landscapes',
            order: 3,
          },
        ],
      },
    },
  })

  // Tour 2: Martha Brae River Rafting
  const marthaBraeTour = await prisma.tour.create({
    data: {
      title: 'Martha Brae River Rafting Adventure',
      slug: 'martha-brae-river-rafting',
      description: 'Escape to the tranquil waters of the Martha Brae River for a peaceful bamboo rafting journey through Jamaica\'s countryside. Your skilled raft captain will navigate the gentle 3-mile stretch while sharing local legends and pointing out exotic birds and tropical flora. The experience includes access to the beautiful Rafters Village, where you can explore gardens, grab a bite, or browse authentic Jamaican crafts. This is one of Jamaica\'s most beloved attractions, offering a perfect blend of relaxation and natural beauty.',
      shortDesc: 'Peaceful 3-mile bamboo raft journey through tropical paradise',
      price: 75.00,
      duration: 2,
      maxGroupSize: 2,
      difficulty: Difficulty.EASY,
      meetingPoint: 'Rafters Village, Martha Brae, Trelawny',
      city: 'Montego Bay',
      coordinates: { lat: 18.4762, lng: -77.6647 },
      coverImage: '/images/tours/martha-brae-rafting.jpg',
      included: [
        'Bamboo raft and captain',
        'Life jackets',
        'Access to Rafters Village',
        'Garden tour',
        'Souvenir photo',
      ],
      notIncluded: ['Food and drinks', 'Gratuities', 'Transportation'],
      highlights: [
        'Glide through 3 miles of pristine river',
        'Visit the historic Rafters Village',
        'Spot exotic tropical birds',
        'Learn Jamaican folklore and legends',
        'Relax in natural river pools',
      ],
      whatToBring: [
        'Swimsuit and change of clothes',
        'Waterproof bag',
        'Sunscreen',
        'Camera',
        'Cash for food and souvenirs',
      ],
      categoryId: raftingCategory.id,
      featured: true,
      metaTitle: 'Martha Brae River Rafting - Montego Bay Jamaica Tours',
      metaDescription: 'Enjoy a serene bamboo rafting adventure on the Martha Brae River near Montego Bay. Book your authentic Jamaican experience today.',
    },
  })

  // Tour 3: Bob Marley Museum & Nine Mile
  const bobMarleyTour = await prisma.tour.create({
    data: {
      title: 'Bob Marley Nine Mile Pilgrimage',
      slug: 'bob-marley-nine-mile-tour',
      description: 'Journey to the birthplace and final resting place of reggae legend Bob Marley in the rural village of Nine Mile. This cultural pilgrimage takes you through the hills of St. Ann, where you\'ll visit Bob\'s childhood home, see the rock where he rested his head for meditation, and pay respects at his mausoleum. Your Rastafarian guide will share intimate stories about Bob\'s life, his music, and his enduring impact on Jamaican culture. The tour includes a traditional Ital lunch and time to explore the village where it all began.',
      shortDesc: 'Visit Bob Marley\'s birthplace and mausoleum in Nine Mile',
      price: 95.00,
      duration: 6,
      maxGroupSize: 15,
      difficulty: Difficulty.EASY,
      meetingPoint: 'Bob Marley Museum, Nine Mile, St. Ann',
      city: 'Ocho Rios',
      coordinates: { lat: 18.4185, lng: -77.3947 },
      coverImage: '/images/tours/bob-marley-nine-mile.jpg',
      included: [
        'Round-trip transportation',
        'Museum entrance fee',
        'Rastafarian guide',
        'Ital lunch (vegetarian)',
        'Mausoleum visit',
      ],
      notIncluded: ['Souvenirs', 'Additional food/drinks', 'Gratuities'],
      highlights: [
        'See Bob Marley\'s birthplace and childhood home',
        'Visit the meditation rock',
        'Pay respects at the mausoleum',
        'Enjoy authentic Ital cuisine',
        'Learn about Rastafarian culture',
      ],
      whatToBring: [
        'Comfortable walking shoes',
        'Camera',
        'Respectful attire (shoulders/knees covered)',
        'Cash for souvenirs',
        'Water bottle',
      ],
      categoryId: culturalCategory.id,
      featured: true,
      metaTitle: 'Bob Marley Nine Mile Tour - Jamaica Cultural Experience',
      metaDescription: 'Visit Bob Marley\'s birthplace and mausoleum in Nine Mile. Authentic Rastafarian-guided cultural tour with lunch included.',
    },
  })

  // Tour 4: Dunn's River Falls Climbing
  const dunnsRiverTour = await prisma.tour.create({
    data: {
      title: 'Dunn\'s River Falls Climbing Adventure',
      slug: 'dunns-river-falls-climbing',
      description: 'Climb Jamaica\'s most famous waterfall in this exhilarating adventure! Dunn\'s River Falls cascades 600 feet directly into the Caribbean Sea, creating a natural staircase of limestone rocks. Join hands with fellow adventurers as you climb the terraced falls, guided by experienced professionals. The journey takes about 90 minutes and includes plenty of photo stops. After your climb, relax on the beach, explore the craft market, or enjoy the on-site amenities. This is a must-do Jamaican experience that combines natural beauty with exciting adventure.',
      shortDesc: 'Climb the iconic 600-foot terraced waterfall into the Caribbean',
      price: 65.00,
      duration: 3,
      maxGroupSize: 20,
      difficulty: Difficulty.MODERATE,
      meetingPoint: 'Dunn\'s River Falls Park, Ocho Rios',
      city: 'Ocho Rios',
      coordinates: { lat: 18.4048, lng: -77.1382 },
      coverImage: '/images/tours/dunns-river-falls.jpg',
      included: [
        'Park entrance fee',
        'Professional climbing guide',
        'Life jacket (if needed)',
        'Beach access',
        'Changing facilities and lockers',
      ],
      notIncluded: [
        'Water shoes rental ($10)',
        'Locker rental ($5)',
        'Photo packages',
        'Food and drinks',
      ],
      highlights: [
        'Climb the 600-foot waterfall',
        'Swim in natural pools',
        'Enjoy panoramic Caribbean views',
        'Relax on the beach',
        'Shop for local crafts',
      ],
      whatToBring: [
        'Swimwear',
        'Water shoes (or rent on-site)',
        'Waterproof camera',
        'Towel and dry clothes',
        'Sunscreen',
      ],
      categoryId: adventureCategory.id,
      featured: true,
      metaTitle: 'Dunn\'s River Falls Climbing Tour - Ocho Rios Jamaica',
      metaDescription: 'Climb the famous Dunn\'s River Falls in Ocho Rios. Guided waterfall climbing adventure with beach access included.',
    },
  })

  // Tour 5: Seven Mile Beach Negril Sunset
  const sevenMileBeachTour = await prisma.tour.create({
    data: {
      title: 'Seven Mile Beach Sunset Experience',
      slug: 'seven-mile-beach-negril-sunset',
      description: 'Spend a perfect day on Jamaica\'s most iconic beach. Seven Mile Beach in Negril is renowned for its powdery white sand, crystal-clear turquoise water, and spectacular sunsets. This beach experience includes a reserved spot with umbrellas and loungers, complimentary beach activities, and a sunset cocktail at the legendary Rick\'s Café. Watch cliff divers perform daring jumps, take a leap yourself if you dare, or simply relax with a Red Stripe while the sun paints the sky in brilliant oranges and pinks.',
      shortDesc: 'White sand paradise with world-famous Negril sunset',
      price: 55.00,
      duration: 8,
      maxGroupSize: 30,
      difficulty: Difficulty.EASY,
      meetingPoint: 'Seven Mile Beach, Negril',
      city: 'Negril',
      coordinates: { lat: 18.3006, lng: -78.3426 },
      coverImage: '/images/tours/seven-mile-beach.jpg',
      included: [
        'Beach loungers and umbrellas',
        'Snorkeling gear',
        'Beach volleyball',
        'Sunset cocktail at Rick\'s Café',
        'Transportation to/from beach',
      ],
      notIncluded: [
        'Lunch',
        'Additional drinks',
        'Water sports rentals',
        'Cliff diving photos',
      ],
      highlights: [
        'Relax on world-famous Seven Mile Beach',
        'Crystal-clear Caribbean swimming',
        'Snorkeling in coral reefs',
        'Sunset at Rick\'s Café',
        'Watch or try cliff diving',
      ],
      whatToBring: [
        'Swimsuit and beach cover-up',
        'Sunscreen (reef-safe)',
        'Sunglasses and hat',
        'Cash for food/drinks',
        'GoPro or waterproof camera',
      ],
      categoryId: beachCategory.id,
      featured: false,
      metaTitle: 'Seven Mile Beach Negril - Sunset Beach Experience',
      metaDescription: 'Experience Jamaica\'s famous Seven Mile Beach in Negril with sunset at Rick\'s Café. Beach loungers, snorkeling, and cliff diving included.',
    },
  })

  // Tour 6: Kingston Food & Culture Walking Tour
  const kingstonFoodTour = await prisma.tour.create({
    data: {
      title: 'Kingston Food & Culture Walking Tour',
      slug: 'kingston-food-culture-tour',
      description: 'Discover the authentic flavors of Kingston on this culinary adventure through Jamaica\'s vibrant capital. Your local foodie guide will take you to hidden gems and local favorites, sampling everything from jerk chicken and patties to fresh fruit and traditional sweets. Along the way, learn about Kingston\'s rich history, see historic landmarks, and experience the energy of downtown markets. This tour offers an insider\'s perspective on Jamaican cuisine and culture, with 8-10 food tastings that add up to a full meal.',
      shortDesc: 'Taste authentic Jamaican cuisine while exploring historic Kingston',
      price: 70.00,
      duration: 4,
      maxGroupSize: 12,
      difficulty: Difficulty.EASY,
      meetingPoint: 'Devon House, Kingston',
      city: 'Kingston',
      coordinates: { lat: 18.0179, lng: -76.7905 },
      coverImage: '/images/tours/kingston-food-tour.jpg',
      included: [
        '8-10 food tastings (full meal equivalent)',
        'Local guide and foodie expert',
        'Water and soft drinks',
        'Market tour',
        'Historic site visits',
      ],
      notIncluded: [
        'Additional food purchases',
        'Alcoholic beverages',
        'Gratuities',
        'Transportation to meeting point',
      ],
      highlights: [
        'Sample authentic jerk chicken',
        'Try traditional Jamaican patties',
        'Taste fresh tropical fruits',
        'Visit historic Devon House',
        'Explore local markets',
      ],
      whatToBring: [
        'Comfortable walking shoes',
        'Appetite!',
        'Camera',
        'Cash for additional purchases',
        'Light clothing (it gets hot)',
      ],
      categoryId: foodCategory.id,
      featured: false,
      metaTitle: 'Kingston Food Tour - Authentic Jamaican Cuisine Experience',
      metaDescription: 'Taste the real Jamaica on this Kingston food walking tour. 8-10 tastings including jerk chicken, patties, and local favorites.',
    },
  })

  // Tour 7: Blue Mountain Coffee Tour
  const blueMountainTour = await prisma.tour.create({
    data: {
      title: 'Blue Mountain Coffee Plantation Tour',
      slug: 'blue-mountain-coffee-tour',
      description: 'Journey into the misty Blue Mountains to visit a working coffee plantation producing the world\'s most exclusive coffee. Learn the complete process from cherry to cup, walk through terraced hillside plantations, and taste freshly roasted Blue Mountain coffee. Your expert guide will explain why this coffee commands premium prices worldwide and how the unique microclimate creates its legendary smooth flavor. The tour includes breakfast or lunch with stunning mountain views and a bag of fresh Blue Mountain coffee to take home.',
      shortDesc: 'Visit a working plantation and taste world-famous Blue Mountain coffee',
      price: 85.00,
      duration: 5,
      maxGroupSize: 10,
      difficulty: Difficulty.MODERATE,
      meetingPoint: 'Mavis Bank Coffee Factory, Blue Mountains',
      city: 'Kingston',
      coordinates: { lat: 18.0403, lng: -76.6597 },
      coverImage: '/images/tours/blue-mountain-coffee.jpg',
      included: [
        'Plantation tour',
        'Coffee tasting session',
        'Breakfast or lunch',
        'Coffee processing demonstration',
        '250g bag of Blue Mountain coffee',
      ],
      notIncluded: [
        'Additional coffee purchases',
        'Transportation (can be arranged)',
        'Gratuities',
      ],
      highlights: [
        'Tour a working coffee plantation',
        'Learn the bean-to-cup process',
        'Taste fresh Blue Mountain coffee',
        'Stunning mountain views',
        'Take home premium coffee',
      ],
      whatToBring: [
        'Light jacket (cooler in mountains)',
        'Walking shoes',
        'Camera',
        'Cash for coffee purchases',
        'Rain jacket (mountain weather)',
      ],
      categoryId: foodCategory.id,
      featured: false,
      metaTitle: 'Blue Mountain Coffee Tour - Jamaica Coffee Plantation',
      metaDescription: 'Visit a Blue Mountain coffee plantation and taste the world\'s finest coffee. Includes tour, tasting, meal, and coffee to take home.',
    },
  })

  // Tour 8: Luminous Lagoon Night Tour
  const luminousLagoonTour = await prisma.tour.create({
    data: {
      title: 'Luminous Lagoon Bioluminescence Night Tour',
      slug: 'luminous-lagoon-night-tour',
      description: 'Witness one of nature\'s most magical phenomena at the Luminous Lagoon in Falmouth. As darkness falls, millions of microscopic organisms light up the water with an ethereal blue glow whenever disturbed. Watch as fish leave glowing trails, and take a swim in the phosphorescent water where every movement creates sparkling light around you. This rare natural wonder exists in only a few places on Earth, making it a truly unique Jamaican experience. The tour includes boat ride, swimming time, and an educational component about the fascinating science behind the glow.',
      shortDesc: 'Swim in glowing bioluminescent water - a magical natural phenomenon',
      price: 45.00,
      duration: 2,
      maxGroupSize: 25,
      difficulty: Difficulty.EASY,
      meetingPoint: 'Luminous Lagoon Marina, Falmouth',
      city: 'Falmouth',
      coordinates: { lat: 18.4935, lng: -77.6504 },
      coverImage: '/images/tours/luminous-lagoon.jpg',
      included: [
        'Boat tour of the lagoon',
        'Swimming in bioluminescent water',
        'Life jackets',
        'Educational commentary',
        'Changing facilities',
      ],
      notIncluded: [
        'Towels',
        'Photos/videos',
        'Food and drinks',
        'Transportation',
      ],
      highlights: [
        'See the water glow with bioluminescence',
        'Swim in phosphorescent lagoon',
        'Learn about microorganisms',
        'Boat ride at night',
        'Unique natural phenomenon',
      ],
      whatToBring: [
        'Swimwear',
        'Towel',
        'Waterproof camera (optional)',
        'Dry clothes',
        'Bug spray',
      ],
      categoryId: adventureCategory.id,
      featured: true,
      metaTitle: 'Luminous Lagoon Night Tour - Bioluminescence Jamaica',
      metaDescription: 'Experience the magical bioluminescent Luminous Lagoon in Falmouth. Swim in glowing water on this unforgettable night tour.',
    },
  })

  // Tour 9: Appleton Rum Estate Tour
  const appletonRumTour = await prisma.tour.create({
    data: {
      title: 'Appleton Estate Rum Tour & Tasting',
      slug: 'appleton-estate-rum-tour',
      description: 'Discover Jamaica\'s rum-making heritage at the historic Appleton Estate, producing premium rum since 1749. Tour the scenic Nassau Valley estate, learn the art of rum production from sugarcane to bottle, and explore aging warehouses filled with oak barrels. The experience culminates in a guided tasting of 8 different Appleton rums, from white rum to 50-year aged reserves. Your expert guide will teach you to properly taste rum and identify flavor notes. The tour includes cocktail making demonstration and a jerk lunch paired with rum punch.',
      shortDesc: 'Tour historic rum distillery with 8-rum tasting and jerk lunch',
      price: 80.00,
      duration: 4,
      maxGroupSize: 20,
      difficulty: Difficulty.EASY,
      meetingPoint: 'Appleton Estate, Nassau Valley, St. Elizabeth',
      city: 'Montego Bay',
      coordinates: { lat: 18.2461, lng: -77.7147 },
      coverImage: '/images/tours/appleton-estate.jpg',
      included: [
        'Estate tour',
        '8-rum tasting flight',
        'Cocktail making demo',
        'Jerk lunch with rum punch',
        'Souvenir tasting glass',
      ],
      notIncluded: [
        'Bottle purchases',
        'Additional cocktails',
        'Transportation',
        'Gratuities',
      ],
      highlights: [
        'Tour historic rum distillery',
        'Taste 8 premium Appleton rums',
        'Learn cocktail making',
        'Enjoy jerk lunch',
        'Explore sugarcane fields',
      ],
      whatToBring: [
        'ID (must be 18+)',
        'Camera',
        'Cash for rum purchases',
        'Comfortable shoes',
        'Sunglasses and hat',
      ],
      categoryId: foodCategory.id,
      featured: false,
      metaTitle: 'Appleton Estate Rum Tour - Jamaica Rum Tasting Experience',
      metaDescription: 'Tour the historic Appleton Estate rum distillery with 8-rum tasting and jerk lunch. Learn Jamaica\'s rum-making heritage.',
    },
  })

  // Tour 10: YS Falls & Black River Safari
  const ysFallsTour = await prisma.tour.create({
    data: {
      title: 'YS Falls & Black River Safari Combo',
      slug: 'ys-falls-black-river-safari',
      description: 'Combine two of Jamaica\'s natural treasures in one unforgettable day. Start with a boat safari along the Black River, Jamaica\'s longest navigable river, where you\'ll spot crocodiles, exotic birds, and lush mangrove ecosystems. Then head to the stunning YS Falls, a seven-tiered waterfall cascading through landscaped gardens. Swim in natural pools, ride the zipline over the falls, or relax in the gardens. This combo tour offers the perfect mix of wildlife adventure and refreshing natural beauty.',
      shortDesc: 'Crocodile safari and seven-tiered waterfall adventure combo',
      price: 90.00,
      duration: 7,
      maxGroupSize: 15,
      difficulty: Difficulty.EASY,
      meetingPoint: 'Black River Town, St. Elizabeth',
      city: 'Negril',
      coordinates: { lat: 18.0266, lng: -77.8512 },
      coverImage: '/images/tours/ys-falls-black-river.jpg',
      included: [
        'Black River boat safari',
        'YS Falls entrance and tour',
        'Lunch',
        'Transportation between sites',
        'Life jackets',
      ],
      notIncluded: [
        'Zipline ($20 extra)',
        'Photos/videos',
        'Additional food/drinks',
        'Hotel pickup',
      ],
      highlights: [
        'See wild crocodiles in natural habitat',
        'Spot exotic birds',
        'Swim in seven-tiered waterfall pools',
        'Optional waterfall zipline',
        'Explore mangrove ecosystems',
      ],
      whatToBring: [
        'Swimwear and towel',
        'Water shoes',
        'Sunscreen',
        'Camera with zoom lens',
        'Cash for extras',
      ],
      categoryId: adventureCategory.id,
      featured: false,
      metaTitle: 'YS Falls & Black River Safari - Jamaica Nature Combo Tour',
      metaDescription: 'Experience YS Falls and Black River crocodile safari in one day. Swimming, wildlife viewing, and waterfall adventure combined.',
    },
  })

  // Tour 11: Mystic Mountain Rainforest Adventure
  const mysticMountainTour = await prisma.tour.create({
    data: {
      title: 'Mystic Mountain Rainforest Sky Explorer',
      slug: 'mystic-mountain-rainforest-adventure',
      description: 'Soar through the treetops and race through the rainforest at Mystic Mountain, Ocho Rios\' premier adventure park. Begin with a scenic Sky Explorer chairlift ride 700 feet above sea level, offering panoramic views of Ocho Rios and the Caribbean Sea. Then experience the thrilling Rainforest Bobsled, where you control your speed as you twist and turn through the jungle. Add ziplines, infinity pool, and nature trails for a full day of adventure. This tour combines adrenaline with natural beauty in one spectacular location.',
      shortDesc: 'Sky Explorer chairlift and rainforest bobsled thrill ride',
      price: 95.00,
      duration: 4,
      maxGroupSize: 50,
      difficulty: Difficulty.MODERATE,
      meetingPoint: 'Mystic Mountain, Ocho Rios',
      city: 'Ocho Rios',
      coordinates: { lat: 18.4147, lng: -77.1103 },
      coverImage: '/images/tours/mystic-mountain.jpg',
      included: [
        'Sky Explorer chairlift',
        'Rainforest Bobsled ride',
        'Infinity pool access',
        'Nature trail access',
        'Safety equipment',
      ],
      notIncluded: [
        'Zipline package (additional cost)',
        'Photos/videos',
        'Food and drinks',
        'Locker rental',
      ],
      highlights: [
        'Sky Explorer chairlift with ocean views',
        'Thrilling bobsled through rainforest',
        'Optional zipline canopy tours',
        'Infinity pool with panoramic views',
        'Hummingbird garden',
      ],
      whatToBring: [
        'Closed-toe shoes (required)',
        'Comfortable clothes',
        'Sunscreen',
        'Camera',
        'Cash for food/extras',
      ],
      categoryId: adventureCategory.id,
      featured: false,
      metaTitle: 'Mystic Mountain Ocho Rios - Rainforest Bobsled Adventure',
      metaDescription: 'Experience Sky Explorer chairlift and Rainforest Bobsled at Mystic Mountain. Ziplines, infinity pool, and jungle adventure.',
    },
  })

  // Tour 12: Accompong Maroon Village Cultural Tour
  const accompongTour = await prisma.tour.create({
    data: {
      title: 'Accompong Maroon Heritage Experience',
      slug: 'accompong-maroon-heritage-tour',
      description: 'Step into Jamaica\'s remarkable history of resistance and freedom at Accompong, a Maroon community that has maintained independence since 1739. The Maroons are descendants of enslaved Africans who escaped and formed free communities in Jamaica\'s mountains. Your local Maroon guide will share the story of their ancestors\' fight for freedom, show you the sacred Kindah Tree, and explain traditions that have survived for centuries. The tour includes a traditional drumming session, Maroon lunch, and visits to historic sites including the museum and peace cave.',
      shortDesc: 'Visit independent Maroon village and learn Jamaica\'s freedom history',
      price: 75.00,
      duration: 5,
      maxGroupSize: 12,
      difficulty: Difficulty.MODERATE,
      meetingPoint: 'Accompong Town, St. Elizabeth',
      city: 'Montego Bay',
      coordinates: { lat: 18.2489, lng: -77.6033 },
      coverImage: '/images/tours/accompong-maroon.jpg',
      included: [
        'Maroon guide and storyteller',
        'Village tour',
        'Traditional Maroon lunch',
        'Drumming session',
        'Museum entrance',
      ],
      notIncluded: [
        'Crafts/souvenirs',
        'Additional donations',
        'Transportation',
        'Gratuities',
      ],
      highlights: [
        'Learn Maroon freedom history',
        'Visit the sacred Kindah Tree',
        'Traditional drumming experience',
        'Authentic Maroon cuisine',
        'See peace treaty artifacts',
      ],
      whatToBring: [
        'Comfortable walking shoes',
        'Respectful attire',
        'Camera',
        'Cash for crafts',
        'Water bottle',
      ],
      categoryId: culturalCategory.id,
      featured: false,
      metaTitle: 'Accompong Maroon Village Tour - Jamaica Heritage Experience',
      metaDescription: 'Visit historic Accompong Maroon village and learn the story of Jamaica\'s freedom fighters. Cultural tour with traditional lunch and drumming.',
    },
  })

  console.log('✅ Created 12 authentic Jamaica tours')

  // ============================================
  // 4. Create Availability (next 60 days)
  // ============================================
  const tours = [
    rioGrandeTour,
    marthaBraeTour,
    bobMarleyTour,
    dunnsRiverTour,
    sevenMileBeachTour,
    kingstonFoodTour,
    blueMountainTour,
    luminousLagoonTour,
    appletonRumTour,
    ysFallsTour,
    mysticMountainTour,
    accompongTour,
  ]

  const today = new Date()
  for (const tour of tours) {
    for (let i = 0; i < 60; i++) {
      const date = new Date(today)
      date.setDate(date.getDate() + i)

      await prisma.availability.create({
        data: {
          tourId: tour.id,
          date,
          slots: tour.maxGroupSize,
          booked: 0,
          isBlocked: false,
        },
      })
    }
  }

  console.log('✅ Created 60 days of availability for all tours')

  // ============================================
  // 5. Create Reviews
  // ============================================
  const reviews = [
    // Rio Grande reviews
    {
      userId: testUser.id,
      tourId: rioGrandeTour.id,
      rating: 5,
      title: 'Most romantic experience ever!',
      comment:
        'My husband and I had the most amazing time on the Rio Grande. Our captain was so knowledgeable and friendly. The river was absolutely beautiful and peaceful. We even stopped to swim in a crystal-clear pool. This is a must-do in Jamaica!',
      images: [],
      isApproved: true,
      helpfulCount: 15,
    },
    {
      userId: adminUser.id,
      tourId: rioGrandeTour.id,
      rating: 5,
      title: 'Authentic Jamaican experience',
      comment:
        'Been to Jamaica 5 times and this was my first time doing the bamboo rafting. What a mistake to wait so long! The raft captain shared so many stories about the history of the river and Portland. Absolutely loved it.',
      images: [],
      isApproved: true,
      helpfulCount: 8,
    },
    // Martha Brae reviews
    {
      userId: testUser.id,
      tourId: marthaBraeTour.id,
      rating: 5,
      title: 'Perfect family activity',
      comment:
        'We took our kids (ages 8 and 12) and they loved it! Very safe and relaxing. The Rafters Village at the start was beautiful. Our captain let the kids help guide the raft. Great value for money.',
      images: [],
      isApproved: true,
      helpfulCount: 12,
    },
    {
      userId: guideUser.id,
      tourId: marthaBraeTour.id,
      rating: 4,
      title: 'Relaxing but busy',
      comment:
        'Beautiful experience, though it was quite busy when we went. Try to book early morning for a more peaceful experience. The river itself is gorgeous and our captain was excellent.',
      images: [],
      isApproved: true,
      helpfulCount: 6,
    },
    // Bob Marley reviews
    {
      userId: testUser.id,
      tourId: bobMarleyTour.id,
      rating: 5,
      title: 'Pilgrimage for any reggae fan',
      comment:
        'If you love Bob Marley, you MUST do this tour. Standing at his birthplace and mausoleum was incredibly moving. The Ital lunch was delicious. Our Rastafarian guide shared so many personal stories. Bring tissues!',
      images: [],
      isApproved: true,
      helpfulCount: 24,
    },
    {
      userId: adminUser.id,
      tourId: bobMarleyTour.id,
      rating: 5,
      title: 'Beyond my expectations',
      comment:
        'I\'m not even a huge reggae fan but this tour was fascinating. The drive through the countryside was beautiful, and learning about Bob\'s life in such an intimate setting was special. The lunch was great too!',
      images: [],
      isApproved: true,
      helpfulCount: 10,
    },
    // Dunn's River reviews
    {
      userId: testUser.id,
      tourId: dunnsRiverTour.id,
      rating: 5,
      title: 'Bucket list checked off!',
      comment:
        'What an incredible experience! The guides were fantastic and helped everyone safely up the falls. Definitely rent water shoes - worth every penny. The beach afterward was a nice bonus. My arms were tired but it was so worth it!',
      images: [],
      isApproved: true,
      helpfulCount: 18,
    },
    {
      userId: guideUser.id,
      tourId: dunnsRiverTour.id,
      rating: 4,
      title: 'Fun but crowded',
      comment:
        'The climb itself was amazing - the falls are just as beautiful as photos show. It was VERY crowded when we went (cruise ship day). Go early or check the cruise schedule. Still highly recommend!',
      images: [],
      isApproved: true,
      helpfulCount: 9,
    },
    // Seven Mile Beach reviews
    {
      userId: testUser.id,
      tourId: sevenMileBeachTour.id,
      rating: 5,
      title: 'Beach paradise!',
      comment:
        'Seven Mile Beach is absolutely stunning. The water is so clear and warm. Watching the sunset at Rick\'s Café while sipping a cocktail was magical. The cliff divers were incredible. Perfect day!',
      images: [],
      isApproved: true,
      helpfulCount: 14,
    },
    {
      userId: adminUser.id,
      tourId: sevenMileBeachTour.id,
      rating: 5,
      title: 'Best beach in Jamaica',
      comment:
        'I\'ve been to many Caribbean beaches and this is definitely top 3. The sand is like powder, water is perfect temperature. Rick\'s Café was touristy but fun. Great for families or couples.',
      images: [],
      isApproved: true,
      helpfulCount: 7,
    },
    // Kingston Food Tour reviews
    {
      userId: testUser.id,
      tourId: kingstonFoodTour.id,
      rating: 5,
      title: 'Best way to experience Kingston!',
      comment:
        'This tour was the highlight of our trip! Our guide knew everyone and took us to places we never would have found. The jerk chicken was the best I\'ve ever had. Come hungry - it\'s SO much food!',
      images: [],
      isApproved: true,
      helpfulCount: 21,
    },
    {
      userId: guideUser.id,
      tourId: kingstonFoodTour.id,
      rating: 5,
      title: 'Authentic and delicious',
      comment:
        'No tourist traps on this tour - just real Jamaican food and culture. Loved the market visit and the historical stories. The patties, oh my goodness! My favorite tour in Jamaica.',
      images: [],
      isApproved: true,
      helpfulCount: 11,
    },
    // Blue Mountain Coffee reviews
    {
      userId: testUser.id,
      tourId: blueMountainTour.id,
      rating: 5,
      title: 'Coffee lovers\' dream',
      comment:
        'As a coffee snob, this exceeded expectations. The plantation was beautiful, the process was fascinating, and the coffee... incredible. Worth every penny. Bought 5 bags to take home!',
      images: [],
      isApproved: true,
      helpfulCount: 16,
    },
    {
      userId: adminUser.id,
      tourId: blueMountainTour.id,
      rating: 4,
      title: 'Great tour, challenging drive',
      comment:
        'The plantation tour and tasting were excellent. The mountain views were breathtaking. The drive up is very winding and steep - not for those who get car sick. Bring a jacket, it\'s cooler up there!',
      images: [],
      isApproved: true,
      helpfulCount: 8,
    },
    // Luminous Lagoon reviews
    {
      userId: testUser.id,
      tourId: luminousLagoonTour.id,
      rating: 5,
      title: 'Absolutely magical!',
      comment:
        'This is one of the coolest things I\'ve ever experienced! Swimming in glowing water felt like being in a fairy tale. The kids were mesmerized. Photos don\'t do it justice - you have to see it in person!',
      images: [],
      isApproved: true,
      helpfulCount: 19,
    },
    {
      userId: guideUser.id,
      tourId: luminousLagoonTour.id,
      rating: 5,
      title: 'Nature\'s wonder',
      comment:
        'Truly a once-in-a-lifetime experience. The guides explained the science really well. The water really does glow bright blue when you move! Go on a dark night (no full moon) for the best effect.',
      images: [],
      isApproved: true,
      helpfulCount: 13,
    },
    // Appleton Estate reviews
    {
      userId: testUser.id,
      tourId: appletonRumTour.id,
      rating: 5,
      title: 'Best rum tour ever!',
      comment:
        'The estate is gorgeous and the tour was so informative. The tasting was generous - 8 different rums! The jerk lunch was delicious. Left with 3 bottles of rum. Great value!',
      images: [],
      isApproved: true,
      helpfulCount: 17,
    },
    {
      userId: adminUser.id,
      tourId: appletonRumTour.id,
      rating: 5,
      title: 'Rum education and fun',
      comment:
        'Learned so much about rum production. The aging warehouses smelled amazing. The cocktail demo was fun and the lunch was excellent. Pace yourself on the tasting - it\'s a lot of rum!',
      images: [],
      isApproved: true,
      helpfulCount: 9,
    },
    // YS Falls reviews
    {
      userId: testUser.id,
      tourId: ysFallsTour.id,
      rating: 5,
      title: 'Perfect combo tour',
      comment:
        'Seeing crocodiles in the wild was thrilling! YS Falls was even more beautiful than expected. The zipline over the falls was amazing. Long day but packed with adventure. Highly recommend!',
      images: [],
      isApproved: true,
      helpfulCount: 15,
    },
    {
      userId: guideUser.id,
      tourId: ysFallsTour.id,
      rating: 5,
      title: 'Two gems in one day',
      comment:
        'Both attractions were fantastic. The Black River safari was educational and exciting. YS Falls was less crowded than Dunn\'s River and just as beautiful. The gardens are well maintained.',
      images: [],
      isApproved: true,
      helpfulCount: 11,
    },
    // Mystic Mountain reviews
    {
      userId: testUser.id,
      tourId: mysticMountainTour.id,
      rating: 5,
      title: 'Thrill-seekers paradise!',
      comment:
        'The bobsled was SO fun! You control your own speed so it\'s as tame or wild as you want. The chairlift views were incredible. Added the zipline package - totally worth it. Great for families!',
      images: [],
      isApproved: true,
      helpfulCount: 14,
    },
    {
      userId: adminUser.id,
      tourId: mysticMountainTour.id,
      rating: 4,
      title: 'Fun adventure park',
      comment:
        'Really enjoyed the bobsled and Sky Explorer. The infinity pool had amazing views. A bit pricey with all the add-ons but the experience was great. Book online in advance for discounts.',
      images: [],
      isApproved: true,
      helpfulCount: 7,
    },
    // Accompong reviews
    {
      userId: testUser.id,
      tourId: accompongTour.id,
      rating: 5,
      title: 'Powerful cultural experience',
      comment:
        'This tour gave me a whole new appreciation for Jamaican history. The Maroon story is incredible and often overlooked. Our guide was passionate and knowledgeable. The drumming session was unforgettable.',
      images: [],
      isApproved: true,
      helpfulCount: 20,
    },
    {
      userId: guideUser.id,
      tourId: accompongTour.id,
      rating: 5,
      title: 'History comes alive',
      comment:
        'Every Jamaican should experience this. Learning about the Maroons\' fight for freedom was inspiring. The traditional lunch was delicious. The community is welcoming and proud of their heritage.',
      images: [],
      isApproved: true,
      helpfulCount: 12,
    },
  ]

  for (const reviewData of reviews) {
    await prisma.review.create({ data: reviewData })
  }

  console.log('✅ Created 24 authentic tour reviews')

  console.log('\n🎉 Seed completed successfully!')
  console.log('\n📊 Summary:')
  console.log('   - 3 users (admin, guide, user)')
  console.log('   - 5 tour categories')
  console.log('   - 12 Jamaica tours')
  console.log('   - 720 availability records (60 days × 12 tours)')
  console.log('   - 24 tour reviews')
  console.log('\n🔐 Login credentials (all passwords: Password123!):')
  console.log('   - Admin: admin@nmgtours.com')
  console.log('   - Guide: guide@nmgtours.com')
  console.log('   - User:  user@example.com')
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
