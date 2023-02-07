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
import { Link } from "react-router-dom";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { auth } from "../../auth0.service";
import { 
  AUTH0_REALM,
  AUTH0_CALLBACK_URL,
  AUTH0_RESPONSE_TYPE } from "../../auth0.config";
import style from "./SignIn.module.css"

export default function SimpleCard() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //Necesitamos un estado global de Redux para guardar los datos del usuario activo. Cuando el usuario se loguee, se llenará ese estado haciendo una request al back...
  const handleLogin = () => {
    auth.login({
      email: email,
      password: password,
      realm: AUTH0_REALM,
      redirectUri: `${AUTH0_CALLBACK_URL}/postlogin`,
      responseType: AUTH0_RESPONSE_TYPE
    }, (error, result) => {
      if(error) {
        console.log("Error: ", error);
        if(error.code === "access_denied") {
          window.alert("El correo electrónico o la contraseña ingresados son incorrectos.");
        };
      } else {
        console.log("Result: ", result);
      };
    });
  };
  const handleGoogleLogin = () => {
    auth.authorize({
      connection: "google-oauth2",
      redirectUri: `${AUTH0_CALLBACK_URL}/postsignup`,
      responseType: AUTH0_RESPONSE_TYPE
    }, (error, result) => {
      if(error) {
        console.log("Error: ", error);
        if(error.code === "access_denied") {
          window.alert("El correo electrónico o la contraseña ingresados son incorrectos.");
        };
      } else {
        console.log("Result: ", result);
      };
    });
  };
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
              <FormLabel className={style.direccion}>Dirección de correo electrónico</FormLabel>
              <Input
                type="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Contraseña</FormLabel>
              <Input
                type="password"
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
                <Checkbox>Recuérdame</Checkbox>
                
              </Stack>
              <Button
                w={"full"}
                variant={"outline"}
                leftIcon={<FcGoogle />}
                onClick={handleGoogleLogin}>
                <Center>
                  <Text>Inicia sesión con Google</Text>
                </Center>
              </Button>

              <Link
                to={
                  email === "admin@gmail.com" && password === "admin"
                    ? "/admin"
                    : email === "prueba@gmail.com" && password === "prueba"
                    ? "/"
                    : ""
                }
              >
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
              </Link>

              <Stack classname={style.olvido}>
                <Link  color={"blue.400"}>¿Olvidaste tu contraseña?</Link>
              </Stack>

              <Stack pt={6}>
                <Text align={"center"}>
                ¿No tienes un usuario?{" "}
                  <Link
                    style={{ color: "blue" }}
                    to="/signup"
                    color={"blue.400"}
                  >
                    Crear usuario
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