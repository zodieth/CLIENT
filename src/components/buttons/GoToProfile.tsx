import React from "react";
import { Button, Box, Link } from "@chakra-ui/react";
import { useAuth0 } from "@auth0/auth0-react";


export const GoToProfile: React.FC<any> = () => {

  const { user } = useAuth0();
  // console.log(user);

  return (
    <Box>
      {
        user ?
          <>
            <Link href="/profile">Go your Profile</Link>
          </>
          : <>Not logged in</>
      }
    </Box>
  );
};