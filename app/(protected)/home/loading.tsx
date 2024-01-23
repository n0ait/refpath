import LoadingCard from "./loading-card";

const TrainingLoading = () => {
  return ( 
    <div className="space-y-4">
      {[...Array(3)].map((_, i) => (
        <div className="space-x-4 flex" key={i}>
          <LoadingCard />
          <LoadingCard />
          <LoadingCard />
        </div>
        ))}
      
    </div>
  );
};
 
export default TrainingLoading;