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
import ToggleColorMode from "../components/DarkMode/ToggleColorMode"; // dark mode
import { LightMode } from "@chakra-ui/react";

function Home() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProductsApi());
    dispatch(fetchBrandApi());
    dispatch(fetchCategoryApi());
  }, []);

  return (
    <div>
        <div /* className={style.app} */>  {/* sacamos el estilo para que funcione el dark mode junto al archivo theme.js */}
          <ToggleColorMode /> {/* boton dark mode */}
          <NavBar />
          <Carousel />
          <LightMode><Filter /></LightMode>
          <Cards />
          <CarouselDown />
          <LightMode><Footer /></LightMode>
        </div>
    </div>
    
  );
}

export default Home;
