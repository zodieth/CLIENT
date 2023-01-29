import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  fetchBrandApi,
  fetchCategoryApi,
  fetchProductsApi,
  productsFilter,
} from "../../app/actionsCreators";
import Footer from "../../components/Footer/Footer";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import NavBar from "../../components/NavBar/NavBar";
import interfaceProduct from "../../features/brands/interfaceBrand";
import style from "./detail.module.css";
import { HiOutlineShoppingCart, HiShoppingCart } from "react-icons/hi";
import { Button } from "@chakra-ui/react";
import { addToCart, deleteFromCart } from "../../app/actionsCreators";
import Swal from "sweetalert2";

import NuevoCarrusel from "./NuevoCarrusel";

function Detail() {
  const { name } = useParams();
  const products = useAppSelector((state: any) => state.products);

  const findDetail = products?.allProducts.filter(
    (product: interfaceProduct) => product.name === name
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProductsApi());
  }, [dispatch]);

  const [onCart, setOncart] = useState(false);
  const onCartFuncion = () => {
    if (onCart === false) {
      setOncart(true);
    } else if (onCart === true) {
      setOncart(false);
    }
  };

  const addCart = (value: interfaceProduct) => {
    dispatch(addToCart(value));
  };

  const handleDeleteFromCart = (value: interfaceProduct) => {
    dispatch(deleteFromCart(value));
  };

  const addToCartAlert = () => {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });

    Toast.fire({
      icon: "success",
      title: "Agregado Correctamente",
    });
  };

  return (
    <div>
      <div className={style.navBar}>
        <NavBar />
      </div>
      
      {!findDetail.length ? (
        <div>No se encontró el producto</div>
      ) : (
        findDetail.map((e: any) => {
          console.log(e);

          return (
            <div className={style.detail} key={e}>
              
              <div className={style.contenedor}>
                <div>
                  <img
                    src={e.images[0]}
                    alt="imgDetail"
                    className={style.imgDetail}
                  />
                  
                  </div>
                  <div className={style.right}>
                    <div className={style.name}>{e.name}</div>
                        <div className={style.price_cart}>
                          <div className={style.price}>${e.price}</div>
                          <Button
                            colorScheme="blue"
                            onClick={() =>
                              onCart
                                ? [handleDeleteFromCart(e), onCartFuncion()]
                                : onCart === false
                                ? [addCart(e), onCartFuncion(), addToCartAlert()]
                                : ""
                            }
                          >
                            {onCart ? (
                              <HiShoppingCart />
                            ) : (
                              <HiOutlineShoppingCart height={8} color={"white"} />
                            )}
                          </Button>
                        </div>
                  </div>
                  <div className={style.texto}><h4>* Las imágenes se exhiben con fines ilustrativos.</h4></div>
              </div>
              
            </div>
            
          );
        })
      )}
      
      <div>
      
      <NuevoCarrusel/>
      <Footer />
      </div>
      
    </div>
  );
}

export default Detail;
