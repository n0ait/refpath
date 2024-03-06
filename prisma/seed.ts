import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.trainingUser.deleteMany();
  await prisma.question.deleteMany();
  await prisma.training.deleteMany();
  await prisma.user.deleteMany();

  console.log(`Création du jeu de donnée...`);

  const user1 = await prisma.user.create({
    data: {
      email: 'dubosqnoe@gmail.com',
      name: 'Noé DUBOSQ',
      password: '$2b$10$EpRnTzVlqHNP0.fUbXUwSOyuiXe/QLSUG6xNekdHgTGmrpHEfIoxm', // secret42
      role: 'USER',
      emailVerified: '2024-02-27T10:34:29.908Z'
    },
  });

  const training1 = await prisma.training.create({
    data: {
      title: 'Les FAS',
      difficulty: 'easy',
      createdBy: user1.id,
      isPublic: true
    }
  })

  const training2 = await prisma.training.create({
    data: {
      title: 'Les différentes règles de temps',
      difficulty: 'medium',
      createdBy: user1.id,
      isPublic: true
    }
  })

  const training3 = await prisma.training.create({
    data: {
      title: 'FOAS',
      difficulty: 'hard',
      createdBy: user1.id,
      isPublic: true
    }
  })

  const training4 = await prisma.training.create({
    data: {
      title: "Gestion de l'erreur",
      difficulty: 'hard',
      createdBy: user1.id,
      isPublic: true
    }
  })

  const question1 = await prisma.question.create({
    data: {
      question: "VRAI / FAUX",
      options: ["VRAI", "FAUX"],
      answer: ["VRAI"]
    }
  })

  const question2 = await prisma.question.create({
    data: {
      question: "A / B / C / D / E",
      options: ["A", "B", "C", "D", "E"],
      answer: ["A", "D", "E"]
    }
  })
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
