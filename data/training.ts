import { db } from "@/lib/db";

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

const TRAININGS_PER_PAGE = 6;
export const getTrainingWithSearch = async (searchText: string, currentPage: number) => {
  const offset = (currentPage - 1) * TRAININGS_PER_PAGE;

  try {
    const trainings = await db.training.findMany({
      where: {
        isPublic: true,
        title: {
          contains: searchText,
        }
      },
      include: {
        user: {
          select: {
            name: true
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
    const training = await db.training.findUnique({
      where: {
        id: trainingId
      },
      include: {
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
    });

    return training;
  } catch {
    return null;
  }
}
