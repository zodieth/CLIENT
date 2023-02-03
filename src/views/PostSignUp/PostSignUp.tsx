import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Select
} from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { auth } from "../../auth0.service";
import auth0 from "auth0-js";
import style from "./PostSignUp.module.css"

export default function SignupCard() {
  const [userName, setUserName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [province, setProvince] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [zip, setZip] = useState("");
  const [allowSignUp, setAllowSignUp] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const handleHash = async (hash: String) => {
    auth.parseHash({
      hash
    }, (error : Auth0ParseHashError | null, result : Auth0DecodedHash | null) => {
      if(error) {
        console.log("Error: ", error);
      } else {
        const { accessToken, scope, state } = result;
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("scope", scope);
        localStorage.setItem("state", state);
        if(accessToken) {
          auth.client.userInfo(accessToken, async (error : Auth0Error | null, user : Auth0UserProfile) => {
            if(error) {
              console.log("Error: ", error);
            } else {
              setFirstName(user.given_name);
              setLastName(user.family_name);
              setEmail(user.email);
            };
          });
        };
      };
    });
  };

  const handleUserCreation = async (
    province : String,
    city : String,
    address : String,
    zip : String,
    firstName : String,
    lastName : String,
    userName : String,
    phoneNumber : String,
    email : String
    ) => {
    const locationResponse = await fetch(`http://localhost:3001/location`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          // Authorization: `Bearer ${accessToken}`
        },
        body: JSON.stringify({
          province,
          city,
          address,
          zip
        })
      });
      const locationDB = await locationResponse.json();
      console.log(locationDB);
      const locationId = locationDB._id;
      const userResponse = await fetch(`http://localhost:3001/user`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          // Authorization: `Bearer ${accessToken}`
        },
        body: JSON.stringify({
          firstName,
          lastName,
          userName,
          phoneNumber,
          email,
          location: locationId
        })
      })
      const userDB = await userResponse.json();
      console.log("DB user: ", userDB);
  };

  const handleSignUp = async () => {
    await handleUserCreation(
      province,
      city,
      address,
      zip,
      firstName,
      lastName,
      userName,
      phoneNumber,
      email
      // accessToken
    );
    window.alert("Bienvenido a AllTech. Serás redirigido a nuestra tienda.");
    navigate("/");
    // auth.checkSession({
    //   audience: "https://dev-6d0rlv0acg7xdkxt.us.auth0.com/api/v2/",
    //   scope: "read:current_user update:current_user_metadata",
    //   redirectUri: window.location.origin,
    //   responseType: "token"
    // }, (error : Auth0Error, result : any) => {
    //   if(error) {
    //     console.log("Error: ", error);
    //     window.alert("El proceso de registro no ha sido exitoso. Por favor, intenta más tarde.");
    //   } else {
    //     console.log("Result: ", result);
    //     const authManage = new auth0.Management({
    //       domain: "dev-6d0rlv0acg7xdkxt.us.auth0.com",
    //       token: result.accessToken
    //     });
    //     authManage.patchUserMetadata(result.userId, {
    //       userName,
    //       firstName,
    //       lastName,
    //       email,
    //       phoneNumber,
    //       province,
    //       city,
    //       address,
    //       zip
    //     }, async (error : Auth0Error | null, result : any) => {
    //       if(error) {
    //         //Debería haber un modal que informe al usuario que el proceso de registro no fue exitoso...
    //         console.log("Error: ", error);
    //         window.alert("El proceso de registro no ha sido exitoso. Por favor, intenta más tarde.");
    //       } else {
    //         console.log("Result: ", result);
    //         await handleUserCreation(
    //           result.userMetadata.province,
    //           result.userMetadata.city,
    //           result.userMetadata.address,
    //           result.userMetadata.zip,
    //           result.userMetadata.firstName,
    //           result.userMetadata.lastName,
    //           result.userMetadata.userName,
    //           result.userMetadata.phoneNumber,
    //           result.userMetadata.email
    //           // accessToken
    //         );
    //         window.alert("Bienvenido a AllTech. Serás redirigido a nuestra tienda.");
    //         navigate("/");
    //       };
    //     });
    //   };
    // });
  };

  useEffect(() => {
    if(location.hash) {
      handleHash(location.hash);
    } else {
      window.alert("El proceso de autenticación no puede continuar");
      navigate("/");
    };
  }, [location, navigate]);
  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Bienvenido a AllTech... casi...
          </Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            Completa los siguientes datos para completar el proceso de registro ✅
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
          <FormControl id="email" isRequired>
              <FormLabel className={style.largo}>Nombre de usuario</FormLabel>
              <Input type="text" value={userName}
                                  onChange={e => setUserName(e.target.value)}/>
            </FormControl>
            <HStack>
              <Box>
                <FormControl id="email" isRequired>
                  <FormLabel className={style.largo}>Número telefónico</FormLabel>
                  <Input type="tel"
                          value={phoneNumber}
                          onChange={e => setPhoneNumber(e.target.value)}/>
                </FormControl>
              </Box>
            </HStack>
            <HStack>
              <Box>
                <FormControl id="email" isRequired>
                  <FormLabel>Provincia</FormLabel>
                  <Select  placeholder="Provincia"
                          value={province}
                          onChange={e => setProvince(e.target.value)}>
                    <option value="Buenos Aires">Buenos Aires</option>
                    <option value="Ciudad Autónoma de Buenos Aires">Ciudad Autónoma de Buenos Aires</option>
                    <option value="Catamarca">Catamarca</option>
                    <option value="Chaco">Chaco</option>
                    <option value="Chubut">Chubut</option>
                    <option value="Córdoba">Córdoba</option>
                    <option value="Corrientes">Corrientes</option>
                    <option value="Entre Ríos">Entre Ríos</option>
                    <option value="Formosa">Formosa</option>
                    <option value="Jujuy">Jujuy</option>
                    <option value="La Pampa">La Pampa</option>
                    <option value="La Rioja">La Rioja</option>
                    <option value="Mendoza">Mendoza</option>
                    <option value="Misiones">Misiones</option>
                    <option value="Neuquén">Neuquén</option>
                    <option value="Río Negro">Río Negro</option>
                    <option value="Salta">Salta</option>
                    <option value="San Juan">San Juan</option>
                    <option value="San Luis">San Luis</option>
                    <option value="Santa Cruz">Santa Cruz</option>
                    <option value="Santa Fe">Santa Fe</option>
                    <option value="Santiago del Estero">Santiago del Estero</option>
                    <option value="Tierra del Fuego">Tierra del Fuego</option>
                    <option value="Tucumán">Tucumán</option>
                  </Select>
                </FormControl>
              </Box>
              <Box>
                <FormControl id="email" isRequired>
                  <FormLabel>Ciudad</FormLabel>
                  <Input type="text"
                          value={city}
                          onChange={e => setCity(e.target.value)}/>
                </FormControl>
              </Box>
            </HStack>
            <HStack>
              <Box>
                <FormControl id="email" isRequired>
                  <FormLabel>Dirección</FormLabel>
                  <Input type="text"
                          value={address}
                          onChange={e => setAddress(e.target.value)}/>
                </FormControl>
              </Box>
              <Box>
                <FormControl id="email" isRequired>
                  <FormLabel className={style.largo}>Código Postal</FormLabel>
                  <Input type="text"
                          value={zip}
                          onChange={e => setZip(e.target.value)}/>
                  </FormControl>
              </Box>
            </HStack>
            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                size="lg"
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                disabled={!allowSignUp}
                onClick={handleSignUp}
              >
                Crear cuenta
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}