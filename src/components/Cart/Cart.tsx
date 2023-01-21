import React from "react";
import CartCard from "../CartCard/CartCard";
import NavBar from "../NavBar/NavBar";
import SubNav from "../NavBar/SubNav";
import style from "./cart.module.css";
import { Button } from "@chakra-ui/react";

function Cart() {
  const products = [
    {
      name: "Cooler CPU Thermaltake UX100 ARGB",
      price: 3.569,
      img: "https://compragamer.net/pga/imagenes_publicadas/compragamer_Imganen_general_33637_Cooler_CPU_Thermaltake_UX100_ARGB_12a77695-grn.jpg",
    },
    {
      name: "Fuente Gamemax 600W 80 Plus Bronze RGB VP-600",
      price: 30.056,
      img: "https://compragamer.net/pga/imagenes_publicadas/compragamer_Imganen_general_32178_Fuente_Gamemax_600W_80_Plus_Bronze_RGB_VP-600_d558e971-grn.jpg",
    },
    {
      name: "Placa de Video Asrock RX 570 8GB GDDR5 Phantom Gaming Elite",
      price: 90.456,
      img: "https://compragamer.net/pga/imagenes_publicadas/compragamer_Imganen_general_28822_Placa_de_Video_Asrock_RX_570_8GB_GDDR5_Phantom_Gaming_Elite_9ecf3ec5-grn.jpg",
    },
  ];

  return (
    <div>
      <NavBar />
      <SubNav />
      <div className={style.cards}>
        {products ? (
          products.map((e) => {
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
