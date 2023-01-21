import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Card, Text, Box } from "@chakra-ui/react";
import { LogoutButton } from "../buttons/LogoutButton";


// import { User } from "../../models/UsersInterface";

export const UserProfile = () => {

  const { user, isAuthenticated, isLoading } = useAuth0();
  console.log(user);


  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Box>
      {isAuthenticated && (
      <div>
        {/* <img src={user.picture} alt={user.name} /> */}

        <Text>{user?.name}</Text>
        <Text>Email: {user?.email}</Text>
        <LogoutButton />
      </div>
      )}
    </Box>
  );
};
