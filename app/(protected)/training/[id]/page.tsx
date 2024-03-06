import MainWrapper from "@/components/main-wrapper";
import PlayTraining from "@/components/training/play-training";
import { getTrainingById } from "@/data/training";
import { redirect } from "next/navigation";

interface TrainingByIdProps {
  params: {
    id: string
  }
}

const TrainingById = async ({ 
  params 
}: TrainingByIdProps) => {

  const trainingUser = await getTrainingById(params.id);
  if(!trainingUser) return redirect("/home");

  const training = trainingUser.training;

  return (
    <MainWrapper>
      <PlayTraining training={training} />
    </MainWrapper>
  )
}

export default TrainingById;