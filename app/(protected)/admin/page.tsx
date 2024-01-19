import { RoleGate } from "@/components/auth/role-gate";
import { UserRole } from "@prisma/client";

const AdminPage = () => {
  
  return (
    <div>
      <RoleGate allowedRole={UserRole.ADMIN}>
        <p>Admin !</p>
      </RoleGate>

      <p>Cette page n&apos;existe pas.</p>
    </div>
  )
}
 
export default AdminPage;