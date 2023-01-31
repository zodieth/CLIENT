import ProductCard from "../ProductCard/ProductCard";
import style from "./cards.module.css";
import { useAppSelector } from "../../app/hooks";
import Pagination from "../Pagination/Pagination";
import { useEffect, useState } from "react";

function Cards() {
  const [actualPage, setActualPage] = useState(1);
  const total_Page = 9;
  let productsPagination;
  const products = useAppSelector((state) => state.products);

  useEffect(() => {
    setActualPage(1);
  }, [products]);

  productsPagination = products.productsFilter.slice(
    (actualPage - 1) * total_Page,
    actualPage * total_Page - 1
  );

  const getTotalPages = () => {
    return Math.ceil(products.productsFilter.length / total_Page);
  };

  return (
    <div>
      <div className={style.title}>Últimos ingresos</div>
      <div className={style.container}>
        {products
          ? productsPagination.map((e) => {
              return (
                <ProductCard
                  name={e.name}
                  key={e.name}
                  price={e.price}
                  img={e.images[0]}
                  reviews={e.reviews}
                  count={1}
                />
              );
            })
          : ""}
      </div>
      <Pagination
        page={actualPage}
        total={getTotalPages()}
        onChange={(pageChange) => {
          setActualPage(pageChange);
        }}
      />
    </div>
  );
}

export default Cards;
