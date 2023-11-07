import Link from "next/link";
import { Button, buttonVariants } from "./ui/button";
import { HandMetal } from "lucide-react";
import { getServerSession } from "next-auth";
import { signOut } from "next-auth/react";
import UserNavigation from "./UserNavigation";

const Navbar = async () => {
  const session = await getServerSession();
  return (
    <div className="bg-zinc-100 py-2 border-b border-s-zinc-200 w-full fixed top-0">
      <div className="container flex items-center justify-between">
        <Link href="/">
          <HandMetal />
        </Link>
        {session?.user ? (
          <UserNavigation />
        ) : (
          <Link className={buttonVariants()} href="/sign-in">
            Sign in
          </Link>
        )}
      </div>
    </div>
  );
};
export default Navbar;
