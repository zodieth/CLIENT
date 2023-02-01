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
import { useAuth0 } from "@auth0/auth0-react";
import { auth } from "../../auth0.service";

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

  // const { getAccessTokenSilently, loginWithRedirect } = useAuth0();

  const handleSignUp = () => {
    auth.signup({
      username: userName,
      email: email,
      password: password,
      connection: "Username-Password-Authentication"
    }, (error : Auth0Error | null, user : any) => {
      if(error) {
        //Debería haber un modal que informe al usuario que el proceso de registro no fue exitoso...
        console.log("Proceso de registro fallido, intente más tarde.");
      } else {
        console.log(user);
      };
    });
    // const signInAccessToken = getAccessTokenSilently();
    // const userAuth0Request = await fetch("https://dev-6d0rlv0acg7xdkxt.us.auth0.com/dbconnections/signup", {
    //     method: "POST",
    //     headers: {
    //       "content-type": "application/json",
    //       Authorization: `Bearer ${signInAccessToken}`
    //     },
    //     body: JSON.stringify({
    //       cliend_id: "2EHZJm086BzkgwY5HXmPeK5UnbHegBXl",
    //       email: email,
    //       password: password,
    //       connection: "Username-Password-Authentication",
    //       username: userName,
    //       given_name: firstName,
    //       family_name: lastName,
    //       // picture: "",
    //       user_metadata: {
    //         phone_number: phoneNumber,
    //         province: province,
    //         city: city,
    //         address: address,
    //         postal_code: postalCode
    //       }
    //     })
    // });
    // const userAuth0 = await userAuth0Request.json();
    // console.log("Auth0 user: ", userAuth0);
    //Será un alert hasta que tengamos un modal estándar para toda la aplicación...
    // window.alert(`Usuario creado exitosamente, te hemos enviado un correo electrónico para verificar tu cuenta, debes completar este proceso antes de poder usarla.`);
    // window.location.href = window.location.origin + "/signin";
  //   const authorizationAccessToken = getAccessTokenSilently();
  //   if(userAuth0) {
  //     const locationResponse = await fetch("http://localhost:3001/location", {
  //       method: "POST",
  //       headers: {
  //         "content-type": "application/json"
  //       },
  //       body: JSON.stringify({
  //         province,
  //         city,
  //         address,
  //         zip: postalCode
  //       })
  //     });
  //     const locationDB = await locationResponse.json();
  //     const locationId = locationDB._id;
  //     const userDB = await fetch("http://localhost:3001/user", {
  //       method: "POST",
  //       headers: {
  //         "content-type": "application/json",
  //         Authorization: `Bearer ${authorizationAccessToken}`
  //       },
  //       body: JSON.stringify({
  //         firstName: firstName,
  //         lastName: lastName,
  //         userName: userName,
  //         phoneNumber: phoneNumber,
  //         email: email,
  //         location: locationId
  //       })
  //     })
  //     console.log("DB user: ", userDB);
  // //   window.location.href = window.location.origin;
  //   };
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
            Sign up
          </Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to enjoy all of our cool products ✌️
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
              <FormLabel>Username</FormLabel>
              <Input type="text" value={userName}
                                  onChange={e => setUserName(e.target.value)}/>
            </FormControl>
            <HStack>
              <Box>
                <FormControl id="password" isRequired>
                  <FormLabel>Password</FormLabel>
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
                  <FormLabel>Confirm password</FormLabel>
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
                  <FormLabel>First Name</FormLabel>
                  <Input type="text"
                          value={firstName}
                          onChange={e => setFirstName(e.target.value)}/>
                </FormControl>
              </Box>
              <Box>
                <FormControl id="lastName" isRequired>
                  <FormLabel>Last Name</FormLabel>
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
                  <FormLabel>Phone number</FormLabel>
                  <Input type="tel"
                          value={phoneNumber}
                          onChange={e => setPhoneNumber(e.target.value)}/>
                </FormControl>
              </Box>
            </HStack>
            <HStack>
              <Box>
                <FormControl id="email" isRequired>
                  <FormLabel>Province/Territory</FormLabel>
                  <Select placeholder="Province/Territory"
                          value={province}
                          onChange={e => setProvince(e.target.value)}>
                    <option value="Alberta">Alberta</option>
                    <option value="British Columbia">British Columbia</option>
                    <option value="Manitoba">Manitoba</option>
                    <option value="New Brunswick">New Brunswick</option>
                    <option value="Newfoundland and Labrador">Newfoundland and Labrador</option>
                    <option value="Northwest Territories">Northwest Territories</option>
                    <option value="Nova Scotia">Nova Scotia</option>
                    <option value="Nunavut">Nunavut</option>
                    <option value="Ontario">Ontario</option>
                    <option value="Prince Edward Island">Prince Edward Island</option>
                    <option value="Quebec">Quebec</option>
                    <option value="Saskatchewan">Saskatchewan</option>
                    <option value="Yukon">Yukon</option>
                  </Select>
                </FormControl>
              </Box>
              <Box>
                <FormControl id="email" isRequired>
                  <FormLabel>City</FormLabel>
                  <Input type="text"
                          value={city}
                          onChange={e => setCity(e.target.value)}/>
                </FormControl>
              </Box>
            </HStack>
            <HStack>
              <Box>
                <FormControl id="email" isRequired>
                  <FormLabel>Address</FormLabel>
                  <Input type="text"
                          value={address}
                          onChange={e => setAddress(e.target.value)}/>
                </FormControl>
              </Box>
              <Box>
                <FormControl id="email" isRequired>
                  <FormLabel>Postal code</FormLabel>
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
                Sign up
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={"center"}>
                Already a user?{" "}
                <Link style={{ color: "blue" }} to="/signin" color={"blue.400"}>
                  Login
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
