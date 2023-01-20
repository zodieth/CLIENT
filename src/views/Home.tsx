import NavBar from "../components/NavBar/NavBar";
import style from "../app.module.css";
import SubNav from "../components/NavBar/SubNav";
import Footer from "../components/Footer/Footer";
import Carousel from "../components/Carousel/Carousel";
import CarouselDown from "../components/CarouselDown/CarouselDown";
import Cards from "../components/ProductCards/Cards";

function Home() {
  return (
    <div className={style.app}>
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
