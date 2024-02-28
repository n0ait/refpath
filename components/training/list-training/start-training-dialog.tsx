"use client";

import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { useAction } from "@/hooks/use-action";
import { startTraining } from "@/actions/start-training";
import { Button } from "@/components/ui/button";
import { SymbolIcon } from "@radix-ui/react-icons";

interface StartTrainingProps {
  children: React.ReactNode,
  trainingId: string,
  title: string,
  description: string
}

export const StartTrainingDialog = (
  {
    children,
    trainingId,
    title,
    description,
    ...props 
  }: StartTrainingProps
) => {
  const router = useRouter();
  
  const onStart = () => {
    execute({ trainingId });
  };

  const { execute, isLoading } = useAction(startTraining, {
    onError: (error) => {
      toast.error(error);
    },
    onSuccess: (training) => {
      router.push(`/training/${training.id}`)
      toast.success(`Début de l'entrainement...`);
    }
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
          <div {...props}>
            {children}
          </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            {description}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button 
            onClick={onStart}
            disabled={isLoading}
            type="submit"
            className="mt-4"
          >
            {isLoading && (
              <SymbolIcon className="mr-2 h-4 w-4 animate-spin" />
            )}
            Commencer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
} 