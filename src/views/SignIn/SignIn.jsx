import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Center,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { auth } from "../../auth0.service";
import {
  AUTH0_REALM,
  AUTH0_CALLBACK_URL,
  AUTH0_RESPONSE_TYPE,
} from "../../auth0.config";
import style from "./SignIn.module.css";
import Swal from "sweetalert2";
import { RememberMe } from "@mui/icons-material";

export default function SimpleCard() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const navigate = useNavigate();
  const emailPattern =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const rememberedEmail = localStorage.getItem("rememberedEmail");
  const rememberedPassword = localStorage.getItem("rememberedPassword");

  const handleLogin = async () => {
    if (!emailPattern.test(email) || password.length < 1) {
      const Toast = Swal.mixin({
        toast: false,
        position: "center",
        showConfirmButton: true,
      });
      return Toast.fire({
        icon: "warning",
        title: "Atención...",
        text: "Ingresa tu correo electrónico y tu contraseña.",
      });
    }
    await auth.login(
      {
        email: email,
        password: password,
        realm: AUTH0_REALM,
        redirectUri: `${AUTH0_CALLBACK_URL}/postlogin`,
        responseType: AUTH0_RESPONSE_TYPE,
      },
      (error, result) => {
        if (error) {
          console.log("Error: ", error);
          if (error.code === "access_denied") {
            const Toast = Swal.mixin({
              toast: false,
              position: "center",
              showConfirmButton: true,
            });
            Toast.fire({
              icon: "warning",
              title: "Atención...",
              text: "El correo electrónico o la contraseña ingresados son incorrectos.",
            });
          }
        } else {
          console.log("Result: ", result);
        }
      }
    );
  };
  const handleGoogleLogin = async () => {
    await auth.authorize(
      {
        connection: "google-oauth2",
        redirectUri: `${AUTH0_CALLBACK_URL}/postsignup`,
        responseType: AUTH0_RESPONSE_TYPE,
      },
      (error, result) => {
        if (error) {
          console.log("Error: ", error);
          if (error.code === "access_denied") {
            const Toast = Swal.mixin({
              toast: false,
              position: "center",
              showConfirmButton: true,
            });
            Toast.fire({
              icon: "warning",
              title: "Atención...",
              text: "El correo electrónico o la contraseña ingresados son incorrectos.",
            });
          }
        } else {
          console.log("Result: ", result);
        }
      }
    );
  };

  useEffect(() => {
    if (rememberMe) {
      localStorage.setItem("rememberedEmail", email);
      localStorage.setItem("rememberedPassword", password);
    } else {
      localStorage.removeItem("rememberedEmail");
      localStorage.removeItem("rememberedPassword");
    }
  }, [rememberMe]);

  useEffect(() => {
    if (rememberedEmail && rememberedPassword) {
      setEmail(rememberedEmail);
      setPassword(rememberedPassword);
      setRememberMe(true);
      document.getElementById("rememberMe").checked = true;
    }
  }, []);

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"3xl"}>Inicie sesión con una cuenta</Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            Disfrute de todos nuestros productos ✌️
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel className={style.direccion}>
                Dirección de correo electrónico
              </FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Contraseña</FormLabel>
              <Input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
                <Checkbox
                  id="rememberMe"
                  leftIcon={RememberMe}
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                >
                  Recuérdame
                </Checkbox>
              </Stack>
              <Button
                w={"full"}
                variant={"outline"}
                leftIcon={<FcGoogle />}
                onClick={handleGoogleLogin}
              >
                <Center>
                  <Text>Iniciar sesión con Google</Text>
                </Center>
              </Button>

              <Button
                className={style.iniciosesion}
                width={"full"}
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                onClick={handleLogin}
              >
                Iniciar sesión
              </Button>

              <Stack onClick={() => navigate("/resetpassword")}>
                <Link style={{ color: "blue" }} color={"blue.400"}>
                  ¿Olvidaste tu contraseña?
                </Link>
              </Stack>

              <Stack>
                <Text align={"center"}>
                  ¿No tienes una cuenta?{" "}
                  <Link
                    style={{ color: "blue" }}
                    to="/signup"
                    color={"blue.400"}
                  >
                    Regístrate
                  </Link>
                </Text>
                <Text align={"center"}>
                  ¿No es lo que necesitas?{" "}
                  <Link
                    style={{ color: "blue" }}
                    to="/"
                    color={"blue.400"}
                  >
                    Volver
                  </Link>
                </Text>
              </Stack>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
