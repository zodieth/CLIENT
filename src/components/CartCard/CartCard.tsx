import { useState } from "react";
import style from "./cartCard.module.css";
import { Box, Button } from "@chakra-ui/react";
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
    <Box className={style.container}>
      <Box className={style.card}>
        <Box className={style.left}>
          <img className={style.img} src={props.img} alt="" />
          <Box className={style.productName}>{props.name}</Box>
          <Box className={style.right}>
            <Box className={style.counter}>
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
              <Box className={style.price_Delete}>
                <Box className={style.price}> US$ {total}</Box>
                <Button
                  colorScheme="red"
                  height={8}
                  width={4}
                  onClick={() => handleDelete(props)}
                >
                  x
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default CartCard;
