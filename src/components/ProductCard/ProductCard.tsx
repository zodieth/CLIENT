import { HiOutlineShoppingCart, HiShoppingCart } from "react-icons/hi";
import { BsHeartFill } from "react-icons/bs";
import style from "./productCard.module.css";
import { Box, Button } from "@chakra-ui/react";
import { useState } from "react";
import { addToCart, deleteFromCart } from "../../app/actionsCreators";
import { useAppDispatch } from "../../app/hooks";
import interfaceProduct from "../../features/products/interfaceProduct";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

function ProductCard(props: any) {
  const [favorites, setFavorites] = useState<any>("");
  let local = localStorage.getItem("favorites");
  const dispatch = useAppDispatch();
  const starTotal = 5;

  const handleFavorite = () => {
    local = localStorage?.getItem("favorites");
    if (!local) localStorage.setItem("favorites", "");

    if (local?.includes(props.name)) {
      const newFavorites = local.replace(props.name, "");
      localStorage.setItem("favorites", newFavorites);
      setFavorites(newFavorites);
    } else {
      localStorage.setItem("favorites", local!.concat(props.name + " "));
      setFavorites(local);
    }
  };

  const isFavorite = (name: string) => {
    local = localStorage.getItem("favorites");
    if (local?.includes(name)) {
      return true;
    }
    return false;
  };

  type review = {
    review: number;
  };

  const startPercentage = () => {
    let total = 0;
    props.reviews.forEach(function (a: review) {
      total += a.review;
    });
    const percentage = total / props.reviews.length;
    const starPercentage = ((percentage ? percentage : 0 / 100) / 5) * 100;

    return starPercentage;
  };

  const addCart = (value: interfaceProduct) => {
    dispatch(addToCart(value));
  };

  const [onCart, setOncart] = useState(false);
  const onCartFuncion = () => {
    if (onCart === false) {
      setOncart(true);
    } else if (onCart === true) {
      setOncart(false);
    }
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
    <Box className={style.container}>
      <Box className={style.card}>
        {props.stock < 1 ? (
          <Box className={style.imgBx}>
            <img className={style.img} src={props.img} />
          </Box>
        ) : (
          <Link to={`/productos/${props.name}`}>
            <Box className={style.imgBx}>
              <img className={style.img} src={props.img} />
            </Box>
          </Link>
        )}

        <Box className={style.contentBx}>
          <Box className={style.name}>
            <h2>{props.name}</h2>
          </Box>

          <Button
            colorScheme="blue"
            className={style.cardShop}
            onClick={() =>
              props.stock < 1
                ? ""
                : onCart
                ? [handleDeleteFromCart(props), onCartFuncion()]
                : onCart === false
                ? [addCart(props), onCartFuncion(), addToCartAlert()]
                : ""
            }
          >
            {onCart ? (
              <HiShoppingCart />
            ) : (
              <HiOutlineShoppingCart height={8} color={"white"} />
            )}
          </Button>
          <Button
            colorScheme="blue"
            className={style.favorite}
            onClick={() => (props.stock < 1 ? "" : handleFavorite())}
          >
            <BsHeartFill
              height={8}
              color={isFavorite(props.name) ? "red" : "white"}
            />
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
        <Box className={style.price_Discount}>
          <Box className={style.price}>US$ {props.price}</Box>

          {props.stock > 10 ? (
            <Box className={style.stock}>HAY STOCK</Box>
          ) : props.stock < 10 && props.stock > 1 ? (
            <Box className={style.pocoStock}>BAJO STOCK</Box>
          ) : props.stock < 1 ? (
            <Box className={style.sin}>NO DISPONIBLE</Box>
          ) : (
            ""
          )}

          <img
            src="https://www.qloud.com.ar/img/a12.svg"
            alt=""
            className={style.ahora12}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default ProductCard;
