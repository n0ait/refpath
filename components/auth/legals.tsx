"use client";

import Link from "next/link";

export const Legals = () => {
  return(
      <p className="text-center text-sm text-muted-foreground">
        En continuant, vous acceptez{" "}
          <Link
            href="/terms"
            className="underline underline-offset-4 hover:text-primary"
          >
            Nos termes d&apos;utilisation
          </Link>{" "}
            ainsi que{" "}
          <Link
            href="/privacy"
            className="underline underline-offset-4 hover:text-primary"
          >
            Notre politique de confidentialité
          </Link>
          .
      </p>
  );
}