import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.trainingUser.deleteMany();
  await prisma.proposition.deleteMany();
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

  console.log({ user1 });

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

  console.log({training1, training2, training3, training4})

  const question1 = await prisma.question.create({
    data: {
      name: "Question 1 - Choix multiples",
      propositions: {
        createMany: {
          data: [
            {
              name: "A - Réponse A",
              isAnswer: true,
            },
            {
              name: "B - Réponse B",
              isAnswer: true,
            },
            {
              name: "C - Réponse C",
              isAnswer: false,
            }
          ],
        }
      }
    }
  })

  const question2 = await prisma.question.create({
    data: {
      name: "Question 2 - Vrai / Faux",
      propositions: {
        createMany: {
          data: [
            {
              name: "A - Vrai",
              isAnswer: true,
            },
            {
              name: "B - Faux",
              isAnswer: false,
            }
          ],
        }
      }
    }
  })

  const question3 = await prisma.question.create({
    data: {
      name: "Question 3 - Oui / Non",
      propositions: {
        createMany: {
          data: [
            {
              name: "A - Oui",
              isAnswer: false,
            },
            {
              name: "B - Non",
              isAnswer: true,
            }
          ],
        }
      }
    }
  })

  console.log({question1, question2, question3})
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
