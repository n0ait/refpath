import LoadingCard from "./loading-card";

const TrainingLoading = () => {
  return ( 
    <>
      {[...Array(9)].map((_, i) => (
        <LoadingCard />
        ))}
      
    </>
  );
};
 
export default TrainingLoading;