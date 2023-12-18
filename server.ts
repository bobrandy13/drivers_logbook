import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const post = await prisma.driver.create({
    data: {
      driver_name: "Kevin Huang",
      driver_age: 24,
    },
  });
  console.log(post);
}

main();
