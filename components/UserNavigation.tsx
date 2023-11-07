"use client";

import { signOut } from "next-auth/react";
import { Button } from "./ui/button";

const UserNavigation = () => {
  return (
    <Button onClick={async () => signOut()} variant="destructive">
      Signout
    </Button>
  );
};

export default UserNavigation;
