import { useState } from "react";
import CartCard from "../CartCard/CartCard";
import NavBar from "../NavBar/NavBar";
import SubNav from "../NavBar/SubNav";
import style from "./cart.module.css";
import { Button } from "@chakra-ui/react";
import { useAppSelector } from "../../app/hooks";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../hooks/hooks";
import { payMercadoPagoApi } from "../../app/actionsCreators";

function Cart() {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.cart);

  let total = products.cart.map((e: any) => {
    return e.price;
  });

  const [totalCompra, setTotalCompra] = useState(total.reduce((a: any, b: any) => a + b, 0));
  
  const pay = async () => {
    let productos = products.cart
    const data:any = await dispatch(payMercadoPagoApi(productos))

    var script = document.createElement("script");

    script.src = "https://www.mercadopago.com.uy/integrations/v1/web-payment-checkout.js";
    script.type = "text/javascript";
    script.setAttribute("data-preference-id", data.body.id);
    const form = document.getElementById("pagar");
    form?.appendChild(script);

  }

  return (
    <div>
      <NavBar />
      <SubNav />
      <div className={style.cards}>
        {products.cart.length ? (
          products.cart.map((e: any) => {
            return (
              <div key={e.name}>
                <div>
                  <CartCard
                    key={e.name}
                    totalCompra={totalCompra}
                    setTotalCompra={setTotalCompra}
                    name={e.name}
                    price={e.price}
                    img={e.img}
                  />
                </div>
              </div>
            );
          })
        ) : (
          <div className={style.nothing}>
            <div className={style.withouth_elements}>
              No hay elementos en el carrito
            </div>
            <Link to="/">
              <Button width={200}>Seguir comprando</Button>
            </Link>
          </div>
        )}
        {products.cart.length ? (
          <div className={style.container_finish}>
            <div className={style.finish}>
              <div className={style.total}>
                <div>TOTAL</div>

                <div>{totalCompra}</div>
              </div>
              <Button className={style.btn_finish} onClick={pay}>Finalizar Compra</Button>
              <form id="pagar" method="GET"></form>

            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default Cart;
