import { PrismaClient, Prisma } from "@prisma/client";

import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

const userData: Prisma.UserCreateInput[] = [
  {
    name: "Alice",
    email: "alice@prisma.io",
    password: "alice123",
    expenses: {
      create: [
        {
          title: "Follow Prisma on Twitter",
          amount: 100,
          description: "https://www.twitter.com/prisma",
          paid: true,
          paymentMethod: "CASH",
        },
        {
          title: "Follow Prisma on LinkedIn",
          amount: 200,
          description: "https://www.linkedin.com/prisma",
          paid: false,
          note: "We are so happy that you are interested in Prisma!",
          date: new Date("2021-01-01"),
        },
      ],
    },
  },
  {
    name: "Bob",
    email: "bob@prisma.io",
    password: "bob123",
    expenses: {
      create: [
        {
          title: "Follow Prisma on Instagram",
          amount: 150,
          description: "https://www.instagram.com/prisma",
          paid: true,
          paymentMethod: "CARD",
        },
      ],
    },
  },
  {
    name: "Charlie",
    email: "charlie@prisma.io",
    password: "charlie123",
    expenses: {
      create: [
        {
          title: "Follow Prisma on Facebook",
          amount: 120,
          description: "https://www.facebook.com/prisma",
          paid: false,
          note: "We are so happy that you are interested in Prisma!",
          date: new Date("2021-02-01"),
        },
        {
          title: "Follow Prisma on YouTube",
          amount: 180,
          description: "https://www.youtube.com/prisma",
          paid: true,
          paymentMethod: "CARD",
        },
      ],
    },
  },
];

const userExpenseData: Prisma.ExpenseCreateManyInput[] = Array.from(
  { length: 100 },
  () => ({
    title: faker.lorem.words({ min: 1, max: 3 }),
    description: faker.lorem.sentence({ min: 1, max: 8 }),
    amount: Number(faker.finance.amount({ min: 10, max: 1000, dec: 0 })),
    paid: faker.helpers.maybe(faker.datatype.boolean, { probability: 0.4 }),
    paymentMethod: faker.helpers.maybe(
      () => faker.helpers.arrayElement(["CARD", "CASH", "TRANSFER", "OTHER"]),
      { probability: 0.4 },
    ),
    note: faker.helpers.maybe(faker.lorem.sentence, { probability: 0.4 }),
    date: faker.helpers.maybe(faker.date.recent, { probability: 0.4 }),
    category: faker.helpers.maybe(
      () =>
        faker.helpers.arrayElement([
          "FOOD",
          "TRANSPORT",
          "ENTERTAINMENT",
          "OTHER",
        ]),
      { probability: 0.4 },
    ),
    userId: faker.helpers.arrayElement([1, 2, 3]),
  }),
);
async function main() {
  console.log(`Start seeding ...`);
  const expenses = await prisma.expense.createMany({
    data: userExpenseData,
    skipDuplicates: true,
  });
  console.log(`Seeded ${expenses.count} expenses.`);
  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
