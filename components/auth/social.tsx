"use client";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";


export const Social = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  const providerSignIn = (provider: "google" | "apple") => {
    signIn(provider, {
      callbackUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT
    })
  }

  return (
    <div className="w-full flex flex-col space-y-4">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Ou continuer avec
          </span>
        </div>
      </div>
      <div className="flex items-center w-full gap-x-2">
        <Button
          size="lg"
          className="w-full"
          variant="outline"
          onClick={() => providerSignIn("apple")}
        >
          <Icons.apple className="h-5 w-5 mr-2" />
          Apple
        </Button>
        <Button
          size="lg"
          className="w-full"
          variant="outline"
          onClick={() => providerSignIn("google")}
        >
          <Icons.google className="h-5 w-5 mr-2" />
          Google
        </Button>
      </div>
    </div>
  );
};