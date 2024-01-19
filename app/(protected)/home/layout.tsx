import { PageHeader } from "@/components/page-header";

const HomeLayout = ({ 
  children
}: { 
  children: React.ReactNode
}) => { 
  return (
    <>
      <PageHeader title="Accueil" />
      {children}
    </>
  )
}

export default HomeLayout;