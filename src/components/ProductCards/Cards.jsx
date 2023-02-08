import ProductCard from "../ProductCard/ProductCard";
import style from "./cards.module.css";
import { useAppSelector } from "../../app/hooks";
import Pagination from "../Pagination/Pagination";
import { useEffect, useState } from "react";
import { LightMode, Box } from "@chakra-ui/react";

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
    <Box>
      <Box className={style.container}>
        {products.isLoading ? (
          <Box className={style.loading}></Box>
        ) : products.errMess ? (
          <Box className={style.error}></Box>
        ) : products ? (
          productsPagination.map((e) => {
            if(e.active)
              return (
                <ProductCard
                  name={e.name}
                  key={e.name}
                  price={e.price}
                  img={e.images[0]}
                  reviews={e.reviews}
                  count={1}
                  stock={e.stock}
                />
              );
          })
        ) : (
          ""
        )}
      </Box>
      <Pagination
        page={actualPage}
        total={getTotalPages()}
        onChange={(pageChange) => {
          setActualPage(pageChange);
        }}
      />
    </Box>
  );
}

export default Cards;
