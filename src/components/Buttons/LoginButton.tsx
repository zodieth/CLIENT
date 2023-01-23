import React from "react";
import { Button, Box } from "@chakra-ui/react";
import { useAuth0 } from "@auth0/auth0-react";


export const LoginButton: React.FC<any> = () => {

  const { user, loginWithRedirect } = useAuth0();
  // console.log(user);

  return (
    <Box>
      <Button onClick={() => loginWithRedirect()}>
        Login
      </Button>
    </Box>
  );
};