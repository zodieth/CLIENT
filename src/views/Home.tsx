import NavBar from "../components/NavBar/NavBar";
import style from "../app.module.css";
import SubNav from "../components/NavBar/SubNav";
import Footer from "../components/Footer/Footer";
import Carousel from "../components/Carousel/Carousel";
import PauseOnHover from "../components/CarouselDown/CarouselDown";
import { useAppSelector, useAppDispatch } from '../app/hooks'
import { useEffect } from 'react'
import { fetchProductsApi, productsFilter, fetchBrandApi, fetchCategoryApi } from '../app/actionsCreators'
import CarouselDown from "../components/CarouselDown/CarouselDown";
import Cards from "../components/ProductCards/Cards";
import Filter from "../components/Filtro/filter";
import { useAuth0 } from "@auth0/auth0-react";

function Home() {
  const dispatch = useAppDispatch();
  const { loginWithRedirect, getAccessTokenSilently, user, isAuthenticated, isLoading, error } = useAuth0();

  useEffect(() => {
    console.log("My user: ", user);
    console.log("Authenticated: ", isAuthenticated);
    console.log("Loading: ", isLoading);
    console.log("Error: ", error);
  }, [user, isAuthenticated, isLoading, error]);

  useEffect(() => {
    if(isAuthenticated) {
      // loginWithRedirect();
      const getToken = async () => {
      const accessToken = await getAccessTokenSilently();
      console.log("Token: ", accessToken);
      const response = await fetch("http://localhost:3001/claims", { //Ejemplo real...
        method: "GET",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${accessToken}`
        },
      });
      const allClaims = await response.json();
      console.log("Claims: ", allClaims);
      return allClaims;
    };
    getToken();
    };
  }, [getAccessTokenSilently, isAuthenticated]);

  useEffect(() => {
    dispatch(fetchProductsApi());
    dispatch(fetchBrandApi());
    dispatch(fetchCategoryApi());
  }, [])

  return (
    <div className={style.app}>
      <NavBar />
      <Carousel />
      <Filter />
      <Cards/>
      <CarouselDown />
      <Footer />
    </div>
  );
}

export default Home;
