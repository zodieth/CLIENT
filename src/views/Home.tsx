import NavBar from "../components/NavBar/NavBar";
import style from "../app.module.css";
import SubNav from "../components/NavBar/SubNav";
import Footer from "../components/Footer/Footer";
import Carousel from "../components/Carousel/Carousel";
import PauseOnHover from "../components/CarouselDown/CarouselDown";
import { useAppSelector, useAppDispatch } from '../app/hooks'
import { useEffect } from 'react'
import { fetchProductsApi, productsFilter } from '../app/actionsCreators'
import CarouselDown from "../components/CarouselDown/CarouselDown";
import Cards from "../components/ProductCards/Cards";

function Home() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProductsApi());
  }, [])

  const countries = useAppSelector((state) => state.products);
  
  const prueba = () => {
    dispatch(productsFilter("", "PRICE", "DESC", 0, 0, "Laptop", "Asus"));
  }

  return (
    <div className={style.app}>
      <button onClick={prueba} > ASDASD</button>
      <NavBar />
      <SubNav />
      <Carousel />
      <Cards />
      <CarouselDown />
      <Footer />
    </div>
  );
}

export default Home;
