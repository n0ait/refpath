import MainWrapper from "@/components/main-wrapper";
import { PageHeader } from "@/components/page-header";

const HomeLayout = ({ 
  children
}: { 
  children: React.ReactNode
}) => { 
  return (
    <>
      <PageHeader title="Les derniers QCM" />
      <MainWrapper>
        {children}
      </MainWrapper>
    </>
  )
}

export default HomeLayout;