import { UserNav } from "@/components/dashboard/nav/user-nav";
import { Search } from "@/components/training/search-training";
import Link from "next/link";
import Footer from "@/components/footer/footer";

const AuthLayout =  async ({ 
  children
}: { 
  children: React.ReactNode
}) => { 

  return (
    <>
      <div className="flex flex-col">
        <div className="min-h-[100vh]">
          <div className="flex h-16 items-center px-4 border-b">
            <div className="flex space-x-4">
              <Link
                className="font-medium"
                href={'/home'}>
                  Accueil
              </Link>
              <Link
                className=""
                href={'/training'}>
                  Entraînement
              </Link>
              <Link
                className=""
                href={'/stage'}>
                  Stage
              </Link>
            </div>
              
            <div className="ml-auto flex items-center space-x-4">
              <UserNav />
            </div>
          </div>
          {children}
        </div>
        <Footer />
      </div>
    </>
  )
};

export default AuthLayout;