import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database with synthetic/demo data...');

  const hashedPassword = await bcrypt.hash('password123', 12);

  // Upsert Admin
  const admin = await prisma.user.upsert({
    where: { phoneNumber: '9999999999' },
    update: { passwordHash: hashedPassword, isActive: true },
    create: {
      phoneNumber: '9999999999',
      passwordHash: hashedPassword,
      role: Role.SYS_ADMIN,
    },
  });

  // Upsert Citizen
  const citizen = await prisma.user.upsert({
    where: { phoneNumber: '9876543210' },
    update: { passwordHash: hashedPassword, isActive: true },
    create: {
      phoneNumber: '9876543210',
      passwordHash: hashedPassword,
      role: Role.CITIZEN,
    },
  });

  // Upsert PLV
  const plv = await prisma.user.upsert({
    where: { phoneNumber: '8888888888' },
    update: { passwordHash: hashedPassword, isActive: true },
    create: {
      phoneNumber: '8888888888',
      passwordHash: hashedPassword,
      role: Role.PLV,
      districtId: 'chennai-01',
    },
  });

  console.log('Synthetic users created successfully.');
  console.log('Admin:', admin.phoneNumber);
  console.log('Citizen:', citizen.phoneNumber);
  console.log('PLV:', plv.phoneNumber);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
