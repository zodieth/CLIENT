import { useState, useEffect } from "react";
import CartCard from "../CartCard/CartCard";
import NavBar from "../NavBar/NavBar";
import SubNav from "../NavBar/SubNav";
import style from "./cart.module.css";
import { Box, Button, LightMode } from "@chakra-ui/react";
import { useAppSelector } from "../../app/hooks";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../hooks/hooks";
import { payMercadoPagoApi } from "../../app/actionsCreators";
import Footer from "../Footer/Footer";
import { sendProducts } from "../../app/actionsCreators";
import ToggleColorMode from "../DarkMode/ToggleColorMode";
import { auth } from "../../auth0.service";
import { AUTH0_CLIENT_ID, AUTH0_CALLBACK_URL } from "../../auth0.config";
import Swal from "sweetalert2";

function Cart() {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.cart);

  const usuario = useAppSelector((state) => state.user);

  const userEmail = localStorage.email;

  let total = products.cart.map((e: any) => {
    return e.price;
  });

  const [totalCompra, setTotalCompra] = useState(
    total.reduce((a: any, b: any) => a + b, 0)
  );

  const compra = {
    userEmail,
    products: products.cart,
    totalCompra,
  };

  const pay = async () => {
    let productos = products.cart;
    const data: any = await dispatch(payMercadoPagoApi(productos));
    var script = document.createElement("script");
    script.src =
      "https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js";
    script.type = "text/javascript";
    script.setAttribute("data-preference-id", data.body.id);
    const form = document.getElementById("pagar");
    form?.appendChild(script);
  };

  const [submitButton, setSubmitButton] = useState(false);
  const [submitDisappear, setSubmitDisappear] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  function sendToBack(value: any) {
    dispatch(sendProducts(value));
  }
  const accessToken = localStorage.getItem("accessToken");
  const activeSession = accessToken ? true : false;

  const handleUser = async () => {
    await auth.client.userInfo(
      accessToken,
      async (error: Auth0Error | null, user: Auth0UserProfile) => {
        if (error) {
          console.log("Error: ", error);
        } else {
          setIsLoggedIn(true);
        }
      }
    );
  };

  const handleLoginReminder = () => {
    const Toast = Swal.mixin({
      toast: false,
      position: "center",
      showConfirmButton: true,
    });
    Toast.fire({
      icon: "info",
      title: "Ten en cuenta...",
      text: "Para continuar con tu compra, debes iniciar sesión o registrarte. Haz click en 'Ingresar' en la esquina superior derecha de la ventana.",
    });
  };

  useEffect(() => {
    if (activeSession) {
      handleUser();
    }
  }, []);
  return (
    <Box className={style.cart}>
      <div className={style.nav}>
        <NavBar />
      </div>

      {/* <SubNav /> */}
      <Box color="Gray" borderColor="Gray">
        {products.cart.length ? (
          products.cart.map((e: any) => {
            return (
              <Box key={e.name}>
                <Box>
                  <CartCard
                    key={e.name}
                    totalCompra={totalCompra}
                    setTotalCompra={setTotalCompra}
                    name={e.name}
                    price={e.price}
                    img={e.img}
                  />
                </Box>
              </Box>
            );
          })
        ) : (
          <Box className={style.nothing}>
            <Box className={style.withouth_elements}>
              No hay elementos en el carrito
            </Box>
            <Link to="/">
              <Button width={200}>Seguir comprando</Button>
            </Link>
          </Box>
        )}
        {products.cart.length ? (
          <LightMode>
            <Box className={style.container_finish}>
              <Box className={style.finish}>
                <Box className={style.total}>
                  <LightMode>
                    <Box>TOTAL</Box>
                  </LightMode>
                  <Box>US$ {totalCompra}</Box>
                </Box>
                {submitDisappear === true ? (
                  <Box color="Gray" borderColor="Gray">
                    {" "}
                    <Button
                      color="Gray"
                      borderColor="Gray"
                      className={style.btn_finish}
                      onClick={
                        isLoggedIn
                          ? () => [
                              pay(),
                              setSubmitButton(true),
                              setInterval(() => {
                                setSubmitDisappear(false);
                              }, 1000),
                            ]
                          : handleLoginReminder
                      }
                      isLoading={submitButton}
                    >
                      Finalizar Compra
                    </Button>
                  </Box>
                ) : (
                  ""
                )}
                <form
                  onClick={() => [sendToBack(compra), console.log(compra)]}
                  className={style.mpPay}
                  id="pagar"
                  method="GET"
                ></form>
              </Box>
            </Box>{" "}
          </LightMode>
        ) : (
          ""
        )}
      </Box>
      <div className={style.footer}>
        <LightMode>
          <Footer />
        </LightMode>
      </div>
    </Box>
  );
}

export default Cart;
