import React, { FC, ReactNode } from "react";
import { Button } from "./ui/button";

interface GoogleSignInButtonProps {
  children: ReactNode;
}

const GoogleSignInButton: FC<GoogleSignInButtonProps> = ({ children }) => {
  const loginWithGoogle = () => console.log("Login with Google");

  return (
    <Button className="w-full" onClick={loginWithGoogle}>
      {children}
    </Button>
  );
};

export default GoogleSignInButton;
