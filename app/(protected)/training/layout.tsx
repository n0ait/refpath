import { PageHeader } from "@/components/page-header";

const TrainingLayout = ({ 
  children
}: { 
  children: React.ReactNode
}) => { 
  return (
    <>
      <PageHeader title="Entraînement" />
      {children}
    </>
  )
}

export default TrainingLayout;