import { HiOutlineShoppingCart, HiShoppingCart } from "react-icons/hi";
import { BsHeartFill } from "react-icons/bs";
import style from "./productCard.module.css";
import { Button } from "@chakra-ui/react";
import { useState } from "react";
import { addToCart, deleteFromCart } from "../../app/actionsCreators";
import { useAppDispatch } from "../../app/hooks";
import interfaceProduct from "../../features/products/interfaceProduct";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

function ProductCard(props: any) {
  const [favorites, setFavorites] = useState<any>("");
  let local = localStorage.getItem("favorites");
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

  const dispatch = useAppDispatch();
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
    <div className={style.container}>
      <div className={style.card}>
        <Link to={`/productos/${props.name}`}>
          <div className={style.imgBx}>
            <img className={style.img} src={props.img} />
          </div>
        </Link>

        <div className={style.contentBx}>
          <div className={style.name}>
            <h2>{props.name}</h2>
          </div>

          <Button
            colorScheme="blue"
            className={style.cardShop}
            onClick={() =>
              onCart
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
            onClick={handleFavorite}
          >
            <BsHeartFill
              height={8}
              color={isFavorite(props.name) ? "red" : "white"}
            />
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
        <div className={style.price_Discount}>
          <div className={style.price}>${props.price}</div>
          <img
            src="https://www.qloud.com.ar/img/a12.svg"
            alt=""
            className={style.ahora12}
          />
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
