import { db } from "@/lib/db";
import { Difficulty } from "@prisma/client";

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
              include: {
                question: {
                  include: {
                    propositions: {
                      select: {
                        id: true,
                        name: true,
                      }
                    }
                  }
                }
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
