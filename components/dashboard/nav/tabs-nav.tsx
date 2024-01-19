"use client"

import * as React from "react";

import { cn } from "@/lib/utils";
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import Link from "next/link";

export function TabsNav() {

  return (
    <div
      className={cn("group relative flex flex-col space-y-2")}
    >
      <Tabs defaultValue="preview" className="relative mr-auto w-full">
        <div className="flex items-center justify-between">
          <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0 px-5">
            <TabsTrigger
              value="preview"
              className="relative h-9 rounded-none font-medium border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
            >
              <Link
                key="Apercu"
                href="/societe"
              >
                Aperçu
              </Link>
            </TabsTrigger>
            <TabsTrigger
              value="code"
              className="relative h-9 rounded-none font-medium border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
            >
              Utilisateurs
            </TabsTrigger>
          </TabsList>
        </div>
      </Tabs>
    </div>
  )
}