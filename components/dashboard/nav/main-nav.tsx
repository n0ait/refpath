'use client';

import Link from "next/link";
import clsx from 'clsx';

import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();

  const links = [
    {
      label: "Accueil",
      href: "/societe"
    }
  ]

  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      {links.map((link) => {
        return (
          <Link
          key={link.label}
          href={link.href}
          className={clsx(
            'text-sm transition-colors hover:text-primary',
            {
              'font-medium': pathname === link.href,
            },
          )}
        >
          {link.label}
        </Link>
        )
      })}
    </nav>
  )
}