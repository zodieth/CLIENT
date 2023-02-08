import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react"
import { 
  AUTH0_REALM,
  AUTH0_DOMAIN,
  AUTH0_CLIENT_ID } from "../../auth0.config";
import style from "./SignIn.module.css";
import Swal from "sweetalert2";

export default function SimpleCard() {
  const [email, setEmail] = useState("");

  const navigate = useNavigate();
  const emailPattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  const handleResetPassword = async () => {
    if(!emailPattern.test(email)) {
      const Toast = Swal.mixin({
        toast: false,
        position: "center",
        showConfirmButton: true
      });
      return Toast.fire({
        icon: "warning",
        title: "Atención...",
        text: "Ingresa un correo electrónico válido."
      });
    };
    const resetPasswordResponse = await fetch(`https://${AUTH0_DOMAIN}/dbconnections/change_password`, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        cliend_id: AUTH0_CLIENT_ID,
        email: email,
        connection: AUTH0_REALM
      })
    });
    console.log("Reset password response: ", resetPasswordResponse);
    const Toast = Swal.mixin({
      toast: false,
      position: "center",
      showConfirmButton: true
    });
    Toast.fire({
      icon: "info",
      title: "Ten en cuenta...",
      text: `Te hemos enviado un correo electrónico a ${email} para que cambies tu contraseña de forma segura.`
    });
    navigate("/signin");
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
          <Heading fontSize={"3xl"}>¿Olvidaste tu contraseña?</Heading>
          <Text fontSize={"lg"} color={"gray.600"} align={"justify"}>
          Ingresa el correo electrónico con el que te registraste en AllTech. Recibirás un enlace desde el cual podrás cambiar tu contraseña de forma segura. 🔑
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
            <Stack spacing={1}>
                <Button
                className={style.iniciosesion}
                  width={"full"}
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                  onClick={handleResetPassword}
                >
                  Enviar correo electrónico
                </Button>
              <Stack pt={6}>
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
                    to="/signin"
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