"use client";

import * as React from "react";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Difficulty } from "@prisma/client";
import { ChevronDownIcon, DotFilledIcon } from "@radix-ui/react-icons";

type Checked = DropdownMenuCheckboxItemProps["checked"];

const SortTraining = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const initialDifficulties = searchParams.getAll('difficulty');
  const [selectedDifficulties, setSelectedDifficulties] = React.useState<Record<string, Checked>>(
    initialDifficulties.reduce((acc, difficulty) => ({ ...acc, [difficulty]: true }), {})
  );

  const handleSorting = (difficulty: string) => {
    setSelectedDifficulties(prev => {
      const updated = { ...prev, [difficulty]: !prev[difficulty] };
      const selected = Object.keys(updated).filter(d => updated[d]);

      const params = new URLSearchParams();

      if(difficulty) {
        selected.forEach(d => params.append('difficulty', d));
      } else {
        params.delete('difficulty')
      }

      const queryParam = searchParams.get('query');
      if (queryParam) {
        params.set('query', queryParam);
      }
      

      replace(`${pathname}?${params.toString()}`);
      return updated;
    });
  };

  const difficulties = Object.keys(Difficulty);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          Difficulté
          <ChevronDownIcon className="ml-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        {difficulties.map((difficulty) => (
          <DropdownMenuCheckboxItem
            className="cursor-pointer"
            key={difficulty}
            checked={selectedDifficulties[difficulty] || false}
            onCheckedChange={() => handleSorting(difficulty)}
          >
              {difficulty == "easy" && (
                <div className="flex items-center">
                  <DotFilledIcon color="hsl(var(--easy))" className="mr-2 w-6 h-6"/>
                  Facile
                </div>
              )}

              {difficulty == "medium" && (
                <div className="flex items-center">
                  <DotFilledIcon color="hsl(var(--medium))" className="mr-2 w-6 h-6"/>
                  Moyen
                </div>
              )}

              {difficulty == "hard" && (
                <div className="flex items-center">
                  <DotFilledIcon color="hsl(var(--hard)" className="mr-2 w-6 h-6"/>
                  Difficile
                </div>
              )}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SortTraining;
