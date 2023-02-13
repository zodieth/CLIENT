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
import { 
  AUTH0_CALLBACK_URL,
  AUTH0_CLIENT_ID,
  API_SERVER_URL } from "../../auth0.config";
import style from "./PostSignUp.module.css"
import Swal from "sweetalert2";

export default function SignupCard() {
  const [renderForm, setRenderForm] = useState(false);
  const [userName, setUserName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [province, setProvince] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [zip, setZip] = useState("");
  const [userNameError, setUserNameError] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [provinceError, setProvinceError] = useState("");
  const [cityError, setCityError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [zipError, setZipError] = useState("");
  const [allowSignUp, setAllowSignUp] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const phonePattern = /^\d{8,}$/;
  const validateUserData = () => {
    if(userName.length < 5) {
      setUserNameError("El nombre de usuario debe tener al menos cinco caracteres.");
    } else setUserNameError("");
    if(!phonePattern.test(phoneNumber)) {
      setPhoneNumberError("Ingresa un número telefónico válido.");
    } else setPhoneNumberError("");
    if(province.length < 1) {
      setProvinceError("Selecciona tu provincia.");
    } else setProvinceError("");
    if(city.length < 3) {
      setCityError("Ingresa tu ciudad.");
    } else setCityError("");
    if(address.length < 5) {
      setAddressError("Ingresa tu dirección.");
    } else setAddressError("");
    if(zip.length < 4) {
      setZipError("Ingresa un código postal válido.");
    } else setZipError("");
  };
  const checkErrors = () => {
    const errors = [
      userNameError,
      phoneNumberError,
      provinceError,
      cityError,
      addressError,
      zipError];
    const someErrors = errors.some(error => error != "");
    if(someErrors) {
      setAllowSignUp(false);
    } else {
      setAllowSignUp(true);
    };
  };

  const handleLogout = async () => {
    localStorage.removeItem("email");
    localStorage.removeItem("accessToken");
    await auth.logout({
      returnTo: `${AUTH0_CALLBACK_URL}/signin`,
      clientID: AUTH0_CLIENT_ID
    });
  };

  const handleHash = async (hash: String) => {
    await auth.parseHash({
      hash
    }, async (error : Auth0ParseHashError | null, result : Auth0DecodedHash | null) => {
      if(error) {
        console.log("Error: ", error);
      } else {
        const { accessToken } = result;
        localStorage.setItem("accessToken", accessToken);
        if(accessToken) {
          await auth.client.userInfo(accessToken, async (error : Auth0Error | null, user : Auth0UserProfile) => {
            if(error) {
              console.log("Error: ", error);
              const Toast = Swal.mixin({
                toast: false,
                position: "center",
                showConfirmButton: true
              });
              Toast.fire({
                icon: "error",
                title: "Oops...",
                text: "El proceso de autenticación no ha sido exitoso. Por favor, intenta más tarde."
              });
              await handleLogout();
            } else {
              const userExistsResponse = await fetch(`${API_SERVER_URL}/user/${user.email}`, {
                method: "GET",
                headers: {
                  "content-type": "application/json",
                  // Authorization: `Bearer ${accessToken}`
                }
              });
              const userExists = await userExistsResponse.json();
              if(userExists) {
                navigate("/");
              } else {
                setRenderForm(true);
              };
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
    email : String,
    // accessToken : String
    ) => {
    const locationResponse = await fetch(`${API_SERVER_URL}/location`, {
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
      const userResponse = await fetch(`${API_SERVER_URL}/user`, {
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
        const phoneNumberExists = userDB.errors.some((error : { value : String, msg : String, param : String, location: String }) => {
          return error.param === "phoneNumber";
        });
        if(userNameExists) {
          const Toast = Swal.mixin({
            toast: false,
            position: "center",
            showConfirmButton: true
          });
          Toast.fire({
            icon: "warning",
            title: "Atención...",
            text: "Ya existe una cuenta con el nombre de usuario ingresado."
          });
        } else if(phoneNumberExists) {
          const Toast = Swal.mixin({
            toast: false,
            position: "center",
            showConfirmButton: true
          });
          Toast.fire({
            icon: "warning",
            title: "Atención...",
            text: "Ya existe una cuenta con el número telefónico ingresado."
          });
        };
        return false;
      } else {
        return true;
      };
  };
  const handleSignUp = async () => {
    if(!allowSignUp) {
      const Toast = Swal.mixin({
        toast: false,
        position: "center",
        showConfirmButton: true
      });
      return Toast.fire({
        icon: "warning",
        title: "Atención...",
        text: "Algunos de los datos ingresados NO son válidos."
      });
    };
    const successfulUserCreater = await handleUserCreation(
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
    if(successfulUserCreater) {
      const Toast = Swal.mixin({
        toast: false,
        position: "center",
        showConfirmButton: true
      });
      Toast.fire({
        icon: "success",
        title: "Enhorabuena...",
        text: "Bienvenido a AllTech. Serás redirigido a nuestra tienda."
      });
      navigate("/");
    };
  };

  useEffect(() => {
    if(location.hash) {
      handleHash(location.hash);
    };
  }, []);
  useEffect(() => {
    validateUserData();
    checkErrors();
  }, [
    userName,
    phoneNumber,
    province,
    city,
    address,
    zip,
    userNameError,
    phoneNumberError,
    provinceError,
    cityError,
    addressError,
    zipError
  ]);
  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        {!renderForm ? <></> : <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Bienvenido a AllTech... casi...
          </Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            Ingresa los siguientes datos para completar el proceso de registro ✅
          </Text>
        </Stack>}
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          {!renderForm ? <></> : <Stack spacing={4}>
          <FormControl id="email" isRequired>
              <FormLabel className={style.largo}>Nombre de usuario</FormLabel>
              <Input type="text" value={userName}
                                  onChange={e => setUserName(e.target.value)}/>
            </FormControl>
            {userNameError}
            <HStack>
              <Box>
                <FormControl id="email" isRequired>
                  <FormLabel className={style.largo}>Número telefónico</FormLabel>
                  <Input type="tel"
                          value={phoneNumber}
                          onChange={e => setPhoneNumber(e.target.value)}/>
                </FormControl>
                {phoneNumberError}
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
                {provinceError}
              </Box>
              <Box>
                <FormControl id="email" isRequired>
                  <FormLabel>Ciudad</FormLabel>
                  <Input type="text"
                          value={city}
                          onChange={e => setCity(e.target.value)}/>
                </FormControl>
                {cityError}
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
              {addressError}
              <Box>
                <FormControl id="email" isRequired>
                  <FormLabel className={style.largo}>Código Postal</FormLabel>
                  <Input type="text"
                          value={zip}
                          onChange={e => setZip(e.target.value)}/>
                  </FormControl>
                  {zipError}
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
          </Stack>}
        </Box>
      </Stack>
    </Flex>
  );
}