import { PageHeader } from "@/components/page-header";

const HomeLayout = ({ 
  children
}: { 
  children: React.ReactNode
}) => { 
  return (
    <>
      <PageHeader title="Les derniers QCM" />
      <div className="w-full md:w-2/3 mx-auto p-2">
        {children}
      </div>
    </>
  )
}

export default HomeLayout;