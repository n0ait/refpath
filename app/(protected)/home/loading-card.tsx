import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter
} from "@/components/ui/card";

const LoadingCard = () => {
  return (
    <Card className="w-full shadow-none border">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>
              <Skeleton className="h-4 w-[140px]" />
            </CardTitle>
            <CardDescription>
              <Skeleton className="h-4 mt-2 w-[100px]" />
            </CardDescription>
          </div>
          <Skeleton className="h-4 mb-4 w-[40px]" />
        </div>
      </CardHeader>
      <CardFooter>
        <div className="flex items-center text-muted-foreground text-sm space-x-1">
          <Skeleton className="h-4 w-[20px]" /> 
          <Skeleton className="h-4 w-[80px]" />
        </div>
      </CardFooter>
    </Card>
  )
}

export default LoadingCard;