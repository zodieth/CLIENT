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
import Testimonials from "../components/Testimonials/Testimonials";

function Home() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProductsApi());
    dispatch(fetchBrandApi());
    dispatch(fetchCategoryApi());
    loadScript();
  }, []);

/* BOT */
  function loadScript() {
    var Tawk_API:any = Tawk_API || {};
    var Tawk_LoadStart = new Date();
    var s1 = document.createElement("script");
    var s0 = document.getElementsByTagName("script")[0];
    s1.async = true;
    s1.src = 'https://embed.tawk.to/63ddf0564742512879116b39/1godf5l70';
    s1.charset = 'UTF-8';
    s1.setAttribute('crossorigin', '*');
    s0.parentNode?.insertBefore(s1, s0);
}
  return (
    <div>
        <div /* className={style.app} */>  
        {" "}
        {/* sacamos el estilo para que funcione el dark mode junto al archivo theme.js */}
          <NavBar />
          <Carousel />
          <LightMode>
            <Filter />
          </LightMode>
          <Cards />
          <Testimonials/>
          <CarouselDown />
          <LightMode>
            <Footer />
            </LightMode>
        </div>
    </div>
  );
}

export default Home;
