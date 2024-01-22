import { TrainingCard } from "@/components/training/training-card";

const HomePage = () => {
  return (
    <div className="flex space-x-2">
      <TrainingCard title="Les violations" createdAt="22/01/2024" createdBy="Noé" />
      <TrainingCard title="Les fautes" createdAt="28/01/2024" createdBy="Noé" />
      <TrainingCard title="Gestion du temps" createdAt="31/01/2024" createdBy="Noé" />
    </div>
  )
}

export default HomePage;