"use client";

import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import { StartTrainingDialog } from "./start-training";

interface StartTrainingButtonProps {
  label: string
  variant: "ghost" | "default"
  trainingId: string
  title: string
  description: string
}

export const StartTrainingButton = ({
  label, 
  variant,
  trainingId,
  title,
  description,
} : StartTrainingButtonProps
) => {
  return (
    <StartTrainingDialog
      title={title}
      trainingId={trainingId}
      description={description}
    >
      <Button
        variant={variant}
        size="sm"
      >
        {label}
        <ArrowRight className="ml-2 h-4 w-4"/>
      </Button>
    </StartTrainingDialog>
    
  )
}