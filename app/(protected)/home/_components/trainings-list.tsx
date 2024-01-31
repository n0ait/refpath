import { getTrainingWithSearch } from "@/data/training";
import { TrainingCard } from '@/components/training/training-card';
import { Difficulty } from "@prisma/client";
import { StartTrainingDialog } from "@/components/training/start-training";

export default async function TrainingList({
  query,
  currentPage,
  difficulty
}: {
  query: string;
  currentPage: number;
  difficulty?: Difficulty[]
}) {
  const trainings = await getTrainingWithSearch(query, currentPage, difficulty);

  return (
    <>
      {trainings?.map((training) => (
        <StartTrainingDialog
          key={training.id}
          trainingId={training.id}
          title={`${training.title}`}
          description={`Voici un quizz de ${training.questions.length} questions. \n Bonne chance !`}
        >
          <TrainingCard 
            key={training.id}
            title={training.title} 
            createdAt={training.createdAt} 
            createdBy={training.user.name} 
            difficulty={training.difficulty}
          /> 
        </StartTrainingDialog>
      ))}
    </>
  );
}