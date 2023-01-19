import NavBar from "../components/NavBar/NavBar";
import style from "../app.module.css";
import SubNav from "../components/NavBar/SubNav";
import Footer from "../components/Footer/Footer";
import FooterTwo from "../components/FooterTwo/FooterTwo";

function Home() {
  return (
    <div className={style.app}>
      <NavBar />
      <SubNav />
      <FooterTwo />
      <Footer />
    </div>
  );
}

export default Home;
