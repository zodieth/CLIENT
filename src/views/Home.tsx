import NavBar from "../components/NavBar/NavBar";
import style from "../app.module.css";
import SubNav from "../components/NavBar/SubNav";
import { CardComponent } from "../components/Card/CardComponent";
import productos from "../data/products.json";


function Home() {
  return (
    <div className={style.app}>
      <NavBar />
      <SubNav />
      {
        productos.products.map(p => {
          return (
            <CardComponent name={p.name} price={p.price} category={p.category} description={p.description} />
          )
        })
      }
    </div>
  );
}

export default Home;
