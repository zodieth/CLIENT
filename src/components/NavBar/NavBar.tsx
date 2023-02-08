import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import style from "./navBar.module.css";
import { Box, Button } from "@chakra-ui/react";
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
  useColorModeValue,
} from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { auth } from "../../auth0.service";
import {
  AUTH0_CALLBACK_URL,
  AUTH0_CLIENT_ID,
  AUTH0_DOMAIN,
  AUTH0_MANAGEMENT_API_ACCESS_TOKEN,
} from "../../auth0.config";
import ToggleColorMode from "../DarkMode/ToggleColorMode";

import { searchUserByEmail } from "../../app/actionsCreators";

function NavBar(props: any) {
  const dispatch = useAppDispatch();

  function dispatchUser(value: any) {
    dispatch(searchUserByEmail(value));
  }

  const [userName, setUserName] = useState("");
  const [picture, setPicture] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const cartItems = useAppSelector((state) => state.cart);
  const navigate = useNavigate();

  const accessToken = localStorage.getItem("accessToken");
  const activeSession = accessToken ? true : false;
  const handleLogout = async () => {
    localStorage.removeItem("accessToken");
    await auth.logout({
      returnTo: AUTH0_CALLBACK_URL,
      clientID: AUTH0_CLIENT_ID,
    });
  };

  const userState = useAppSelector((state) => state.user);

  // setUserName(useState.user.userName);

  const handleUser = async () => {
    await auth.client.userInfo(
      accessToken,
      async (error: Auth0Error | null, user: Auth0UserProfile) => {
        if (error) {
          console.log("Error: ", error);
          // window.alert("La sesión ha expirado.");
          // await handleLogout();
        } else {
          setPicture(user.picture);
          dispatchUser(user.email);

          localStorage.setItem("email", user.email);
          // localStorage.setItem("id", userState.user._id);

          const userId = user.sub;
          const userRolesResponse = await fetch(
            `https://${AUTH0_DOMAIN}/api/v2/users/${userId}/roles`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${AUTH0_MANAGEMENT_API_ACCESS_TOKEN}`,
              },
            }
          );
          const userRoles = await userRolesResponse.json();
          const hasAdminRole = userRoles.some(
            (role: { id: String; name: String; description: String }) =>
              role.name === "alltech-admin"
          );

          setIsAdmin(hasAdminRole);
        }
      }
    );
  };

  useEffect(() => {
    if (activeSession) {
      setUserName(userState.user.userName);
      handleUser();
    }
  }, []);

  return (
    <Box className={style.navBar}>
      <Box className={style.logo}>
        <Link to="/">
          <HamburgerIcon boxSize={8} color="Gray" />
        </Link>
        <Link to="/">
          <h1 className={style.h1Logo}>
            {" "}
            <img src="https://cdn.discordapp.com/attachments/1064640307213377546/1072673719069180005/3.png" />
          </h1>
        </Link>
      </Box>
      <Box className={style.buttons}>
        <ToggleColorMode />
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
        <Link to="/armatupc">
          <Button
            rightIcon={<MdComputer />}
            className={style.button}
            colorScheme="blue"
            variant="solid"
          >
            Arma tu PC
          </Button>
        </Link>

        {activeSession ? (
          <Box className={style.avatar_login}>
            <Button
              rightIcon={<FiLogIn />}
              className={style.button}
              colorScheme="teal"
              variant="solid"
              onClick={handleLogout}
            >
              Salir
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
                  <Avatar size={"sm"} src={picture} />
                </MenuButton>
                <MenuList alignItems={"center"}>
                  <br />
                  <Center>
                    <Avatar size={"2xl"} src={picture} />
                  </Center>
                  <br />
                  <Center>
                    <p>{userState.user.userName}</p>
                  </Center>
                  <br />
                  <MenuDivider />
                  <MenuItem onClick={() => navigate("/user")}>
                    Mi cuenta de usuario
                  </MenuItem>
                  {isAdmin ? (
                    <MenuItem onClick={() => navigate("/admin")}>
                      Mi cuenta de administrador
                    </MenuItem>
                  ) : null}
                  <MenuItem onClick={handleLogout}>Salir</MenuItem>
                </MenuList>
              </Menu>
            </Stack>
          </Box>
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
      </Box>
    </Box>
  );
}

export default NavBar;
