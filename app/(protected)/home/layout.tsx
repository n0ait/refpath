import { PageHeader } from "@/components/page-header";

const HomeLayout = ({ 
  children
}: { 
  children: React.ReactNode
}) => { 
  return (
    <>
      <PageHeader title="Les derniers QCM" />
      <div className="w-2/3 mx-auto">
        {children}
      </div>
    </>
  )
}

export default HomeLayout;