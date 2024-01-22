import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Button } from "@/components/ui/button";
import { ChevronDownIcon } from "@radix-ui/react-icons";


const SortTraining = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="whitespace-nowrap" variant="outline">
          Trier par
          <ChevronDownIcon className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuItem>Date</DropdownMenuItem>
          <DropdownMenuItem>Difficulté</DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default SortTraining;