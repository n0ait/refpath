import { getTrainingWithSearch } from "@/data/training";
import { TrainingCard } from '@/components/training/training-card';

export default async function TrainingList({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const trainings = await getTrainingWithSearch(query, currentPage);

  return (
    <>
      {trainings?.map((training) => (
        <TrainingCard 
          key={training.id} 
          title={training.title} 
          createdAt={training.createdAt} 
          createdBy={training.user.name} 
          difficulty={training.difficulty}
        /> 
      ))}
    </>
  );
}