import style from "./navBar.module.css";
import { Button } from "@chakra-ui/react";
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
  Center
} from "@chakra-ui/react";
import { useAuth0 } from "@auth0/auth0-react";
import { useAppSelector } from "../../hooks/hooks";

function NavBar() {
  const cartItems = useAppSelector((state) => state.cart);

  const { isAuthenticated, logout } = useAuth0();

  return (
    <div className={style.navBar}>
      <div className={style.logo}>
        <Link to="/">
          <HamburgerIcon boxSize={8} color="black" />
        </Link>
        <Link to="/">
          <h1 className={style.h1Logo}> AllTech</h1>
        </Link>
      </div>
      {/* <div>
        <SearchBar />
      </div> */}
      <div className={style.buttons}>
        <Link to="/cart" className={style.cartI}>
          <Button
            leftIcon={<FaShoppingCart />}
            className={style.items}
            colorScheme="blue"
            variant="solid"
          >
            {cartItems.cart.length}
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
        {isAuthenticated ? (
          <div className={style.avatar_login}>
            <Button
              rightIcon={<FiLogIn />}
              className={style.button}
              colorScheme="teal"
              variant="solid"
              onClick={() => logout()}
            >
              Logout
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
        ) : (
          <Link to="/signin">
            <Button
              rightIcon={<FiLogIn />}
              className={style.button}
              colorScheme="teal"
              variant="solid"
            >
              Ingresar
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default NavBar;
