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
import style from "./SignIn.module.css"

export default function SimpleCard() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = () => {
    auth.login({
      username: email, //OJO, debe ser el usuario, NO el correo electrónico...
      password: password,
      realm: "Username-Password-Authentication",
      redirectUri: "http://localhost:3000/postlogin",
      responseType: "token"
    }, (error, user) => {
      if(error) {
        //Debería haber un modal que informe al usuario que el proceso de autenticación no fue exitoso...
        return console.log("Proceso de autenticación fallido, intente más tarde.");
      } else {
        console.log(user);
      };
    });
  };
  // const { loginWithRedirect, loginWithPopup, getAccessTokenSilently } = useAuth0();
  // const handleLogin = async () => {
  //   loginWithPopup({
  //     appState: {
  //       returnTo: "/"
  //     },
  //     authorizationParams: {
  //       prompt: "login"
  //     }
  //   });
    // const accessToken = await getAccessTokenSilently();
    
    // const loginResponse = await fetch("https://dev-6d0rlv0acg7xdkxt.us.auth0.com/authorize?response_type=token&client_id=2EHZJm086BzkgwY5HXmPeK5UnbHegBXl&connection=UsernamePasswordAuthentication&redirect_uri=http://localhost:3000", {
    //   method: "GET",
    //   // headers: {
    //   //   Authorization: `Bearer ${accessToken}`
    //   // },
    //   redirect: "follow"
    // });
    // console.log("Login response: ", loginResponse);
    // const userAuth0 = await loginResponse.json();
    // console.log("userAuth0: ", userAuth0);
    // if(loginResponse.redirected) window.location.href = loginResponse.url;
    // await loginWithRedirect({
    //   appState: {
    //     returnTo: "/"
    //   },
    //   authorizationParams: {
    //     prompt: "login"
    //   }
    // });
  // };

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
              <Button w={"full"} variant={"outline"} leftIcon={<FcGoogle />}>
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