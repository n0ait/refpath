"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { Societe } from "@prisma/client";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { updateLastSociete } from "@/actions/societe";

interface SocietesSwitcherProps{
  societes: Societe[],
  last?: String
}

export default function TeamSwitcher({
    societes,
    last
  }: SocietesSwitcherProps
) {

  const [open, setOpen] = React.useState(false)

  const [selectedSociete, setSelectedSociete] = React.useState<Societe>(
    societes[0]
  )

  return (
    <Popover open={open} onOpenChange={setOpen}>
    <PopoverTrigger asChild>
      <Button
        variant="ghost"
        size="sm"
        role="combobox"
        aria-expanded={open}
        aria-label="Selectioner une société"
        className={cn("w-[200px] justify-between")}
      >
        <Avatar className="mr-2 h-5 w-5">
          <AvatarImage
            src={`https://avatar.vercel.sh/${selectedSociete?.id}.png`}
            alt={selectedSociete?.name}
          />
          <AvatarFallback>SC</AvatarFallback>

        </Avatar>
        {selectedSociete?.name || "Aucune société."}
        <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
      </Button>
    </PopoverTrigger>
    <PopoverContent className="w-[200px] p-0">
      <Command>
        <CommandList>
          <CommandInput placeholder="Une société..." />
          <CommandEmpty>Aucun résultat.</CommandEmpty>
          <CommandGroup heading="Sociétés">
            {societes.map((societe) => (
              <Link 
                key={societe.id} 
                href={`/societe/${societe.id}`}
                className="cursor-pointer"
              >
              <CommandItem
                key={societe.id}
                onSelect={() => {
                  setSelectedSociete(societe)
                  setOpen(false)
                  updateLastSociete(societe.id)
                }}
                className="text-sm"
              >
                <Avatar className="mr-2 h-5 w-5">
                  <AvatarImage
                    src={`https://avatar.vercel.sh/${societe.id}.png`}
                    alt={societe.name}
                  />
                  <AvatarFallback>{societe.name.slice(0, 1)}</AvatarFallback>
                </Avatar>
                {societe.name}
                <Check
                  className={cn(
                    "ml-auto h-4 w-4",
                    selectedSociete.name === societe.name
                      ? "opacity-100"
                      : "opacity-0"
                  )}
                />
              </CommandItem>
              </Link>
            ))}
          </CommandGroup>
        </CommandList>
      </Command>
    </PopoverContent>
  </Popover>
  )
}