import { prisma } from '../lib/prisma.js';

async function main() {
  console.log("Seeding villages only...");
      const vill = await prisma.village.create({
        data: {
    village_name: "سرمين",
    city_id: 1
  }
        })
        console.log(vill)
      };

      main()