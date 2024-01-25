import MainWrapper from "@/components/main-wrapper";
import QuestionCard from "@/components/training/questions-card";
import { getTrainingById } from "@/data/training";
import { Suspense } from "react";

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

  return (
    <MainWrapper>
      <>
        {training.questions.map((question, i) => (
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