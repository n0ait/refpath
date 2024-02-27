import MainWrapper from "@/components/main-wrapper"
import { PageHeader } from "@/components/page-header";
import { StartTrainingButton } from "@/components/training/start-training-button";


const PageTraining = () => {
  return (
    <>
      <PageHeader title="Entraînement" />
      <MainWrapper>
        <StartTrainingButton
          variant="default"
          label="Commencer un QCM"
          title="QCM Aléatoire"
          trainingId="test"
          description={`Une série de 20 questions aléatoires. Vous avez également le résultats avec une explication détaillée à la fin de chaque question. Bon entraînement !`}
        />
      </MainWrapper>
    </>
  )
}

export default PageTraining;