"use client";

import { differenceInSeconds } from "date-fns";
import { buttonVariants } from "@/components/ui/button";
import { BarChart } from "lucide-react";
import Link from "next/link";
import { cn, formatTimeDelta } from "@/lib/utils";

interface TrainingEndedProps {
  now: Date;
  createdAt: Date;
  id: string;
}

export const TrainingEnded = ({
  now,
  createdAt,
  id,
}: TrainingEndedProps) => {
  return (
      <div className="absolute flex flex-col justify-center -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
        <h1 className="text-2xl font-medium text-center mb-2">Félicitations !</h1>
        <h2 className="text-lg font-medium text-center mb-4">Vous avez complété le QCM en {formatTimeDelta(differenceInSeconds(now, createdAt))}</h2>
        <Link
          href={`/statistics/${id}`}
          className={cn(buttonVariants({ size: "lg" }), "mt-2")}
        >
          Voir les résultats
          <BarChart className="w-4 h-4 ml-2" />
        </Link>
      </div>
  );
}