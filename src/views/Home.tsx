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

function Home() {
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    dispatch(fetchProductsApi());
    dispatch(fetchBrandApi());
    dispatch(fetchCategoryApi());
  }, [])

  return (
    <div className={style.app}>
      <NavBar />
      {/* <SubNav /> */}
      <Carousel />
      <Filter />
      <Cards/>
      <CarouselDown />
      <Footer />
    </div>
  );
}

export default Home;
