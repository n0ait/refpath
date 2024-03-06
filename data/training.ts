import { db } from "@/lib/db";
import { Difficulty } from "@prisma/client";
import { currentUser } from "@/lib/auth";

export const getTraining = async () => {
  try {
    const trainings = db.training.findMany({
      where: {isPublic: true},
      include: {
        user: {
          select: {
            name: true
          }
        }
      }
    })

    return trainings;
  } catch {
    return null;
  }
}

const TRAININGS_PER_PAGE = 9;
export const getTrainingWithSearch = async (searchText: string, currentPage: number, difficulty?: Difficulty[]) => {
  const offset = (currentPage - 1) * TRAININGS_PER_PAGE;

  try {
    const trainings = await db.training.findMany({
      where: {
        isPublic: true,
        OR: [
          {
            title: {
              contains: searchText,
            },
          },
          {
            user: {
              name: {
                contains: searchText,
              },
            },
          },
        ],
        difficulty: {
          in: difficulty
        }
      },
      include: {
        user: {
          select: {
            name: true
          }
        },
        questions: {
          select: {
            questionId: true
          }
        }
      },
      take: TRAININGS_PER_PAGE,
      skip: offset,
    });

    return trainings;
  } catch (error) {
    return null;
  }
}

// Ajouter un mode entrainement et un mode examen !
export const getTrainingById = async (trainingId: string) => {
  try{
    const training = await db.trainingUser.findUnique({
      where: {
        id: trainingId
      },
      include: {
        training: {
          include : {
            questions: {
              select: {
                question: {
                  select: {
                    id: true,
                    question: true,
                    options: true,
                  }
                },
              },
              where: {
                isCorrect: null
              }
            }
          }
        }
      }
    });

    return training;
  } catch {
    return null;
  }
}

export const getLastTrainingUser = async () => {
  
  const user = await currentUser();
  if (!user) return null;

  try {
    const trainingUser = await db.trainingUser.findMany({
      where: {
        userId: user.id
      },
      include: {
        training: {
          select: {
            difficulty: true,
            title: true
          }
        }
      }
    })

    return trainingUser;
  } catch {
    return null;
  }
};
