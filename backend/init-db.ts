// Execute: npx ts-node init-db.ts

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const main = async () => {
    const plant = await prisma.plant.createMany({
        data: [
            { name: 'bloempje', description: 'Heel mooie bloem.' },
            { name: 'tulp', description: 'Hele tulp' },
            { name: 'roos', description: 'Hele roos' },
            { name: 'tulpen', description: 'Hele tulpen' },
            { name: 'rozen', description: 'Hele rozen' },
            { name: 'bloemen', description: 'Hele bloemen' },
            { name: 'bloem', description: 'Hele bloem' },
        ],
    });
    console.log(plant);
};

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
