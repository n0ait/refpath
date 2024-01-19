import { Command } from "lucide-react";

const AuthLayout = ({ 
    children
  }: { 
    children: React.ReactNode
  }) => {
    return ( 
<div className="container relative h-[100vh] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
          <div
            className="absolute inset-0 bg-cover"
            style={{
              backgroundColor: "#000"
            }}
          />
          <div className="relative z-20 flex items-center text-lg font-medium">
            <Command className="mr-2 h-6 w-6" /> Refpath
          </div>
        </div>
        <div className="lg:p-8 h-full">
          <div className="mx-auto flex h-full w-full flex-col justify-center items-center space-y-6 sm:w-[400px]">
            {children}
          </div>
        </div>
      </div>
     );
  }
   
  export default AuthLayout;