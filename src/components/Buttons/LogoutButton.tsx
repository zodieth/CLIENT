import React from "react";
import { Button, Box } from "@chakra-ui/react";
import { useAuth0 } from "@auth0/auth0-react";

export const LogoutButton: React.FC<any> = () => {

  const { logout } = useAuth0();

  const handleLogout = () => {
    logout({
      logoutParams: {
        returnTo: window.location.origin
      }
    });
  };

  return (
    <Box>
      <Button onClick={handleLogout}>
        Logout
      </Button>
    </Box>
  );
};