"use client";

import { signOut } from "next-auth/react";
import { Button } from "./ui/button";

const UserNavigation = () => {
  return (
    <Button
      onClick={async () =>
        signOut({
          redirect: true,
          callbackUrl: `${window.location.origin}/sign-in`,
        })
      }
      variant="destructive"
    >
      Signout
    </Button>
  );
};

export default UserNavigation;
