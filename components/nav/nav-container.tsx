"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

import {
  MessageCircleQuestion,
  ArrowLeftToLine,
  ListChecks,
  TrendingUp,
  Library,
  HomeIcon
} from "lucide-react";

import { AccountSwitcher } from "./account-switcher";
import { Nav } from "./nav";
import { Separator } from "@/components/ui/separator";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Button } from "../ui/button";
import { ModeToggle } from "../mode-toggle";

interface NavContainerProps {
  defaultCollapsed?: boolean
}

export function NavContainer({
  defaultCollapsed = false
}: NavContainerProps) {
  const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed);

  const shouldCollapse = () => window.innerWidth < 991;

  React.useEffect(() => {
    const handleResize = () => {
      setIsCollapsed(shouldCollapse());
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleCollapse = () => setIsCollapsed(!isCollapsed);

  return (
    <TooltipProvider delayDuration={0}>
      <div
        className={cn(
          "h-[100vh] w-full max-w-[200px] items-stretch transition-all duration-300 ease-in-out relative border-r",
          isCollapsed && "min-w-[50px] max-w-[50px]"
        )}
      >
        <div className={cn("flex h-[52px] items-center justify-center", isCollapsed ? 'h-[52px]': 'px-2')}>
          <AccountSwitcher isCollapsed={isCollapsed} />
        </div>
        <Separator />
        <Nav
          isCollapsed={isCollapsed}
          links={[
            {
              title: "Accueil",
              label: "",
              icon: HomeIcon,
              link: "/home"
            },
            {
              title: "QCM",
              label: "",
              icon: ListChecks,
              link: "/training"
            },
            // {
            //   title: "Apprendre",
            //   label: "",
            //   icon: Library,
            //   link: "#"
            // },
            // {
            //   title: "Progression",
            //   label: "",
            //   icon: TrendingUp,
            //   link: "#"
            // },
          ]}
        />
        <Separator />
        <Nav
          isCollapsed={isCollapsed}
          links={[
            {
              title: "Support",
              label: "",
              icon: MessageCircleQuestion,
              link: "support"
            }
          ]}
        />
        {/* Same for dark mode, will see later... */}
        {/* <ModeToggle /> */}
        <div className="absolute bottom-2 right-1">
          <Button 
            onClick={toggleCollapse}
            variant={"ghost"}
            size="sm"
          >
            <div className={cn("transition-all duration-300 ease-in-out", isCollapsed ? "rotate-180" : "")}>
              <ArrowLeftToLine className="max-h-4 max-w-4"/>
            </div>
          </Button>
        </div>
      </div>
    </TooltipProvider>
  );
}
