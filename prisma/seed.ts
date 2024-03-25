import { PrismaClient } from "@prisma/client";
import { readFile } from 'fs/promises';

const prisma = new PrismaClient();

async function main() {
  await prisma.trainingUser.deleteMany();
  await prisma.trainingQuestion.deleteMany();
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

  // Création des questions et propositions depuis l'ancienne bdd de refpath...
  const questionData = JSON.parse(await readFile('prisma/question.json', 'utf-8'));
  const propositionData = JSON.parse(await readFile('prisma/question_propositions.json', 'utf-8')) as Proposition[];


  for (const question of questionData) {
    const options = [];
    const answer = [];

    const propositions = propositionData.filter(prop => prop.question_id === question.id);
    
    for (const prop of propositions) {
      options.push(prop.choice);
      if (prop.is_answer === '1') {
        answer.push(prop.choice);
      }
    }

    await prisma.question.create({
      data: {
        question: question.question_text,
        options: options,
        answer: answer,
        feedback: question.feedback,
      }
    });
  }
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });


interface Proposition {
  id: string;
  question_id: string;
  choice: string;
  value: string;
  is_answer: string;
}
