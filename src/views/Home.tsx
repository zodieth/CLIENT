import NavBar from "../components/NavBar/NavBar";
import style from "../app.module.css";
import SubNav from "../components/NavBar/SubNav";
import Footer from "../components/Footer/Footer";
import Carousel from "../components/Carousel/Carousel";
import PauseOnHover from "../components/CarouselDown/CarouselDown";
import ProductsCard from "../components/ProductsCard/ProductsCard";

function Home() {
  return (
    <div className={style.app}>
      <NavBar />
      <SubNav />
      <Carousel />
      <ProductsCard />
      <PauseOnHover />
      <Footer />
    </div>
  );
}

export default Home;
