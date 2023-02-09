import { ReactNode, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import {
  FiHome,
  FiSettings,
  FiMenu,
  FiBell,
  FiChevronDown,
  FiTrendingUp,
  FiCompass,
} from "react-icons/fi";
import { IconType } from "react-icons";
import { ReactText } from "react";
import { useAppDispatch } from "../../app/hooks";
import {
  fetchProductsApi,
  fetchBrandApi,
  fetchCategoryApi,
} from "../../app/actionsCreators";
import { auth } from "../../auth0.service";
import {
  AUTH0_CALLBACK_URL,
  AUTH0_CLIENT_ID,
  AUTH0_DOMAIN,
  AUTH0_MANAGEMENT_API_ACCESS_TOKEN,
} from "../../auth0.config";
import ToggleColorMode from "../../components/DarkMode/ToggleColorMode";
import DarkModeAdmin from "../../components/DarkMode/DarkModeAdmin";
import { useAppSelector } from "../../hooks/hooks";
import { Link } from "react-router-dom";

interface LinkItemProps {
  name: string;
  icon: IconType;
  url: string;
}

const LinkItems: Array<LinkItemProps> = [
  { name: "Home", icon: FiHome, url: "/" },
  { name: "Perfil", icon: FiTrendingUp, url: "/user/perfil" },
  {
    name: "Reclamos",
    icon: FiCompass,
    url: "/user/reclamos",
  },
  // { name: "Marcas", icon: FiStar, url: "/admin/brands" },
  // { name: "Usuarios", icon: FiSettings, url: "#" },
];

export default function SidebarWithHeader({
  children,
}: {
  children: ReactNode;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useAppDispatch();

  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      {" "}
      {/* el centro del panel */}
      <SidebarContent /* menu de la izquierda */
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  );
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

//formacion del menu de la izquierda
const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  return (
    <Box /* Menu de la izquierda y sus caracteristicas */
      transition="3s ease"
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      {" "}
      <DarkModeAdmin /> {/* boton modo noche */}
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Link to="/">
          <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
            AllTech
          </Text>
        </Link>

        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon} url={link.url}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: ReactText;
  url: string;
}

//items que van en el menu de la izquierda
const NavItem = ({ icon, children, url, ...rest }: NavItemProps) => {
  return (
    <Link
      to={url}
      style={{ textDecoration: "none" }}
      // _focus={{ boxShadow: "none" }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "cyan.400",
          color: "white",
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

interface MobileProps extends FlexProps {
  onOpen: () => void;
}

const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  const userState = useAppSelector((state) => state.user);

  const [userName, setUserName] = useState("");
  const [picture, setPicture] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const navigate = useNavigate();

  const accessToken = localStorage.getItem("accessToken");
  const activeSession = accessToken ? true : false;
  const handleLogout = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("accessToken");
    auth.logout({
      returnTo: AUTH0_CALLBACK_URL,
      clientID: AUTH0_CLIENT_ID,
    });
  };
  const handleUser = async () => {
    await auth.client.userInfo(
      accessToken,
      async (error: Auth0Error | null, user: Auth0UserProfile) => {
        if (error) {
          console.log("Error: ", error);
        } else {
          const userId = user.sub;
          const userRolesResponse = await fetch(
            `https://${AUTH0_DOMAIN}/api/v2/users/${userId}/roles`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${AUTH0_MANAGEMENT_API_ACCESS_TOKEN}`,
              },
            }
          );
          const userRoles = await userRolesResponse.json();
          const hasAdminRole = userRoles.some(
            (role: { id: String; name: String; description: String }) =>
              role.name === "alltech-admin"
          );
          setIsAdmin(hasAdminRole);
          setUserName(user.nickname);
          setPicture(user.picture);
        }
      }
    );
  };

  useEffect(() => {
    if (!activeSession) {
      navigate("/");
    } else {
      handleUser();
    }
  }, []);
  return (
    <Flex /* devuelta es la barra donde esta la parte del administrador arriba */
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-between", md: "flex-end" }}
      {...rest}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        display={{ base: "flex", md: "none" }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold"
      >
        AllTech
      </Text>

      <HStack spacing={{ base: "0", md: "6" }}>
        {" "}
        {/* seccion chiquita donde esta la parte del administrador */}{" "}
        {/* Arriba a la derecha */}
        <IconButton
          size="lg"
          variant="ghost"
          aria-label="open menu"
          icon={<FiBell />}
        />
        <Flex alignItems={"center"}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: "none" }}
            >
              <HStack>
                <Avatar size={"sm"} src={picture} />
                <VStack
                  display={{ base: "none", md: "flex" }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  <Text fontSize="sm">{userState.user.userName}</Text>
                  <Text fontSize="xs" color="gray.600">
                    {userState.user.userName}
                  </Text>
                </VStack>
                <Box display={{ base: "none", md: "flex" }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue("white", "gray.900")}
              borderColor={useColorModeValue("gray.200", "gray.700")}
            >
              <MenuItem onClick={() => navigate("/cart")}>
                Mi carrito de compras
              </MenuItem>
              <MenuItem onClick={() => navigate("/user")}>
                Mi cuenta de usuario
              </MenuItem>
              <MenuDivider />
              <MenuItem onClick={() => navigate("/")}>
                Volver a la tienda
              </MenuItem>
              <MenuItem onClick={handleLogout}>Cerrar sesión</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};
