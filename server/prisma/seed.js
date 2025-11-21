require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });
const { PrismaClient } = require('@prisma/client');
const { hashPassword } = require('../src/utils/password');

const prisma = new PrismaClient();

async function main() {
  console.log('🪣 Reset database...');
  await prisma.notification.deleteMany();
  await prisma.membershipRequest.deleteMany();
  await prisma.clubMember.deleteMany();
  await prisma.event.deleteMany();
  await prisma.clubPhoto.deleteMany();
  await prisma.club.deleteMany();
  await prisma.user.deleteMany();

  console.log('👤 Create users');
  const adminPassword = await hashPassword('Admin123!');
  const studentPassword = await hashPassword('Student123!');

  const admin = await prisma.user.create({
    data: {
      email: 'admin@uniclubs.com',
      passwordHash: adminPassword,
      firstName: 'John',
      lastName: 'Admin',
      role: 'ADMIN',
    },
  });

  const student = await prisma.user.create({
    data: {
      email: 'emma.johnson@university.edu',
      passwordHash: studentPassword,
      firstName: 'Emma',
      lastName: 'Johnson',
      role: 'STUDENT',
      major: 'Computer Science',
      studentId: 'STU-2024-001',
    },
  });

  console.log('🏛️ Create clubs');
  const clubs = await Promise.all([
    prisma.club.create({
      data: {
        name: 'Computer Science Society',
        description: 'Learn coding, build projects, and participate in hackathons.',
        category: 'Technologie',
        bannerUrl: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=1200',
        logoUrl: 'https://tse4.mm.bing.net/th/id/OIP.5GnL6LJ-37ows0KFzLbv5gHaHa',
        adminId: admin.id,
        photos: {
          create: [
            { url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=300', priority: 0 },
            { url: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=300', priority: 1 },
          ],
        },
      },
      include: { photos: true },
    }),
    prisma.club.create({
      data: {
        name: 'Debate Society',
        description: 'Sharpen your public speaking skills.',
        category: 'Arts',
        bannerUrl: 'https://edit.org/editor/json/2023/09/08/a/5/a5943bb8d2af49e5844fbbb2a3b73c68.webp',
        logoUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500',
        adminId: admin.id,
      },
    }),
  ]);

  console.log('📅 Create events');
  await prisma.event.createMany({
    data: [
      {
        title: 'Coding Workshop',
        description: 'Learn advanced React hooks.',
        startDate: new Date('2025-11-20'),
        location: 'Amphithéâtre A',
        tag: 'Workshop',
        clubId: clubs[0].id,
      },
      {
        title: 'Tech Talk Series',
        description: 'Guest speaker from Google.',
        startDate: new Date('2025-11-22'),
        location: 'Auditorium B',
        tag: 'Talk',
        clubId: clubs[0].id,
      },
    ],
  });

  console.log('🧑‍🤝‍🧑 Seed membership request');
  await prisma.membershipRequest.create({
    data: {
      clubId: clubs[0].id,
      userId: student.id,
      message: 'Je souhaite rejoindre vos ateliers.',
      status: 'PENDING',
    },
  });

  console.log('✅ Done');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

