import NavBar from "../components/NavBar/NavBar";
import style from "../app.module.css";
import SubNav from "../components/NavBar/SubNav";
import Footer from "../components/Footer/Footer";
import Carousel from "../components/Carousel/Carousel";
import PauseOnHover from "../components/CarouselDown/CarouselDown";
import { useAppSelector, useAppDispatch } from '../app/hooks'
import { useEffect, useState } from 'react'
import { fetchProductsApi, productsFilter } from '../app/actionsCreators'
import CarouselDown from "../components/CarouselDown/CarouselDown";
import Cards from "../components/ProductCards/Cards";
import Pagination from '../components/Pagination/Pagination';
import interfaceProduct from "../features/products/interfaceProduct";

function Home() {
  const dispatch = useAppDispatch();
  

  useEffect(() => {
    dispatch(fetchProductsApi());
  }, [])

  const products = useAppSelector((state) => state.products);
  
  const prueba = () => {
    dispatch(productsFilter("", "PRICE", "DESC", 0, 0, "Laptop", "Asus"));
  }

  
  
  
  return (
    <div className={style.app}>
      <NavBar />
      <SubNav />
      <Carousel />
      <Cards products={products}/>
      
      <CarouselDown />
      <Footer />
    </div>
  );
}

export default Home;
