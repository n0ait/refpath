import React from 'react';
import { 
  Drawer, 
  DrawerClose, 
  DrawerContent, 
  DrawerDescription, 
  DrawerFooter, 
  DrawerHeader, 
  DrawerTitle } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";

interface feedbackDrawerProps {
  isOpen: boolean
  feedbackMessage: any
  onNextQuestion: any
}

const TrainingFeedbackDrawer = ({ 
  isOpen, 
  feedbackMessage, 
  onNextQuestion 
}: feedbackDrawerProps) => {
  const [open, setOpen] = React.useState(isOpen);

  return (
    <Drawer open={isOpen} onOpenChange={setOpen}>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Feedback</DrawerTitle>
            <DrawerDescription>{feedbackMessage.correct ? 'Correct!' : 'Incorrect!'}</DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0">
            <p>{feedbackMessage.explanation}</p>
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button onClick={onNextQuestion}>
                Question suivante
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default TrainingFeedbackDrawer;