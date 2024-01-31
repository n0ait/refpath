"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter
} from "@/components/ui/card";
import { CalendarIcon } from "@radix-ui/react-icons";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface TrainingCardProps {

  title: string | null
  difficulty?: "easy" | "medium" | "hard"
  createdBy: string | null
  createdAt: Date
}

export const TrainingCard = (
  {
    title,
    difficulty,
    createdBy,
    createdAt
  }: TrainingCardProps
) => {
  return (
    <Card className={cn("shadow-none border duration-300 hover:border-black dark:hover:border-white cursor-pointer")}>
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
      </CardFooter>
    </Card>
  )
} 