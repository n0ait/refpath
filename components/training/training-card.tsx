"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter
} from "@/components/ui/card";
import { CalendarIcon } from "@radix-ui/react-icons";
import { Badge } from "@/components/ui/badge";

interface TrainingCardProps {
  title: string
  image?: string
  difficulty?: number
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
    <Card className="w-1/3 shadow-none border hover:border-black dark:hover:border-white cursor-pointer">
      <CardHeader>
        <div className="flex justify-between">
          <CardTitle>{title}</CardTitle>
          <Badge variant="easy">Facile</Badge>
        </div>
        <CardDescription>Crée par {createdBy}</CardDescription>
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