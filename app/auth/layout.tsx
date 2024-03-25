import { Command } from "lucide-react";

const AuthLayout = ({ 
    children
  }: { 
    children: React.ReactNode
  }) => {
    return ( 
      <div className="container min-h-screen flex items-center justify-center">
        {children}
      </div>
     );
  }
   
  export default AuthLayout;