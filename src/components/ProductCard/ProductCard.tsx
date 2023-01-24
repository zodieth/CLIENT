import { FiShoppingCart } from "react-icons/fi";
import { BsHeartFill } from "react-icons/bs";
import style from "./productCard.module.css";
import { Button } from "@chakra-ui/react";
import { useState } from "react";
import { addToCart } from "../../app/actionsCreators";
import { useAppDispatch } from "../../app/hooks";

function ProductCard(props: any) {
  const [favorites, setFavorites] = useState<any>("");
  let local = localStorage.getItem("favorites");

  const handleFavorite = () => {
    local = localStorage?.getItem("favorites");
    if (local?.includes(props.name)) {
      const newFavorites = local.replace(props.name + " ", "");
      localStorage.setItem("favorites", newFavorites);
      setFavorites(newFavorites);
      console.log("HOLA");
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

  const dispatch = useAppDispatch();
  const addCart = (value: {}) => {
    dispatch(addToCart(value));
  };

  return (
    <div className={style.container}>
      <div className={style.card}>
        <div className={style.imgBx}>
          <img className={style.img} src={props.img} />
        </div>
        <div className={style.contentBx}>
          <div className={style.name}>
            <h2>{props.name}</h2>
          </div>
          <Button
            colorScheme="blue"
            className={style.cardShop}
            onClick={() => addCart(props)}
          >
            <FiShoppingCart height={8} />
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
