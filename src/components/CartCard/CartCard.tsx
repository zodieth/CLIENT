import React, { useState } from "react";
import style from "./cartCard.module.css";
import { Button } from "@chakra-ui/react";
import { HiMinus, HiOutlinePlusSm } from "react-icons/hi";
import { useAppDispatch } from "../../hooks/hooks";
import { deleteFromCart } from "../../app/actionsCreators";
function CartCard(props: any) {
  const [counter, setCounter] = useState(1);

  const dispatch = useAppDispatch();

  const handleDelete = (value: {}) => {
    dispatch(deleteFromCart(value));
  };

  return (
    <div className={style.container}>
      <div className={style.card}>
        <div className={style.left}>
          <img className={style.img} src={props.img} alt="" />
          <div className={style.productName}>{props.name}</div>
          <div className={style.right}>
            <div className={style.counter}>
              <Button
                onClick={() => {
                  if (counter <= 1) {
                    setCounter(1);
                  } else {
                    setCounter(counter - 1);
                  }
                }}
              >
                <HiMinus />
              </Button>
              <Button>{counter}</Button>
              <Button
                onClick={() => {
                  setCounter(counter + 1);
                }}
              >
                <HiOutlinePlusSm />
              </Button>
            </div>
            <Button onClick={() => handleDelete(props)}>x</Button>
            <div className={style.price}> ${props.price}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartCard;
