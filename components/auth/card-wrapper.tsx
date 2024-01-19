"use client";

import { 
  Card,
  CardContent,
  CardFooter,
  CardHeader
} from "@/components/ui/card";
import { Header } from "@/components/auth/header";
import { Social } from "@/components/auth/social";
import { Legals } from "@/components/auth/legals";
import { BackButton } from "@/components/auth/back-button";

interface CardWrapperProps {
  children: React.ReactNode;
  headerTitle: string;
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
  showSocial?: boolean;
  showLegals?: boolean;
};

export const CardWrapper = ({
  children,
  headerLabel,
  headerTitle,
  backButtonLabel,
  backButtonHref,
  showSocial,
  showLegals
}: CardWrapperProps) => {
  return (
    <Card className="w-[400px] shadow-none border-none">
      <BackButton label={backButtonLabel} href={backButtonHref} />
      
      <CardHeader>
        <Header title={headerTitle} label={headerLabel} />
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
      <CardFooter className="flex-col space-y-4">
          {showSocial && (
            <Social />
          )}
          {showLegals && (
            <Legals />
          )}
        </CardFooter>
    </Card>
  );
};