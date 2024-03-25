import Link from "next/link"
import {
  Menu,
  Dribbble,
  Search,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { UserNav } from "@/components/dashboard/nav/user-nav"

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <Link
            href="#"
            className="flex items-center gap-2 text-lg font-semibold md:text-base"
          >
            <Dribbble className="h-6 w-6" />
            <span className="sr-only">Refpath</span>
          </Link>
          <Link
            href="/home"
            className="text-foreground transition-colors hover:text-foreground"
          >
            Accueil
          </Link>
          <Link
            href="/training"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            QCM
          </Link>
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="shrink-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Ouvrir le menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="grid gap-6 text-lg font-medium">
              <Link
                href="#"
                className="flex items-center gap-2 text-lg font-semibold"
              >
                <Dribbble className="h-6 w-6" />
                <span className="sr-only">Refpath</span>
              </Link>
              <Link href="/home" className="hover:text-foreground">
                Accueil
              </Link>
              <Link
                href="/training"
                className="text-muted-foreground hover:text-foreground"
              >
                QCM
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <div className="ml-auto">
            <UserNav />
          </div>
        </div>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      {children}
      </main>
    </div>
  )
}