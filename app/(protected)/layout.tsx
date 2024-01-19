import { UserNav } from "@/components/dashboard/nav/user-nav";
import { Search } from "@/components/dashboard/nav/search";

import { TabsNav } from "@/components/dashboard/nav/tabs-nav";

const AuthLayout =  async ({ 
  children
}: { 
  children: React.ReactNode
}) => { 

  return (
    <>
      <div className="flex flex-col">
        <div>
          <div className="flex h-16 items-center px-4">
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