import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

const AdminPage = async () => {
  const session = await getServerSession(authOptions);

  if (session?.user) {
    return <div className="text-2xl">Welcome {session.user.name}</div>;
  }
  return <div className="text-2xl"> Please login to view this page</div>;
};

export default AdminPage;
