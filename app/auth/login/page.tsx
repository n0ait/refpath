import { Metadata } from "next";
import { LoginForm } from "@/components/auth/login-form";
import Link from "next/link"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"

export const metadata: Metadata = {
  title: "Connexion",
  description: "Se connecter à Refpath.",
}

const LoginPage = () => {
  return (
    <div>
      <Link
        href="/"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute left-4 top-4 md:left-8 md:top-8"
        )}
      >
        <>
          <Icons.chevronLeft className="mr-2 h-4 w-4" />
          Retour
        </>
      </Link>

      <LoginForm />
    </div>
  )
}

export default LoginPage;