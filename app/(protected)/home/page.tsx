import { Search } from "@/components/training/search-training";
import SortTraining from "@/components/training/sort-training";
import { TrainingCard } from "@/components/training/training-card";

const HomePage = () => {
  return (
    <>
      <div className="mb-3 flex space-x-4">
        <Search />
        <SortTraining />
      </div>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <TrainingCard title="Les violations" createdAt="22/01/2024" createdBy="Noé" difficulty="medium"/>
        <TrainingCard title="Les fautes" createdAt="28/01/2024" createdBy="Noé" difficulty="easy" />
        <TrainingCard title="Gestion du temps" createdAt="31/01/2024" createdBy="Noé" difficulty="hard"/>
      </div>
    </>
  )
}

export default HomePage;