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
  Select,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { auth } from "../../auth0.service";
import {
  API_SERVER_URL,
  AUTH0_REALM,
  AUTH0_MANAGEMENT_API_ACCESS_TOKEN } from "../../auth0.config";
import style from "./SignUp.module.css";
import { error } from "console";
import { Password } from "@mui/icons-material";
import Swal from "sweetalert2";

export default function SignupCard() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [province, setProvince] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [zip, setZip] = useState("");
  const [userNameError, setUserNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [provinceError, setProvinceError] = useState("");
  const [cityError, setCityError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [zipError, setZipError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [allowSignUp, setAllowSignUp] = useState(false);

  const navigate = useNavigate();
  const emailPattern =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const phonePattern = /^\d{8,}$/;
  const validateUserData = () => {
    if (userName.length < 5) {
      setUserNameError("El nombre de usuario debe tener al menos cinco caracteres.");
    } else setUserNameError("");
    if (password.length < 8) {
      setPasswordError("La contraseña debe tener al menos ocho caracteres.");
    } else setPasswordError("");
    if (password !== confirmPassword) {
      setConfirmPasswordError("Ambos valores deben coincidir.");
    } else setConfirmPasswordError("");
    if (firstName.length < 2) {
      setFirstNameError("Ingresa tu nombre.");
    } else setFirstNameError("");
    if (lastName.length < 4) {
      setLastNameError("Ingresa tu apellido.");
    } else setLastNameError("");
    if (!emailPattern.test(email)) {
      setEmailError("Ingresa un correo electrónico válido");
    } else setEmailError("");
    if (!phonePattern.test(phoneNumber)) {
      setPhoneNumberError("Ingresa un número telefónico válido.");
    } else setPhoneNumberError("");
    if (province.length < 1) {
      setProvinceError("Selecciona tu provincia.");
    } else setProvinceError("");
    if (city.length < 3) {
      setCityError("Ingresa tu ciudad.");
    } else setCityError("");
    if (address.length < 5) {
      setAddressError("Ingresa tu dirección.");
    } else setAddressError("");
    if (zip.length < 4) {
      setZipError("Ingresa un código postal válido.");
    } else setZipError("");
  };
  const checkErrors = () => {
    const errors = [
      userNameError,
      passwordError,
      confirmPasswordError,
      firstNameError,
      lastNameError,
      userNameError,
      emailError,
      phoneNumberError,
      provinceError,
      cityError,
      addressError,
      zipError
    ];
    const someErrors = errors.some((error) => error != "");
    if (someErrors) {
      setAllowSignUp(false);
    } else {
      setAllowSignUp(true);
    };
  };
  const handleUserCreation = async (
    province: String,
    city: String,
    address: String,
    zip: String,
    firstName: String,
    lastName: String,
    userName: String,
    phoneNumber: String,
    email: String
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
        zip,
      }),
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
        location: locationId,
      }),
    });
    const userDB = await userResponse.json();
    if (userDB.hasOwnProperty("errors")) {
      const userNameExists = userDB.errors.some(
        (error: {
          value: String;
          msg: String;
          param: String;
          location: String;
        }) => {
          return error.param === "userName";
        }
      );
      const emailExists = userDB.errors.some(
        (error: {
          value: String;
          msg: String;
          param: String;
          location: String;
        }) => {
          return error.param === "email";
        }
      );
      const phoneNumberExists = userDB.errors.some(
        (error: {
          value: String;
          msg: String;
          param: String;
          location: String;
        }) => {
          return error.param === "phoneNumber";
        }
      );
      if (userNameExists) {
        const Toast = Swal.mixin({
          toast: false,
          position: "center",
          showConfirmButton: true,
        });
        Toast.fire({
          icon: "warning",
          title: "Atención...",
          text: "Ya existe una cuenta con el nombre de usuario ingresado.",
        });
      } else if (emailExists) {
        const Toast = Swal.mixin({
          toast: false,
          position: "center",
          showConfirmButton: true,
        });
        Toast.fire({
          icon: "warning",
          title: "Atención...",
          text: "Ya existe una cuenta con el correo electrónico ingresado.",
        });
      } else if (phoneNumberExists) {
        const Toast = Swal.mixin({
          toast: false,
          position: "center",
          showConfirmButton: true,
        });
        Toast.fire({
          icon: "warning",
          title: "Atención...",
          text: "Ya existe una cuenta con el número telefónico ingresado.",
        });
      }
      return false;
    } else {
      return true;
    }
  };
  const handleSignUp = async () => {
    if (!allowSignUp) {
      const Toast = Swal.mixin({
        toast: false,
        position: "center",
        showConfirmButton: true,
      });
      return Toast.fire({
        icon: "warning",
        title: "Atención...",
        text: "Algunos de los datos ingresados NO son válidos.",
      });
    };
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
    if (successfulUserCreation) {
      auth.signup(
        {
          email: email,
          password: password,
          connection: AUTH0_REALM,
        },
        async (error: Auth0Error | null, result: any) => {
          if (error) {
            const Toast = Swal.mixin({
              toast: false,
              position: "center",
              showConfirmButton: true,
            });
            Toast.fire({
              icon: "error",
              title: "Oops...",
              text: "El proceso de registro no ha sido exitoso. Por favor, intenta más tarde.",
            });
          } else {
            const Toast = Swal.mixin({
              toast: false,
              position: "center",
              showConfirmButton: true,
            });
            Toast.fire({
              icon: "success",
              title: "Enhorabuena...",
              text: "Bienvenido a AllTech. Revisa tu correo electrónico, recuerda que debes verificar tu cuenta antes de ingresar.",
            });
            navigate("/signin");
          }
        }
      );
    }
  };
  useEffect(() => {
    validateUserData();
    checkErrors();
  }, [
    userName,
    password,
    confirmPassword,
    firstName,
    lastName,
    userName,
    email,
    phoneNumber,
    province,
    city,
    address,
    zip,
    userNameError,
    passwordError,
    confirmPasswordError,
    firstNameError,
    lastNameError,
    userNameError,
    emailError,
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
      <Stack spacing={8} mx={"auto"} maxW={"600"} py={12} px={6}>
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
              <Input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </FormControl>
            <p className={style.errorMsj}>{userNameError}</p>
            <HStack>
              <Box>
                <FormControl id="password" isRequired>
                  <FormLabel className={style.largo}>Contraseña</FormLabel>
                  <InputGroup>
                    <Input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <InputRightElement h={"full"}></InputRightElement>
                  </InputGroup>
                </FormControl>
                <p className={style.errorMsj}>{passwordError}</p>
              </Box>
              <Box>
                <FormControl id="password" isRequired>
                  <FormLabel className={style.largo}>
                    Confirmar contraseña
                  </FormLabel>
                  <InputGroup>
                    <Input
                      type={showPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <InputRightElement h={"full"}>
                      <Button
                        variant={"ghost"}
                        onClick={() =>
                          setShowPassword((showPassword) => !showPassword)
                        }
                      >
                        {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
                <p className={style.errorMsj}>{confirmPasswordError}</p>
              </Box>
            </HStack>
            <HStack>
              <Box>
                <FormControl id="firstName" isRequired>
                  <FormLabel>Nombre</FormLabel>
                  <Input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </FormControl>
                <p className={style.errorMsj}>{firstNameError}</p>
              </Box>
              <Box>
                <FormControl id="lastName" isRequired>
                  <FormLabel>Apellido</FormLabel>
                  <Input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </FormControl>
                <p className={style.errorMsj}>{lastNameError}</p>
              </Box>
            </HStack>
            <HStack>
              <Box>
                <FormControl id="email" isRequired>
                  <FormLabel>Email</FormLabel>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FormControl>
                <p className={style.errorMsj}>{emailError}</p>
              </Box>
              <Box>
                <FormControl id="email" isRequired>
                  <FormLabel className={style.largo}>
                    Número telefónico
                  </FormLabel>
                  <Input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </FormControl>
                <p className={style.errorMsj}>{phoneNumberError}</p>
              </Box>
            </HStack>
            <HStack>
              <Box>
                <FormControl id="email" isRequired>
                  <FormLabel>Provincia</FormLabel>
                  <Select
                    placeholder="Provincia"
                    value={province}
                    onChange={(e) => setProvince(e.target.value)}
                  >
                    <option value="Buenos Aires">Buenos Aires</option>
                    <option value="Ciudad Autónoma de Buenos Aires">
                      Ciudad Autónoma de Buenos Aires
                    </option>
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
                    <option value="Santiago del Estero">
                      Santiago del Estero
                    </option>
                    <option value="Tierra del Fuego">Tierra del Fuego</option>
                    <option value="Tucumán">Tucumán</option>
                  </Select>
                </FormControl>
                <p className={style.errorMsj}>{provinceError}</p>
              </Box>
              <Box>
                <FormControl id="email" isRequired>
                  <FormLabel>Ciudad</FormLabel>
                  <Input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </FormControl>
                <p className={style.errorMsj}>{cityError}</p>
              </Box>
            </HStack>
            <HStack>
              <Box>
                <FormControl id="email" isRequired>
                  <FormLabel>Dirección</FormLabel>
                  <Input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </FormControl>
                <p className={style.errorMsj}>{addressError}</p>
              </Box>
              <Box>
                <FormControl id="email" isRequired>
                  <FormLabel className={style.largo}>Código Postal</FormLabel>
                  <Input
                    type="text"
                    value={zip}
                    onChange={(e) => setZip(e.target.value)}
                  />
                </FormControl>
                <p className={style.errorMsj}>{zipError}</p>
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
