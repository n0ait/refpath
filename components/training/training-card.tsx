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

interface TrainingCardProps {
  title: string
  image?: string
  difficulty?: "easy" | "medium" | "hard"
  level?: string
  createdBy: string
  createdAt: string
}

export const TrainingCard = (
  {
    title,
    image,
    difficulty,
    level,
    createdBy,
    createdAt
  }: TrainingCardProps
) => {
  return (
    <Card className="shadow-none border hover:border-black dark:hover:border-white cursor-pointer">
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
      <CardFooter>
        <div className="flex items-center text-muted-foreground text-sm space-x-1">
          <CalendarIcon /> 
          <p>{createdAt}</p>
        </div>
      </CardFooter>
    </Card>
  )
} 