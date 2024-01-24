import LoadingCard from "./loading-card";

const TrainingLoading = () => {
  return ( 
    <>
      {[...Array(9)].map((_, i) => (
        <LoadingCard key={i}/>
        ))}
      
    </>
  );
};
 
export default TrainingLoading;