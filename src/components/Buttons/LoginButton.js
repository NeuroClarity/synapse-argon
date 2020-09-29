import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "reactstrap";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <Button
      style={{ opacity: "1" }}
      className="my-4 center-text"
      color="primary"
      type="button"
      onClick={() => loginWithRedirect()}
    >
      Sign Up or Login
    </Button>
  );
};

export default LoginButton;
