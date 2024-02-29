import MainWrapper from "@/components/main-wrapper"
import { PageHeader } from "@/components/page-header";
import { StartTrainingButton } from "@/components/training/random-training/start-training-button";
import { LastTrainings } from "./_components/last-trainings";
import { Suspense } from "react";
import TrainingLoading from "../home/_components/training-loading";


const PageTraining = async () => {
  return (
    <>
      <PageHeader title="Entraînement" />
      <MainWrapper>
        <StartTrainingButton
          variant="default"
          label="Commencer un QCM"
          title="QCM Aléatoire"
          description={`
            Une série de 20 questions aléatoires. 
            Vous avez également le résultats avec une explication détaillée à la fin de chaque question. 
            Bon entraînement !
          `}
        />
        <h1 className="text-lg font-medium mt-8 mb-2">Vos derniers entraînements :</h1>
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <Suspense fallback={<TrainingLoading/>}>
            <LastTrainings />
          </Suspense>
        </div>
      </MainWrapper>
    </>
  )
}

export default PageTraining;
