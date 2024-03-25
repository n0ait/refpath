"use server";

import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";
import { Question } from "@prisma/client";

const QUESTION_COUNT = 9;

const startRandomTraining = async () => {
  const user = await currentUser();

  if(!user) {
    return null;
  }

  // Fetching random question
  const questionsCount = await db.question.count();
  let randomQuestions: Question[] = [];

  while (randomQuestions.length < QUESTION_COUNT) {
    const skip = Math.floor(Math.random() * questionsCount);
    const questions = await db.question.findMany({
      take: QUESTION_COUNT - randomQuestions.length,
      skip,
    });
    // Filter out duplicates (chatgpt)
    const uniqueQuestions = questions.filter(q => !randomQuestions.find(rq => rq.id === q.id));
    randomQuestions = [...randomQuestions, ...uniqueQuestions].slice(0, QUESTION_COUNT);
  }

  // Create then new training
  const newTraining = await db.training.create({
    data: {
      title: 'QCM aléatoire',
      createdBy: user.id,
      isPublic: false,
      difficulty: 'easy',
      questions: {
        create: randomQuestions.map(q => ({
          questionId: q.id
        })),
      },
    },
  });

  return newTraining.id;
};

export default startRandomTraining;
