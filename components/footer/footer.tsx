"use client";

import { ModeToggle } from "@/components/mode-toggle";
import MainWrapper from "@/components/main-wrapper";

const Footer = () => {
  return (
    <footer className="w-full border-t">
      <MainWrapper>
        <div className="flex items-center justify-between pt-10 pb-10">
          <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
            Projet imaginé et conçu par&nbsp;
            <a 
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4" 
              href="https://fr.linkedin.com/in/no%C3%A9-d-0b2507209"
            >
              Noé
            </a>.
          </p>
          <ModeToggle />
        </div>
      </MainWrapper>
    </footer>
  )
}

export default Footer;