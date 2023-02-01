import { useState } from "react";
import style from "./cartCard.module.css";
import { Button } from "@chakra-ui/react";
import { HiMinus, HiOutlinePlusSm } from "react-icons/hi";
import { useAppDispatch } from "../../hooks/hooks";
import { deleteFromCart } from "../../app/actionsCreators";
import interfaceProduct from "../../features/products/interfaceProduct";
import { addCountCart, removeCountCart } from "../../app/actionsCreators";

function CartCard(props: any) {
  const [quantity, setQuantity] = useState(1);

  const dispatch = useAppDispatch();

  const handleDelete = (value: interfaceProduct) => {
    props.setTotalCompra(props.totalCompra - props.price * quantity);
    dispatch(deleteFromCart(value));
    dispatch(removeCountCart(props.name, quantity));
  };

  let [total, setTotal] = useState(props.price);

  return (
    <div className={style.container}>
      <div className={style.card}>
        <div className={style.left}>
          <img className={style.img} src={props.img} alt="" />
          <div className={style.productName}>{props.name}</div>
          <div className={style.right}>
            <div className={style.counter}>
              <Button
                onClick={() =>
                  quantity <= 1
                    ? setQuantity(1)
                    : [
                        setQuantity(quantity - 1),
                        setTotal(total - props.price),
                        props.setTotalCompra(props.totalCompra - props.price),
                        dispatch(removeCountCart(props.name, 1)),
                      ]
                }
              >
                <HiMinus />
              </Button>
              <Button>{quantity}</Button>
              <Button
                onClick={() => [
                  setTotal(total + props.price),
                  setQuantity(quantity + 1),
                  props.setTotalCompra(props.totalCompra + props.price),
                  dispatch(addCountCart(props.name)),
                ]}
              >
                <HiOutlinePlusSm />
              </Button>
              <div className={style.price_Delete}>
                <div className={style.price}> US$ {total}</div>
                <Button
                  colorScheme="red"
                  height={8}
                  width={4}
                  onClick={() => handleDelete(props)}
                >
                  x
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartCard;
