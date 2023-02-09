import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  postQuestion,
  fetchProductsApi,
  fetchSalesApi
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
import StarRating from "./StarRating";
import { auth } from "../../auth0.service";
import { AUTH0_CLIENT_ID, AUTH0_CALLBACK_URL } from "../../auth0.config";

function Detail(props: any) {
  const { name } = useParams();
  const products = useAppSelector((state: any) => state.products);
  const salesStore = useAppSelector((state: any) => state.sales);
  const userStore = useAppSelector((state: any) => state.user);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const dispatch = useAppDispatch();
  const findDetail = products?.allProducts.filter(
    (product: interfaceProduct) => product.name === name
  );

  useEffect(() => {
    dispatch(fetchProductsApi());
    dispatch(fetchSalesApi());
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

  const startPercentage = (product: any) => {
    let total = 0;
    product.reviews.forEach(function (a: review) {
      total += a.review;
    });
    const percentage = total / product.reviews.length;
    const starPercentage = ((percentage ? percentage : 0 / 100) / 5) * 100;
    
    return starPercentage;
  };
  ///////////////////////////////////////////

  const handleSubmitQuestion = () => {
    const question = document.querySelector<HTMLInputElement>("#pregunta");
    const email = localStorage.getItem("email");
    if (question?.value.length !== 0) {
      try {
        dispatch(postQuestion(email, findDetail[0]._id, question?.value));
        createdAlert();
        question!.value = "";
      } catch (e) {
        createdAlertError(
          "Algo salio mal, pongase en contacot con un administrador"
        );
      }
    } else {
      createdAlertError("Complete el campo pregunta antes de enviarla");
    }
  };

  const createdAlert = () => {
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
      title: "Pregunta enviada",
    });
  };

  const createdAlertError = (mensaje: string) => {
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
      icon: "error",
      title: "Oops...",
      text: `${mensaje}`,
    });
  };

  const accessToken = localStorage.getItem("accessToken");
  const activeSession = accessToken ? true : false;

  const handleUser = async () => {
    await auth.client.userInfo(
      accessToken,
      async (error: Auth0Error | null, user: Auth0UserProfile) => {
        if (error) {
          console.log("Error: ", error);
        } else {
          setIsLoggedIn(true);
        }
      }
    );
  };

  const handleLoginReminder = () => {
    const Toast = Swal.mixin({
      toast: false,
      position: "center",
      showConfirmButton: true,
    });
    Toast.fire({
      icon: "info",
      title: "Ten en cuenta...",
      text: "Para hacer una pregunta, debes iniciar sesión o registrarte. Haz click en 'Ingresar' en la esquina superior derecha de la ventana.",
    });
  };

  useEffect(() => {
    if (activeSession) {
      handleUser();
    }
  }, []);

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
                  <h4 className={style.texto}>
                    * Las imágenes se exhiben con fines ilustrativos.
                  </h4>
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
                    {
                    userStore.user ? 
                    salesStore.allSales.length > 0 ?
                    (
                      <>
                        {
                          salesStore.allSales.some((sale: any) => 
                            (sale.user._id === userStore.user._id && sale.products.some((product: any) => 
                              product.product._id === e._id
                            ))
                          ) ?
                            <StarRating product={e._id}/>
                          : 
                            <Box className={style.starsOuter}>
                              <Box
                                className={style.starsInner}
                                style={{ width: `${startPercentage(e)}%` }}
                              ></Box>
                            </Box>
                        }
                      </>
                    )
                  :
                    <Box className={style.starsOuter}>
                      <Box
                        className={style.starsInner}
                        style={{ width: `${startPercentage(e)}%` }}
                      ></Box>
                    </Box>
                    : 
                      <Box className={style.starsOuter}>
                        <Box
                          className={style.starsInner}
                          style={{ width: `${startPercentage(e)}%` }}
                        ></Box>
                      </Box>
                    }
                  </Box>
                </Box>
                <Box className={style.right}>
                  <Box className={style.description}>{e.description}</Box>
                </Box>
              </Box>

              <Box className={style.preguntas}>
                <Box>
                  <Box className={style.tituloPreguntas}>
                    Preguntas de nuestros clientes
                  </Box>
                  {e.questions.length > 0 ? (
                    e.questions.map((q: any) => {
                      if (q.active) {
                        return (
                          <Box className={style.question}>
                            <dl>
                              <dt>{q.question}</dt>
                              <dd>└─ {q.answer}</dd>
                            </dl>
                          </Box>
                        );
                      }
                    })
                  ) : (
                    <Box className={style.question}>
                      Aún no hay preguntas sobre este producto, sé el primero
                    </Box>
                  )}
                </Box>
                <Box className={style.rigth}>
                  <Box className={style.tituloPreguntas}>
                    Dejanos tu consulta:
                  </Box>
                  <Box className={style.newQuestion}>
                    <Textarea
                      name="Pregunta"
                      id="pregunta"
                      placeholder="Escribe tu pregunta aquí"
                    ></Textarea>
                    <Button
                      colorScheme="blue"
                      onClick={
                        isLoggedIn ? handleSubmitQuestion : handleLoginReminder
                      }
                    >
                      <h5>Enviar</h5>
                      <TbSend height={8} color={"white"} />
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Box>
          );
        })
      )}
      <Box>
        <LightMode>
          <NuevoCarrusel />
        </LightMode>
        <LightMode>
          <Footer />
        </LightMode>
      </Box>
    </Box>
  );
}

export default Detail;
