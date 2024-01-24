import { getTrainingById } from "@/data/training";

interface TrainingByIdProps {
  params: {
    id: string
  }
}

const TrainingById = async ({ 
  params 
}: TrainingByIdProps) => {

  const training = await getTrainingById(params.id);

  return (
    <p>
      {params.id} 
      <br/>
      {JSON.stringify(training)}
    </p>
  )
}

export default TrainingById;