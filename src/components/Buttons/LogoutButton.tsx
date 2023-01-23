import React from "react";
import { Button, Box } from "@chakra-ui/react";
import { useAuth0 } from "@auth0/auth0-react";

export const LogoutButton: React.FC<any> = () => {

  const { logout } = useAuth0();

  return (
    <Box>
      <Button onClick={() => logout()}>
        Logout
      </Button>
    </Box>
  );
};