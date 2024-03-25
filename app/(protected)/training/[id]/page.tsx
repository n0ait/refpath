import MainWrapper from "@/components/main-wrapper";
import PlayTraining from "@/components/training/play-training";
import { TrainingEnded } from "@/components/training/training-ended";
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


  if(trainingUser.isComplete) {
    return (
      <MainWrapper>
        <TrainingEnded
          now={trainingUser.completedAt || new Date()}
          createdAt={trainingUser.createdAt}
          id={trainingUser.id}
        />
      </MainWrapper>
    )
  }

  return (
    <MainWrapper>
      <PlayTraining 
        training={training}
        trainindUserId={trainingUser.id}
      />
    </MainWrapper>
  )
}

export default TrainingById;