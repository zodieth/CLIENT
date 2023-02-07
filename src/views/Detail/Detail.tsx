import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  postQuestion,
  fetchProductsApi,
} from "../../app/actionsCreators";
import Footer from "../../components/Footer/Footer";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import NavBar from "../../components/NavBar/NavBar";
import interfaceProduct from "../../features/brands/interfaceBrand";
import style from "./detail.module.css";
import { HiOutlineShoppingCart, HiShoppingCart } from "react-icons/hi";
import { TbSend } from "react-icons/tb";
import { Button, LightMode, Textarea } from "@chakra-ui/react";
import { addToCart, deleteFromCart } from "../../app/actionsCreators";
import Swal from "sweetalert2";
import NuevoCarrusel from "./NuevoCarrusel";

function Detail(props: any) {
  const { name } = useParams();
  const products = useAppSelector((state: any) => state.products);
  const [ question, setQuestion ] = useState("");
  const dispatch = useAppDispatch();

  const findDetail = products?.allProducts.filter(
    (product: interfaceProduct) => product.name === name
  );

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

  const handleSubmitQuestion = () => {
    const question = document.querySelector<HTMLInputElement>('#pregunta');
    const email = localStorage.getItem("email")
    if(question?.value.length !== 0){
      try{
        dispatch(postQuestion(email, findDetail[0]._id, question?.value));
        createdAlert();
        question!.value = "";
      }catch (e){
        createdAlertError("Algo salio mal, pongase en contacot con un administrador")
      }
    }else{
      createdAlertError("Complete el campo pregunta antes de enviarla")
    }
  }

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

  const createdAlertError = (mensaje:string) => {
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

  return (
    <div>
      <div className={style.navBar}>
        <NavBar />
      </div>

      {!findDetail.length ? (
        <div>No se encontró el producto</div>
      ) : (
        findDetail.map((e: any) => {
          return (
            <div className={style.detail} key={e}>
              <div className={style.contenedor}>
                <div>
                  <div className={style.name}>{e.name}</div>
                  <img
                    src={e.images[0]}
                    alt="imgDetail"
                    className={style.imgDetail}
                  />
                  <h4 className={style.texto}>* Las imágenes se exhiben con fines ilustrativos.</h4>
                  <div className={style.price_cart}>
                    <div className={style.price}>US$ {e.price}</div>
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
                  <div className={style.calificacion}>
                    <div className={style.starsOuter}>
                      <div
                        className={style.starsInner}
                        style={{ width: `${startPercentage()}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
                <div className={style.right}>
                <div className={style.description}>{e.description}</div>
                </div>
              </div>

              <div className={style.preguntas}>
                <div>
                  <div className={style.tituloPreguntas}>Preguntas de nuestros clientes</div>
                  {e.questions.length>0?  
                  (e.questions.map((q:any)=>{
                    if(q.active)
                      return(
                        <div className={style.question}>
                          <dl>
                            <dt>{q.question}</dt>
                            <dd>└─ {q.answer}</dd>
                          </dl>
                        </div>
                      )
                })): (
                  <div className={style.question}>
                    Aún no hay preguntas sobre este producto, sé el primero
                  </div>)
                }
                </div>
                <div className={style.rigth}>
                  <div className={style.tituloPreguntas}>Dejanos tu consulta:</div>
                  <div className={style.newQuestion}> 
                    <Textarea name="Pregunta" id="pregunta" placeholder="Escribe tu pregunta aquí" ></Textarea>
                    <Button colorScheme="blue" onClick={handleSubmitQuestion}>
                      <h5>Enviar</h5>
                      <TbSend height={8} color={"white"}/>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          );
        })
      )}
      <div>
        <NuevoCarrusel />
        <LightMode><Footer /></LightMode>
      </div>
    </div>
  );
}

export default Detail;
