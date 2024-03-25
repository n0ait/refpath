import { getLastTrainingUser } from "@/data/training"
import { LastTrainingCard } from "./last-training-card";

export const LastTrainings =  async () => {

  const trainingUser = await getLastTrainingUser();

  if(!trainingUser) {
    return (
      <p>{`Vous n'avez encore fait aucun entraînement...`}</p>
    )
  }

  return (
    <>
      {trainingUser.map((trainingUser) => (
        <LastTrainingCard 
          key={trainingUser.id}
          createdAt={trainingUser.createdAt}
          isComplete={trainingUser.isComplete}
          title={trainingUser.training.title}
          difficulty={trainingUser.training.difficulty}
          finalGrade={trainingUser.finalGrade}
          totalQuestions={trainingUser.training.questions.length}
        />
    ))}
    </>
  )
}