import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const CATEGORIES = [
  { name: "Venues", slug: "venues" },
  { name: "Photographers", slug: "photographers" },
  { name: "Videographers", slug: "videographers" },
  { name: "Decorators", slug: "decorators" },
  { name: "Florists", slug: "florists" },
  { name: "Caterers", slug: "caterers" },
  { name: "DJs", slug: "djs" },
  { name: "Bands", slug: "bands" },
  { name: "Dhol Players", slug: "dhol-players" },
  { name: "Makeup Artists", slug: "makeup-artists" },
  { name: "Mehndi Artists", slug: "mehndi-artists" },
  { name: "Wedding Planners", slug: "wedding-planners" },
  { name: "Bridal Wear", slug: "bridal-wear" },
  { name: "Jewellers", slug: "jewellers" },
  { name: "Cake Designers", slug: "cake-designers" },
  { name: "Transport", slug: "transport" },
  { name: "Invitation Designers", slug: "invitation-designers" },
];

const GALLERY_CATEGORIES = [
  "ROKA",
  "ENGAGEMENT",
  "MAIYAN",
  "MEHNDI",
  "JAGGO",
  "CHOORA",
  "ANAND_KARAJ",
  "RECEPTION",
];

async function main() {
  for (const category of CATEGORIES) {
    await prisma.vendorCategory.upsert({
      where: { slug: category.slug },
      create: category,
      update: category,
    });
  }

  const admin = await prisma.user.upsert({
    where: { clerkId: "seed-admin" },
    create: { clerkId: "seed-admin", email: "admin@sadavyah.com", role: "ADMIN" },
    update: {},
  });
  await prisma.adminUser.upsert({
    where: { userId: admin.id },
    create: { userId: admin.id, permissions: ["*"] },
    update: {},
  });

  const venueCategory = await prisma.vendorCategory.findUniqueOrThrow({ where: { slug: "venues" } });
  const vendorUser = await prisma.user.upsert({
    where: { clerkId: "seed-vendor-royal-regency" },
    create: { clerkId: "seed-vendor-royal-regency", email: "hello@royalregency.example", role: "VENDOR" },
    update: {},
  });
  const vendor = await prisma.vendor.upsert({
    where: { slug: "royal-regency" },
    create: {
      userId: vendorUser.id,
      businessName: "Royal Regency",
      slug: "royal-regency",
      categoryId: venueCategory.id,
      country: "UK",
      city: "London",
      description: "A grand banqueting suite specialising in Anand Karaj receptions.",
      priceRangeMin: 4500,
      priceRangeMax: 12000,
      servicesOffered: ["Reception Hall", "In-house Catering", "Decor Partner Network"],
      verification: "VERIFIED",
      isFeatured: true,
      ratingAverage: 4.9,
      ratingCount: 128,
    },
    update: {},
  });
  await prisma.subscription.upsert({
    where: { vendorId: vendor.id },
    create: { vendorId: vendor.id, plan: "PLATINUM", status: "ACTIVE" },
    update: {},
  });

  // Seed images use a placeholder service so the gallery isn't broken out of the
  // box — real launch content should be uploaded via the admin gallery CMS.
  for (const category of GALLERY_CATEGORIES) {
    await prisma.galleryImage.upsert({
      where: { id: `seed-${category}` },
      create: {
        id: `seed-${category}`,
        category,
        imageUrl: `https://picsum.photos/seed/${category.toLowerCase()}/800/600`,
      },
      update: {},
    });
  }

  console.log("Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
