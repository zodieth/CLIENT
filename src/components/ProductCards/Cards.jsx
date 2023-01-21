import React from "react";
import ProductCard from "../ProductCard/ProductCard";
import style from "./cards.module.css";
import { useAppSelector } from '../../app/hooks'
import Pagination from '../Pagination/Pagination';
import { useEffect, useState } from 'react'

function Cards({products}) {



  return (
    <div>
      <div className={style.title}>Últimos ingresos</div>
      <div className={style.container}>
        {products
          ? products.allProducts.map((e) => {
              return <ProductCard name={e.name} key={e.name} price={e.price} img={e.images[0]} />;
            })
          : ""}
      </div>
      {/* <Pagination page={actualPage} total={getTotalPages()} onChange={((pageChange) => {
          setActualPage(pageChange)
        })}/> */}
    </div>
  );
}

export default Cards;
