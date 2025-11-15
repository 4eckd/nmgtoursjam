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

  console.log('✅ Tours created')

  // Create images for tours
  await prisma.image.createMany({
    data: [
      { tourId: tour1.id, url: '/tours/martha-brae-1.jpg', alt: 'Bamboo raft on Martha Brae', order: 1 },
      { tourId: tour1.id, url: '/tours/martha-brae-2.jpg', alt: 'Couple rafting', order: 2 },
      { tourId: tour1.id, url: '/tours/martha-brae-3.jpg', alt: 'River scenery', order: 3 },
      { tourId: tour2.id, url: '/tours/rio-grande-1.jpg', alt: 'Rio Grande rafting', order: 1 },
      { tourId: tour2.id, url: '/tours/rio-grande-2.jpg', alt: 'Mountain views', order: 2 },
      { tourId: tour3.id, url: '/tours/white-river-1.jpg', alt: 'River tubing', order: 1 },
      { tourId: tour3.id, url: '/tours/white-river-2.jpg', alt: 'Rapids fun', order: 2 },
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
