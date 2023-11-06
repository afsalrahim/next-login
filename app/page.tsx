import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>Hello</h1>

      <Link className={buttonVariants()} href="/admin">
        Open My Admin
      </Link>
    </div>
  );
}
