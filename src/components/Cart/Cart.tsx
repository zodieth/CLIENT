import React from "react";
import CartCard from "../CartCard/CartCard";
import NavBar from "../NavBar/NavBar";
import SubNav from "../NavBar/SubNav";
import style from "./cart.module.css";
import { Button } from "@chakra-ui/react";
import { useAppSelector } from "../../app/hooks";

function Cart() {
  const products = useAppSelector((state) => state.cart);

  return (
    <div>
      <NavBar />
      <SubNav />
      <div className={style.cards}>
        {products ? (
          products.cart.map((e: any) => {
            return <CartCard name={e.name} price={e.price} img={e.img} />;
          })
        ) : (
          <div>
            <div>No hay elementos en el carrito</div>
            <Button>Seguir comprando</Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
