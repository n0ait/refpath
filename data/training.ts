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

export const getTrainingWithSearch = async (searchText: string) => {
  try {
    const trainings = db.training.findMany({
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
      }
    })

    return trainings;
  } catch {
    return null;
  }
}