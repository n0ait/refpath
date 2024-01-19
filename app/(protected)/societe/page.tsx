import { SocieteDataTable } from "@/components/dashboard/societe/societe-table";
import { getSocietesByUser } from "@/data/societes";

const AccueilPage = async () => {
  const societes = await getSocietesByUser();
  if(!societes) return "error";

  const societe = societes[0];

  return ( 
    <div className="w-3/4 mx-auto px-6">
      <SocieteDataTable />
    </div>
   );
}
 
export default AccueilPage;