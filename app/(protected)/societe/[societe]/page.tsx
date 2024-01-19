import { getSocieteById } from "@/data/societes";

const PageSocieteId = async ({
  params: { societe },
}: {
  params: { societe: string }
}) => {


  const societeData = await getSocieteById(societe);
 
  if(!societeData) {
    return (
      <>
        <p>Cette societé n`&apos;`existe pas...</p>
      </>
    )
  }

  return (
    <>
      <p>{societe}</p>
      {JSON.stringify(societeData)}
    </>
  );
}

export default PageSocieteId;