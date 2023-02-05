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
