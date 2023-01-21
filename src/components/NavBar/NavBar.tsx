import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import style from "./navBar.module.css";
import { Button, Box } from "@chakra-ui/react";
import SearchBar from "../SearchBar/SearchBar";
import { HamburgerIcon } from "@chakra-ui/icons";
import { FaShoppingCart } from "react-icons/fa";
import { MdComputer } from "react-icons/md";
import { FiLogIn } from "react-icons/fi";
import { Link } from "react-router-dom";
import {
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Stack,
  Center,
} from "@chakra-ui/react";
import { LoginButton } from "../buttons/LoginButton";
import { LogoutButton } from "../buttons/LogoutButton";

function NavBar() {
  const [cartItems, setCartItems] = useState(1);

  return (
    <div className={style.navBar}>
      <Box>
        <LogoutButton />
        <LoginButton />
      </Box>
      <div className={style.logo}>
        <Link to="/">
          <HamburgerIcon boxSize={8} color="black" />
        </Link>
        <Link to="/">
          <h1 className={style.h1Logo}> AllTech</h1>
        </Link>
      </div>
      <div>
        <SearchBar />
      </div>
      <div className={style.buttons}>
        <Link to="/cart" className={style.cartI}>
          <Button
            leftIcon={<FaShoppingCart />}
            className={style.items}
            colorScheme="blue"
            variant="solid"
          >
            {cartItems}
          </Button>
        </Link>

        <Button
          rightIcon={<MdComputer />}
          className={style.button}
          colorScheme="blue"
          variant="solid"
        >
          Arma tu PC
        </Button>
        <Link to="/signup">
          <Button
            rightIcon={<FiLogIn />}
            className={style.button}
            colorScheme="teal"
            variant="solid"
          >
            Ingresar
          </Button>
        </Link>

        <Stack direction={"row"} spacing={7}>
          <Menu>
            <MenuButton
              className={style.avatar}
              as={Button}
              rounded={"full"}
              variant={"link"}
              cursor={"pointer"}
              minW={0}
            >
              <Avatar size={"sm"} src={""} />
            </MenuButton>
            <MenuList alignItems={"center"} style={{ color: "#495057" }}>
              <br />
              <Center>
                <Avatar size={"2xl"} src={""} />
              </Center>
              <br />
              <Center>
                <p>Username</p>
              </Center>
              <br />
              <MenuDivider />
              <MenuItem>Cart</MenuItem>
              <MenuItem>Account Settings</MenuItem>
              <MenuItem>Logout</MenuItem>
            </MenuList>
          </Menu>
        </Stack>
      </div>
    </div>
  );
}

export default NavBar;
