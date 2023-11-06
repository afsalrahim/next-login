import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

const AdminPage = async () => {
  const session = await getServerSession(authOptions);

  console.log(session);
  return <div>ADMIN PAGE</div>;
};

export default AdminPage;
