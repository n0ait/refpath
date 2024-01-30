"use client";

import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter
} from "@/components/ui/card";
import { ArrowRightIcon, CalendarIcon } from "@radix-ui/react-icons";
import { Badge } from "@/components/ui/badge";
import { useAction } from "@/hooks/use-action";
import { startTraining } from "@/actions/start-training";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

interface TrainingCardProps {
  trainingId: string
  title: string | null
  difficulty?: "easy" | "medium" | "hard"
  createdBy: string | null
  createdAt: Date
}

export const TrainingCard = (
  {
    trainingId,
    title,
    difficulty,
    createdBy,
    createdAt
  }: TrainingCardProps
) => {
  const router = useRouter();
  
  const { execute, isLoading } = useAction(startTraining, {
    onError: (error) => {
      toast.error(error);
    },
    onSuccess: (data) => {
      toast.error(`Début de l'entrainement...`);
      const trainingUserId = data.id;
      router.push(`training/${trainingUserId}`);
    }
  });

  const onStart = () => {
    execute({ trainingId });
  };

  return (

    <Card 
      className={cn("shadow-none border duration-300 hover:border-black dark:hover:border-white cursor-pointer")}
    >
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>{title}</CardTitle>
            <CardDescription>Crée par {createdBy}</CardDescription>
          </div>
          {difficulty && (
            <Badge variant={difficulty}>
              {difficulty == "easy" && (
                <span>Facile</span>
              )}

              {difficulty == "medium" && (
                <span>Moyen</span>
              )}

              {difficulty == "hard" && (
                <span>Difficile</span>
              )}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardFooter className="flex justify-between items-center">
        <div className="flex items-center text-muted-foreground text-sm space-x-1">
          <CalendarIcon /> 
          <p>{createdAt.toLocaleDateString('fr-FR')}</p>
        </div>
        <Button variant={"ghost"} onClick={onStart}>
          <ArrowRightIcon />
        </Button>
      </CardFooter>
    </Card>
  )
} 