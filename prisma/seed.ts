import { PrismaClient, Difficulty, Role } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Create categories
  const raftingCategory = await prisma.category.upsert({
    where: { slug: 'rafting' },
    update: {},
    create: {
      name: 'Rafting Tours',
      slug: 'rafting',
      description: 'Experience the thrill of bamboo rafting on Jamaica\'s beautiful rivers',
      icon: '🚣',
    },
  })

  const cultureCategory = await prisma.category.upsert({
    where: { slug: 'culture' },
    update: {},
    create: {
      name: 'Cultural Experiences',
      slug: 'culture',
      description: 'Immerse yourself in authentic Jamaican culture and traditions',
      icon: '🎭',
    },
  })

  const adventureCategory = await prisma.category.upsert({
    where: { slug: 'adventure' },
    update: {},
    create: {
      name: 'Adventure Tours',
      slug: 'adventure',
      description: 'Exciting adventures for thrill-seekers',
      icon: '⛰️',
    },
  })

  console.log('✅ Categories created')

  // Create sample tours
  const tour1 = await prisma.tour.upsert({
    where: { slug: 'martha-brae-rafting-experience' },
    update: {},
    create: {
      title: 'Martha Brae Rafting Experience',
      slug: 'martha-brae-rafting-experience',
      description: 'Drift down the tranquil Martha Brae River on a 30-foot bamboo raft guided by an experienced captain. This 3-mile journey takes approximately 1.5 hours through lush tropical scenery. Your raft captain will navigate the gentle waters while sharing stories about the river\'s history and pointing out local flora and fauna. Perfect for couples, families, and nature lovers seeking a peaceful escape.',
      shortDesc: 'Romantic bamboo rafting on the famous Martha Brae River with experienced guides',
      price: 85.00,
      duration: 2,
      maxGroupSize: 2,
      difficulty: Difficulty.EASY,
      meetingPoint: 'Martha Brae Village, Trelawny',
      city: 'Falmouth',
      coverImage: '/tours/martha-brae-main.jpg',
      included: [
        'Bamboo raft ride (approx 1.5 hours)',
        'Experienced raft captain',
        'Welcome drink',
        'Life jackets',
        'Hotel pickup from select areas',
      ],
      notIncluded: [
        'Lunch and beverages',
        'Photos and videos',
        'Gratuities',
        'Personal expenses',
      ],
      highlights: [
        'Glide down the scenic Martha Brae River',
        'Learn about local history and culture',
        'Spot tropical birds and wildlife',
        'Photo opportunities along the riverbanks',
        'Relaxing and romantic atmosphere',
      ],
      whatToBring: [
        'Swimsuit (wear under clothes)',
        'Towel',
        'Sunscreen',
        'Camera or phone in waterproof case',
        'Cash for souvenirs and tips',
        'Light comfortable clothing',
      ],
      categoryId: raftingCategory.id,
      featured: true,
      isActive: true,
    },
  })

  const tour2 = await prisma.tour.upsert({
    where: { slug: 'rio-grande-rafting-adventure' },
    update: {},
    create: {
      title: 'Rio Grande Rafting Adventure',
      slug: 'rio-grande-rafting-adventure',
      description: 'Experience the legendary Rio Grande River, made famous by Errol Flynn. This 8-mile bamboo rafting journey takes approximately 2.5 hours through spectacular scenery including lush valleys, towering banana plantations, and breathtaking mountain views. Your skilled raft captain will expertly navigate the river while you relax and soak in the natural beauty. This is Jamaica\'s most famous rafting experience!',
      shortDesc: 'Iconic rafting adventure on the legendary Rio Grande River',
      price: 95.00,
      duration: 3,
      maxGroupSize: 2,
      difficulty: Difficulty.EASY,
      meetingPoint: 'Berridale, Port Antonio',
      city: 'Port Antonio',
      coverImage: '/tours/rio-grande-main.jpg',
      included: [
        'Bamboo raft ride (approx 2.5 hours)',
        'Professional raft captain',
        'Welcome cocktail',
        'Safety equipment',
        'Transportation from Port Antonio hotels',
      ],
      notIncluded: [
        'Meals',
        'Professional photos',
        'Gratuities',
        'Souvenirs',
      ],
      highlights: [
        'Jamaica\'s original and most famous rafting experience',
        'Stunning mountain and valley scenery',
        'Pass through banana plantations',
        'Swimming opportunities in calm sections',
        'Rich history dating back to Errol Flynn',
      ],
      whatToBring: [
        'Swimwear',
        'Change of clothes',
        'Waterproof phone case',
        'Sunscreen and hat',
        'Insect repellent',
        'Cash for photos and tips',
      ],
      categoryId: raftingCategory.id,
      featured: true,
      isActive: true,
    },
  })

  const tour3 = await prisma.tour.upsert({
    where: { slug: 'white-river-tubing-adventure' },
    update: {},
    create: {
      title: 'White River Tubing Adventure',
      slug: 'white-river-tubing-adventure',
      description: 'Get your adrenaline pumping with an exciting river tubing adventure on the White River! Navigate mild rapids, float through calm sections, and take in the stunning natural beauty of Jamaica\'s countryside. Your guide will lead you through approximately 3 miles of varying river conditions, from gentle floats to thrilling rapids (Class I-II). Perfect for adventure seekers and families with older children.',
      shortDesc: 'Thrilling river tubing with mild rapids and beautiful scenery',
      price: 75.00,
      duration: 3,
      maxGroupSize: 8,
      difficulty: Difficulty.MODERATE,
      meetingPoint: 'White River, St. Ann',
      city: 'Ocho Rios',
      coverImage: '/tours/white-river-main.jpg',
      included: [
        'River tubing equipment (tube, helmet, life jacket)',
        'Professional river guide',
        'Safety briefing',
        'Light refreshments',
        'Shower facilities',
      ],
      notIncluded: [
        'Meals',
        'Transportation (available for additional fee)',
        'Photo packages',
        'Tips for guides',
      ],
      highlights: [
        'Navigate exciting Class I-II rapids',
        'Cool off in crystal-clear river water',
        'Swim in natural pools',
        'Experience unspoiled natural beauty',
        'Fun for adventure lovers and families',
      ],
      whatToBring: [
        'Swimsuit (wear it)',
        'Water shoes or secure sandals',
        'Dry clothes and towel',
        'Waterproof camera',
        'Sunscreen (reef-safe)',
        'Small amount of cash',
      ],
      categoryId: adventureCategory.id,
      featured: false,
      isActive: true,
    },
  })

  const tour4 = await prisma.tour.upsert({
    where: { slug: 'nine-mile-bob-marley-tour' },
    update: {},
    create: {
      title: 'Nine Mile Bob Marley Experience',
      slug: 'nine-mile-bob-marley-tour',
      description: 'Visit the birthplace and final resting place of reggae legend Bob Marley in the village of Nine Mile. This cultural pilgrimage takes you deep into the Jamaican countryside where Bob Marley spent his early years. Tour his childhood home, see the rock where he rested his head for meditation, visit his mausoleum, and learn about Rastafarian culture. Your Rastafarian guide will share personal stories and insights about the King of Reggae\'s life and legacy.',
      shortDesc: 'Authentic cultural tour to Bob Marley\'s birthplace and mausoleum',
      price: 70.00,
      duration: 4,
      maxGroupSize: 15,
      difficulty: Difficulty.EASY,
      meetingPoint: 'Nine Mile, St. Ann',
      city: 'Nine Mile',
      coverImage: '/tours/nine-mile-main.jpg',
      included: [
        'Guided tour of Bob Marley\'s birthplace',
        'Visit to Bob Marley\'s mausoleum',
        'Rastafarian guide',
        'Cultural insights and stories',
        'Photo opportunities',
      ],
      notIncluded: [
        'Lunch',
        'Transportation to Nine Mile',
        'Souvenirs',
        'Donations',
      ],
      highlights: [
        'See where Bob Marley was born and raised',
        'Visit the famous meditation rock',
        'Pay respects at his mausoleum',
        'Learn about Rastafarian culture',
        'Hear stories from local Rastafarian guides',
        'Explore authentic Jamaican countryside',
      ],
      whatToBring: [
        'Camera',
        'Comfortable walking shoes',
        'Hat and sunscreen',
        'Cash for souvenirs',
        'Respectful attire',
        'Water bottle',
      ],
      categoryId: cultureCategory.id,
      featured: true,
      isActive: true,
    },
  })

  const tour5 = await prisma.tour.upsert({
    where: { slug: 'dunn-river-falls-climb' },
    update: {},
    create: {
      title: 'Dunn\'s River Falls Climb',
      slug: 'dunn-river-falls-climb',
      description: 'Climb the world-famous Dunn\'s River Falls, one of Jamaica\'s most iconic natural attractions! This 600-foot terraced waterfall flows directly into the Caribbean Sea. Join hands with fellow climbers to form a human chain as you ascend the natural limestone steps. The climb takes about 1.5 hours with plenty of stops for photos and swimming in the natural pools. An exhilarating must-do experience for every Jamaica visitor!',
      shortDesc: 'Climb the iconic 600-foot terraced waterfall flowing to the sea',
      price: 65.00,
      duration: 3,
      maxGroupSize: 20,
      difficulty: Difficulty.MODERATE,
      meetingPoint: 'Dunn\'s River Falls Park, Ocho Rios',
      city: 'Ocho Rios',
      coverImage: '/tours/dunns-river-main.jpg',
      included: [
        'Park admission fee',
        'Water shoes rental',
        'Professional guide',
        'Use of lockers',
        'Beach access after climb',
      ],
      notIncluded: [
        'Photos and videos',
        'Food and drinks',
        'Transportation',
        'Tips for guides',
      ],
      highlights: [
        'Climb Jamaica\'s most famous waterfall',
        'Form human chains with fellow climbers',
        'Swim in natural pools',
        'Photo opportunities at each tier',
        'Beach access at the falls base',
        'Lush tropical gardens',
      ],
      whatToBring: [
        'Swimsuit (wear under clothes)',
        'Towel and change of clothes',
        'Waterproof phone case',
        'Sunscreen',
        'Small waterproof bag',
        'Cash for photos and snacks',
      ],
      categoryId: adventureCategory.id,
      featured: true,
      isActive: true,
    },
  })

  const tour6 = await prisma.tour.upsert({
    where: { slug: 'luminous-lagoon-night-tour' },
    update: {},
    create: {
      title: 'Luminous Lagoon Night Experience',
      slug: 'luminous-lagoon-night-tour',
      description: 'Witness one of nature\'s most magical phenomena at the Luminous Lagoon in Falmouth! This rare bioluminescent bay is one of only four in the world. As darkness falls, board a boat and cruise into the lagoon where millions of microscopic organisms create an ethereal blue-green glow with every movement. Swim in the glowing water and watch your body outline in light - a truly unforgettable experience!',
      shortDesc: 'Magical night swim in one of the world\'s only bioluminescent lagoons',
      price: 55.00,
      duration: 2,
      maxGroupSize: 30,
      difficulty: Difficulty.EASY,
      meetingPoint: 'Glistening Waters Marina, Falmouth',
      city: 'Falmouth',
      coverImage: '/tours/luminous-lagoon-main.jpg',
      included: [
        'Boat ride into the lagoon',
        'Swimming opportunity',
        'Knowledgeable guide',
        'Life jackets',
        'Welcome drink',
      ],
      notIncluded: [
        'Transportation',
        'Towels',
        'Additional food and drinks',
        'Photos',
      ],
      highlights: [
        'See bioluminescence - a rare natural phenomenon',
        'Swim in glowing water',
        'Watch fish create light trails',
        'Learn about the science behind the glow',
        'Romantic and family-friendly',
        'Open bar on some packages',
      ],
      whatToBring: [
        'Swimsuit',
        'Towel',
        'Waterproof camera',
        'Light jacket for boat ride',
        'Insect repellent',
        'Cash for drinks',
      ],
      categoryId: adventureCategory.id,
      featured: false,
      isActive: true,
    },
  })

  const tour7 = await prisma.tour.upsert({
    where: { slug: 'blue-hole-mineral-spring' },
    update: {},
    create: {
      title: 'Blue Hole Mineral Spring Adventure',
      slug: 'blue-hole-mineral-spring',
      description: 'Discover the hidden gem of Negril - the Blue Hole Mineral Spring! Jump or dive from cliffs ranging from 10 to 30 feet into the deep azure waters of this natural mineral spring. The Blue Hole is over 35 feet deep and fed by an underground cave system. Swim in the therapeutic mineral waters, explore the underwater cave opening, and enjoy the adrenaline rush of cliff jumping. Perfect for thrill-seekers!',
      shortDesc: 'Cliff jumping and cave swimming in natural mineral spring',
      price: 45.00,
      duration: 2,
      maxGroupSize: 15,
      difficulty: Difficulty.CHALLENGING,
      meetingPoint: 'Brighton District, Westmoreland',
      city: 'Negril',
      coverImage: '/tours/blue-hole-main.jpg',
      included: [
        'Admission to Blue Hole',
        'Life jackets',
        'Local guide',
        'Use of facilities',
        'Safety briefing',
      ],
      notIncluded: [
        'Transportation',
        'Food and beverages',
        'Photo packages',
        'Tips',
      ],
      highlights: [
        'Jump from cliffs up to 30 feet high',
        'Swim in deep mineral spring waters',
        'Explore underwater cave opening',
        'Crystal-clear blue water',
        'Natural and unspoiled setting',
        'Therapeutic mineral benefits',
      ],
      whatToBring: [
        'Swimsuit',
        'Water shoes',
        'Towel and dry clothes',
        'Waterproof camera',
        'Courage for cliff jumping!',
        'Cash for refreshments',
      ],
      categoryId: adventureCategory.id,
      featured: false,
      isActive: true,
    },
  })

  const tour8 = await prisma.tour.upsert({
    where: { slug: 'jamaican-cooking-class' },
    update: {},
    create: {
      title: 'Authentic Jamaican Cooking Class',
      slug: 'jamaican-cooking-class',
      description: 'Learn to cook authentic Jamaican dishes from a local chef in a traditional Jamaican home! This hands-on culinary experience teaches you to prepare classic dishes like jerk chicken, rice and peas, festival, and ackee and saltfish. Visit a local market to select fresh ingredients, learn about Jamaican spices and cooking techniques, then prepare a full meal together. End the class by enjoying the fruits of your labor with your fellow students!',
      shortDesc: 'Hands-on cooking class with local chef in traditional Jamaican home',
      price: 80.00,
      duration: 4,
      maxGroupSize: 8,
      difficulty: Difficulty.EASY,
      meetingPoint: 'Local home in Kingston (address provided upon booking)',
      city: 'Kingston',
      coverImage: '/tours/cooking-class-main.jpg',
      included: [
        'Market tour for fresh ingredients',
        'All cooking ingredients and supplies',
        'Professional chef instruction',
        'Full meal that you prepare',
        'Recipe cards to take home',
        'Beverage (including rum punch!)',
      ],
      notIncluded: [
        'Transportation to venue',
        'Additional beverages',
        'Gratuities',
      ],
      highlights: [
        'Cook authentic Jamaican dishes',
        'Visit local market with chef',
        'Learn about Jamaican spices and techniques',
        'Enjoy the meal you prepare',
        'Take home recipe cards',
        'Small group for personalized attention',
        'Cultural immersion experience',
      ],
      whatToBring: [
        'Appetite!',
        'Camera for photos',
        'Comfortable clothes',
        'Hair tie (if long hair)',
        'Notepad for extra notes',
      ],
      categoryId: cultureCategory.id,
      featured: false,
      isActive: true,
    },
  })

  console.log('✅ Tours created (8 total)')

  // Create images for tours
  await prisma.image.createMany({
    data: [
      // Martha Brae images
      { tourId: tour1.id, url: '/tours/martha-brae-1.jpg', alt: 'Bamboo raft on Martha Brae', order: 1 },
      { tourId: tour1.id, url: '/tours/martha-brae-2.jpg', alt: 'Couple rafting', order: 2 },
      { tourId: tour1.id, url: '/tours/martha-brae-3.jpg', alt: 'River scenery', order: 3 },
      // Rio Grande images
      { tourId: tour2.id, url: '/tours/rio-grande-1.jpg', alt: 'Rio Grande rafting', order: 1 },
      { tourId: tour2.id, url: '/tours/rio-grande-2.jpg', alt: 'Mountain views', order: 2 },
      { tourId: tour2.id, url: '/tours/rio-grande-3.jpg', alt: 'Banana plantations', order: 3 },
      // White River images
      { tourId: tour3.id, url: '/tours/white-river-1.jpg', alt: 'River tubing', order: 1 },
      { tourId: tour3.id, url: '/tours/white-river-2.jpg', alt: 'Rapids fun', order: 2 },
      { tourId: tour3.id, url: '/tours/white-river-3.jpg', alt: 'Natural pools', order: 3 },
      // Nine Mile images
      { tourId: tour4.id, url: '/tours/nine-mile-1.jpg', alt: 'Bob Marley birthplace', order: 1 },
      { tourId: tour4.id, url: '/tours/nine-mile-2.jpg', alt: 'Meditation rock', order: 2 },
      { tourId: tour4.id, url: '/tours/nine-mile-3.jpg', alt: 'Mausoleum', order: 3 },
      // Dunn's River images
      { tourId: tour5.id, url: '/tours/dunns-river-1.jpg', alt: 'Climbing the falls', order: 1 },
      { tourId: tour5.id, url: '/tours/dunns-river-2.jpg', alt: 'Waterfall tiers', order: 2 },
      { tourId: tour5.id, url: '/tours/dunns-river-3.jpg', alt: 'Natural pools', order: 3 },
      // Luminous Lagoon images
      { tourId: tour6.id, url: '/tours/luminous-lagoon-1.jpg', alt: 'Bioluminescent water', order: 1 },
      { tourId: tour6.id, url: '/tours/luminous-lagoon-2.jpg', alt: 'Night boat tour', order: 2 },
      { tourId: tour6.id, url: '/tours/luminous-lagoon-3.jpg', alt: 'Glowing water trails', order: 3 },
      // Blue Hole images
      { tourId: tour7.id, url: '/tours/blue-hole-1.jpg', alt: 'Cliff jumping', order: 1 },
      { tourId: tour7.id, url: '/tours/blue-hole-2.jpg', alt: 'Deep blue water', order: 2 },
      { tourId: tour7.id, url: '/tours/blue-hole-3.jpg', alt: 'Cave entrance', order: 3 },
      // Cooking Class images
      { tourId: tour8.id, url: '/tours/cooking-class-1.jpg', alt: 'Preparing jerk chicken', order: 1 },
      { tourId: tour8.id, url: '/tours/cooking-class-2.jpg', alt: 'Local market visit', order: 2 },
      { tourId: tour8.id, url: '/tours/cooking-class-3.jpg', alt: 'Finished meal', order: 3 },
    ],
  })

  console.log('✅ Images created')

  // Create availability for next 30 days
  const today = new Date()
  for (let i = 0; i < 30; i++) {
    const date = new Date(today)
    date.setDate(date.getDate() + i)

    await prisma.availability.createMany({
      data: [
        { tourId: tour1.id, date, slots: 10, booked: 0 },
        { tourId: tour2.id, date, slots: 10, booked: 0 },
        { tourId: tour3.id, date, slots: 20, booked: 0 },
        { tourId: tour4.id, date, slots: 15, booked: 0 },
        { tourId: tour5.id, date, slots: 30, booked: 0 },
        { tourId: tour6.id, date, slots: 40, booked: 0 },
        { tourId: tour7.id, date, slots: 15, booked: 0 },
        { tourId: tour8.id, date, slots: 8, booked: 0 },
      ],
      skipDuplicates: true,
    })
  }

  console.log('✅ Availability created for 30 days')

  // Create admin user
  const admin = await prisma.user.upsert({
    where: { email: 'admin@nmgtoursjam.com' },
    update: {},
    create: {
      email: 'admin@nmgtoursjam.com',
      name: 'Admin User',
      role: Role.ADMIN,
      emailVerified: new Date(),
    },
  })

  console.log('✅ Admin user created')

  console.log('🎉 Database seed completed successfully!')
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
