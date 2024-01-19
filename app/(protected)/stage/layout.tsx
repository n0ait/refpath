import { PageHeader } from "@/components/page-header";

const StageLayout = ({ 
  children
}: { 
  children: React.ReactNode
}) => { 
  return (
    <>
      <PageHeader title="Stage" />
      {children}
    </>
  )
}

export default StageLayout;