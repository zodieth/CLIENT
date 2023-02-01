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
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import style from "./SignUp.module.css"

export default function SignupCard() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [province, setProvince] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [allowSignUp, setAllowSignUp] = useState(false);

  const handleSignUp = async () => {
    const Auth0Response = await fetch("https://dev-6d0rlv0acg7xdkxt.us.auth0.com/dbconnections/signup", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          cliend_id: "2EHZJm086BzkgwY5HXmPeK5UnbHegBXl",
          email: email,
          password: password,
          connection: "Username-Password-Authentication",
          username: userName,
          given_name: firstName,
          family_name: lastName,
          // picture: "",
          user_metadata: {
            phone_number: phoneNumber,
            province: province,
            city: city,
            address: address,
            postal_code: postalCode
          }
        })
    });
    const userAuth0 = await Auth0Response.json();
    console.log("Auth0 user: ", userAuth0);
    if(userAuth0) {
      const locationResponse = await fetch("http://localhost:3001/location", {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({
          province,
          city,
          address,
          zip: postalCode
        })
      });
      const locationDB = await locationResponse.json();
      const locationId = locationDB._id;
      const userDB = await fetch("http://localhost:3001/user", {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({
          firstName: firstName,
          lastName: lastName,
          userName: userName,
          email: email,
          phoneNumber: phoneNumber,
          location: locationId
        })
      })
      console.log("DB user: ", userDB);
    };
  };

  useEffect(() => {
    if(password === confirmPassword && password.length > 9) {
      setAllowSignUp(true);
    } else {
      setAllowSignUp(false);
    };
  }, [password, confirmPassword]);
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
            Crear cuenta
          </Heading>
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
          <FormControl id="email" isRequired>
              <FormLabel className={style.largo}>Nombre de usuario</FormLabel>
              <Input type="text" value={userName}
                                  onChange={e => setUserName(e.target.value)}/>
            </FormControl>
            <HStack>
              <Box>
                <FormControl id="password" isRequired>
                  <FormLabel className={style.largo}>Contraseña</FormLabel>
                    <InputGroup>
                      <Input type={showPassword ? "text" : "password"}
                              value={password}
                              onChange={e => setPassword(e.target.value)}/>
                      <InputRightElement h={"full"}>
                        </InputRightElement>
                    </InputGroup>
                </FormControl>
              </Box>
              <Box>
                <FormControl id="password" isRequired>
                  <FormLabel className={style.largo}>Confirmar contraseña</FormLabel>
                    <InputGroup>
                      <Input type={showPassword ? "text" : "password"}
                              value={confirmPassword}
                              onChange={e => setConfirmPassword(e.target.value)}/>
                      <InputRightElement h={"full"}>
                        <Button
                          variant={"ghost"}
                          onClick={() =>
                            setShowPassword((showPassword) => !showPassword)
                          }>
                          {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                        </Button>
                        </InputRightElement>
                    </InputGroup>
                </FormControl>
              </Box>
            </HStack>
            <HStack>
              <Box>
                <FormControl id="firstName" isRequired>
                  <FormLabel>Nombre</FormLabel>
                  <Input type="text"
                          value={firstName}
                          onChange={e => setFirstName(e.target.value)}/>
                </FormControl>
              </Box>
              <Box>
                <FormControl id="lastName" isRequired>
                  <FormLabel>Apellido</FormLabel>
                  <Input type="text"
                          value={lastName}
                          onChange={e => setLastName(e.target.value)}/>
                </FormControl>
              </Box>
            </HStack>
            <HStack>
              <Box>
                <FormControl id="email" isRequired>
                  <FormLabel>Email</FormLabel>
                  <Input type="email"
                          value={email}
                          onChange={e => setEmail(e.target.value)}/>
                </FormControl>
              </Box>
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
                          value={postalCode}
                          onChange={e => setPostalCode(e.target.value)}/>
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
            <Stack pt={6}>
              <Text align={"center"}>
                ¿Ya eres usuario?{" "}
                <Link style={{ color: "blue" }} to="/signin" color={"blue.400"}>
                  Inicie sesión
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}