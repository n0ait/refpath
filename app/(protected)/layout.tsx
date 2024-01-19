import Image from "next/image";

import { Button } from "@/components/ui/button";
import { MainNav } from "@/components/dashboard/nav/main-nav";
import { UserNav } from "@/components/dashboard/nav/user-nav";
import { Search } from "@/components/dashboard/nav/search";
import TeamSwitcher from "@/components/dashboard/nav/societes-switcher";
import { PlusCircleIcon } from "lucide-react";

import { getSocietesByUser } from "@/data/societes";
import { TabsNav } from "@/components/dashboard/nav/tabs-nav";

const AuthLayout =  async ({ 
  children
}: { 
  children: React.ReactNode
}) => { 

  const societes = await getSocietesByUser();

  return (
    <>
      <div className="flex flex-col">
        <div>
          <div className="flex h-16 items-center px-4">
            {societes && (
              <TeamSwitcher societes={societes} />
            )}
            <div className="ml-auto flex items-center space-x-4">
              <Search />
              <UserNav />
            </div>
          </div>
          <TabsNav />
        </div>
        <div>
          {children}
        </div>
      </div>
    </>
  )
};

export default AuthLayout;