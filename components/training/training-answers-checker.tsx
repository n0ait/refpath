import React from "react";
import { Card } from "@/components/ui/card";
import {
  X,
  Check
} from "lucide-react";
import { Separator } from "@radix-ui/react-separator";

type Props = {
  correct_answers: number;
  wrong_answers: number;
};

const TrainingAnswerChecker = ({ correct_answers, wrong_answers }: Props) => {
  return (
    <Card className="flex flex-row items-center justify-center p-2 shadow-none border-none">
      <Check color="green" size={25} />
      <span className="mx-3 font-medium text-xl text-[green]">{correct_answers}</span>

      <Separator orientation="vertical" />

      <span className="mx-3 font-medium text-xl text-[red]">{wrong_answers}</span>
      <X color="red" size={25} />
    </Card>
  );
};

export default TrainingAnswerChecker;