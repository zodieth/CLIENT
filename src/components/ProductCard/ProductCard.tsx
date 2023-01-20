import { FiShoppingCart } from "react-icons/fi";
import style from "./productCard.module.css";
import { Button } from "@chakra-ui/react";

function ProductCard(props: any) {
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
          <Button colorScheme="blue">
            <FiShoppingCart height={8} />
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
