import { Search } from "@/components/training/search-training";
import SortTraining from "@/components/training/sort-training";
import { TrainingCard } from "@/components/training/training-card";
import { getTraining } from "@/data/training";

const HomePage = async () => {
  const trainings = await getTraining();

  return (
    <>
      <div className="mb-3 flex space-x-4">
        <Search />
        <SortTraining />
      </div>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {trainings && trainings.map((training) => (
          <TrainingCard 
            key={training.id} 
            title={training.title} 
            createdAt={training.createdAt} 
            createdBy={training.user.name} 
            difficulty={training.difficulty}
          /> 
        ))}
      </div>
    </>
  )
}

export default HomePage;