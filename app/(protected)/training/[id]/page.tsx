import MainWrapper from "@/components/main-wrapper";
import QuestionCard from "@/components/training/questions-card";
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

  if(!training) {
    return (
      <p>
        Pas de questions :
      </p>
    )
  }

  const trainingUser = training.training;

  return (
    <MainWrapper>
      <>
        {trainingUser.questions.map((question, i) => (
          <QuestionCard
            key={question.questionId}
            id={question.question.id}
            name={question.question.name}
            questionNumber={i + 1}
            propositions={question.question.propositions}
          />
        ))}
      </>
    </MainWrapper>
  )
}

export default TrainingById;