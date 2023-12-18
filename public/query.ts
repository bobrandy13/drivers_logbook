import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.driver.create({
    data: {
      driver_name: "Kevin Huang",
      driver_age: 24,
    },
  });
}

export default async function createData() {
  await prisma.driver.create({
    data: {
      driver_name: "Kevin Huang",
      driver_age: 24,
    },
  });
  console.log("data sucessfully created");
  return "data created";
}

main()
  .catch(async (e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect;
  });
