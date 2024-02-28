import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import { StartTrainingDialog } from "./start-training";
import startRandomTraining from "@/actions/start-random-training";

interface StartTrainingButtonProps {
  label: string
  variant: "ghost" | "default"
  title: string
  description: string
}

export const StartTrainingButton = async ({
  label, 
  variant,
  title,
  description,
} : StartTrainingButtonProps
) => {

  const randomTrainingId = await startRandomTraining();
  if(!randomTrainingId) {
    return null;
  }
  
  return (
    <StartTrainingDialog
      title={title}
      trainingId={randomTrainingId}
      description={description}
    >
      <Button
        variant={variant}
        size="sm"
        className="mb-2"
      >
        {label}
        <ArrowRight className="ml-2 h-4 w-4"/>
      </Button>
    </StartTrainingDialog>
    
  )
}