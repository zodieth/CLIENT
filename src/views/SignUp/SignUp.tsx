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
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { auth } from "../../auth0.service";
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
  const [zip, setZip] = useState("");
  const [allowSignUp, setAllowSignUp] = useState(false);

  const navigate = useNavigate();

  const handleUserCreation = async (
    province : String,
    city : String,
    address : String,
    zip : String,
    firstName : String,
    lastName : String,
    userName : String,
    phoneNumber : String,
    email : String,
    // accessToken : String
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
      if(userDB.hasOwnProperty("errors")) {
        const userNameExists = userDB.errors.some((error : { value : String, msg : String, param : String, location: String }) => {
          return error.param === "userName";
        });
        const emailExists = userDB.errors.some((error : { value : String, msg : String, param : String, location: String }) => {
          return error.param === "email";
        });
        const phoneNumberExists = userDB.errors.some((error : { value : String, msg : String, param : String, location: String }) => {
          return error.param === "phoneNumber";
        });
        if(userNameExists) {
          window.alert("Ya existe una cuenta con el nombre de usuario ingresado.");
        } else if(emailExists) {
          window.alert("Ya existe una cuenta con el correo electrónico ingresado.");
        } else if(phoneNumberExists) {
          window.alert("Ya existe una cuenta con el número telefónico ingresado.");
        };
        return false;
      } else {
        return true;
      };
  };
  const handleSignUp = async () => {
    const successfulUserCreation = await handleUserCreation(
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
    if(successfulUserCreation) {
      auth.signup({
        email: email,
        password: password,
        connection: "Username-Password-Authentication"
      }, async (error : Auth0Error | null, result : any) => {
        if(error) {
          //OJO, debe haber validación de datos en tiempo real en concordancia con los modelos y la configuración de Auth0. La validación en las rutas del servidor sólo se usará para efectos de determinar si ya existe un documento con el mismo valor en cierto campo.
          window.alert("El proceso de registro no ha sido exitoso. Por favor, intenta más tarde.");
        } else {
          window.alert("Bienvenido a AllTech. Revisa tu correo electrónico, recuerda que debes verificar tu cuenta antes de ingresar.");
          //Esta alerta podría recordar al usuario los datos de la cuenta recién creada...
          navigate("/signin");
        };
      });
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