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
import { TbSend } from "react-icons/tb";
import { Box, Button, LightMode, Textarea } from "@chakra-ui/react";
import { addToCart, deleteFromCart } from "../../app/actionsCreators";
import Swal from "sweetalert2";
import NuevoCarrusel from "./NuevoCarrusel";
import ToggleColorMode from "../../components/DarkMode/ToggleColorMode";

function Detail(props: any) {
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

  const addCart = (value: any) => {
    let card = {
      name: value.name,
      price: value.price,
      img: value.images[0],
      reviews: value.reviews,
      description: value.description,
      count: 1,
    };

    dispatch(addToCart(card));
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

  //////////////////////////////

  type review = {
    review: number;
  };

  const startPercentage = () => {
    let total = 100;
    props.reviews?.forEach(function (a: review) {
      total += a.review;
    });
    const percentage = total / props.reviews?.length;
    const starPercentage = ((percentage ? percentage : 0 / 100) / 5) * 100;

    return starPercentage;
  };
  ///////////////////////////////////////////

  return (
    <Box>
      <Box className={style.navBar}>
      <NavBar />
      </Box>

      {!findDetail.length ? (
        <Box>No se encontró el producto</Box>
      ) : (
        findDetail.map((e: any) => {
          return (
            <Box className={style.detail} key={e}>
              <Box className={style.contenedor}>
                <Box>
                  <Box className={style.name}>{e.name}</Box>
                  <img
                    src={e.images[0]}
                    alt="imgDetail"
                    className={style.imgDetail}
                  />
                  <h4 className={style.texto}>* Las imágenes se exhiben con fines ilustrativos.</h4>
                  <Box className={style.price_cart}>
                    <Box className={style.price}>US$ {e.price}</Box>
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
                  </Box>
                  <Box className={style.calificacion}>
                    <Box className={style.starsOuter}>
                      <Box
                        className={style.starsInner}
                        style={{ width: `${startPercentage()}%` }}
                      ></Box>
                    </Box>
                  </Box>
                </Box>

                <Box className={style.right}>
                  <Box className={style.description}>{e.description}</Box>

                  
                </Box>
              </Box>

              <Box className={style.preguntas}>
                <Box>
                  <Box className={style.tituloPreguntas}>Preguntas de nuestros clientes</Box>
                  {e.questions.length>0?  
                  (e.questions.map((q:any)=>{
                    return(
                      <Box className={style.question}>
                        <dl>
                          <dt>{q.question}</dt>
                          <dd>└─ {q.answer}</dd>
                        </dl>
                      </Box>
                    )
                })): (
                  <Box className={style.question}>
                    Aún no hay preguntas sobre este producto, sé el primero
                  </Box>)
                }
                </Box>
                <Box className={style.rigth}>
                  <Box className={style.tituloPreguntas}>Dejanos tu consulta:</Box>
                  <Box className={style.newQuestion}> 
                    <Textarea name="Pregunta" id="pregunta" placeholder="Escribe tu pregunta aquí"></Textarea>
                    <Button colorScheme="blue">
                      <h5>Enviar</h5>
                      <TbSend height={8} color={"white"}/>
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Box>
          );
        })
      )}
      <Box>
      <LightMode><NuevoCarrusel /></LightMode>
        <LightMode><Footer /></LightMode>
      </Box>
    </Box>
  );
}

export default Detail;
