import NavBar from "../components/NavBar/NavBar";
import style from "../app.module.css";
import SubNav from "../components/NavBar/SubNav";
import Footer from "../components/Footer/Footer";
import Carousel from "../components/Carousel/Carousel";
import PauseOnHover from "../components/CarouselDown/CarouselDown";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { useEffect } from "react";
import {
  fetchProductsApi,
  productsFilter,
  fetchBrandApi,
  fetchCategoryApi,
} from "../app/actionsCreators";
import CarouselDown from "../components/CarouselDown/CarouselDown";
import Cards from "../components/ProductCards/Cards";
import Filter from "../components/Filtro/filter";
import { auth } from "../auth0.service";
import ToggleColorMode from "../components/DarkMode/ToggleColorMode"; // dark mode
import { LightMode } from "@chakra-ui/react";

function Home() {

  const session = () => {
    const accessToken = localStorage.getItem("accessToken");
    const userScope = localStorage.getItem("scope");
    const sessionState = localStorage.getItem("state");
  };
  
  useEffect(() => {
    session();
  }, [session]);

  const dispatch = useAppDispatch();
  // const {
  //   loginWithRedirect,
  //   getAccessTokenSilently,
  //   user,
  //   isAuthenticated,
  //   isLoading,
  //   error,
  // } = useAuth0();

  // useEffect(() => {
  //   console.log("My user: ", user);
  //   console.log("Authenticated: ", isAuthenticated);
  //   console.log("Loading: ", isLoading);
  //   console.log("Error: ", error);
  // }, [user, isAuthenticated, isLoading, error]);

  // useEffect(() => {
  //   if (isAuthenticated) {
  //     const getToken = async () => {
  //       const accessToken = await getAccessTokenSilently();
  //       console.log("Token: ", accessToken);
  //       const response = await fetch("http://localhost:3001/claims", {
  //         //Ejemplo real...
  //         method: "GET",
  //         headers: {
  //           "content-type": "application/json",
  //           Authorization: `Bearer ${accessToken}`,
  //         },
  //       });
  //       const allClaims = await response.json();
  //       console.log("Claims: ", allClaims);
  //       return allClaims;
  //     };
  //     getToken();
  //   }
  // }, [getAccessTokenSilently, isAuthenticated]);

  useEffect(() => {
    dispatch(fetchProductsApi());
    dispatch(fetchBrandApi());
    dispatch(fetchCategoryApi());
    //loadScript();
  }, []);

/*   function loadScript() {
    var ldk = document.createElement('script'); ldk.type = 'text/javascript'; ldk.async = true; ldk.src = 'https://s.cliengo.com/weboptimizer/63d9c2f6c9293c0029564cc9/63d9c2fac9293c0029564ccc.js?platform=view_installation_code'; var s = document.getElementsByTagName('script')[0]; s.parentNode!.insertBefore(ldk, s);
  } */
  return (
    <div>
        <div /* className={style.app} */>  {/* sacamos el estilo para que funcione el dark mode junto al archivo theme.js */}
          <ToggleColorMode />
          <NavBar />
          <Carousel />
          <Filter />
          <Cards />
          <CarouselDown />
          <LightMode><Footer /></LightMode>
        </div>
    </div>
    
  );
}

export default Home;
