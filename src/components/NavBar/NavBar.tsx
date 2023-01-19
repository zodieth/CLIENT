import React, { useState } from "react";
import style from "./navBar.module.css";
import { Button } from "@chakra-ui/react";
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

function NavBar() {
  const [cartItems, setCartItems] = useState(1);

  return (
    <div className={style.navBar}>
      <div className={style.logo}>
        <HamburgerIcon boxSize={8} color="black" />
        <h1 className={style.h1Logo}> AllTech</h1>
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
        <Button
          rightIcon={<FiLogIn />}
          className={style.button}
          colorScheme="teal"
          variant="solid"
        >
          Ingresar
        </Button>

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
