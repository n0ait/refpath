import SearchTraining from "@/components/training/list-training/search-training";
import SortTraining from "@/components/training/list-training/sort-training";
import { Suspense } from "react";
import TrainingList from "./_components/trainings-list";
import TrainingLoading from "./_components/training-loading";
import { Difficulty } from "@prisma/client";

interface HomePageSearchProps {
  searchParams?: {
    query?: string;
    page?: string;
    difficulty?: Difficulty[];
  }
}

const HomePage = async (
  {
    searchParams,
  }: HomePageSearchProps
) => {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const difficulty = searchParams?.difficulty;

  return (
    <>
      <div className="mb-3 flex space-x-4">
        <SearchTraining placeholder="Rechercher un entrainement..." />
        <SortTraining />
      </div>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <Suspense key={query + currentPage} fallback={<TrainingLoading/>}>
          <TrainingList query={query} currentPage={currentPage} difficulty={difficulty}/>
        </Suspense>
      </div>
    </>
  )
}

export default HomePage;