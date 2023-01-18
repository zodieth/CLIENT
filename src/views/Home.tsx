import NavBar from "../components/NavBar/NavBar";
import style from "../app.module.css";
import SubNav from "../components/NavBar/SubNav";

function Home() {
  return (
    <div className={style.app}>
      <NavBar />
      <SubNav />
    </div>
  );
}

export default Home;
