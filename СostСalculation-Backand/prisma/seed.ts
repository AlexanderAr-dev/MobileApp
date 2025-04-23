import {PrismaClient} from "../generated/prisma";

const prisma = new PrismaClient();

async function seed() {
    const january = await prisma.month.create({
        data: {
            nameMonth: "January",
            budgetMonth: 50000,
            sumOnDay: 1600,
            spent: 12500,
            days: {
                create: [
                    {
                        date: "2025-01-01",
                        incomeSum: 2500,
                        expenseSum: 500,
                        expenses: {
                            create: [
                                {
                                    time: "12:00",
                                    category: "Food",
                                    description: "Lunch at cafe",
                                    cost: 300,
                                    location: "Downtown",
                                    affect: true,
                                },
                                {
                                    time: "18:00",
                                    category: "Transport",
                                    description: "Bus ride",
                                    cost: 200,
                                    location: "Station",
                                    affect: true,
                                },
                            ],
                        },
                    },
                ],
            },
        },
    });

    console.log("Seeded month:", january.nameMonth);
}

seed()
    .then(() => prisma.$disconnect())
    .catch((e) => {
        console.error(e);
        prisma.$disconnect();
        process.exit(1);
    });
