import NavBar from "../../components/NavBar/NavBar";
import style from "./buy.module.css";
import Footer from "../../components/Footer/Footer";
import { CheckCircleIcon } from "@chakra-ui/icons";
function ComoComprar() {
  return (
    <div className={style.container}>
      <NavBar />
      <div className={style.buy}>
        <h1 className={style.title}>
          ¿CÓMO COMPRAR EN ALLTECH?
          <CheckCircleIcon className={style.icon} />
        </h1>
        <div className={style.contenido}>
          Elegí el/los productos que deseas comprar. Hacé clic en el botón de
          “Agregar al carrito”. Esto agregará el producto a tu carrito de
          compras y te llevará al mismo. Para seguir comprando, clickeá en
          “Elegir más productos”. Clickeá en “Finalizar compra” para continuar.
          Ingresá tu mail para continuar la compra. Guardamos tu correo
          electrónico de manera 100% segura. Completá tus datos de contacto y
          clickeá en “Continuar” Ingresá la dirección a donde deseas recibir el
          producto o elegí un punto de retiro. Luego hacé clic en “Continuar”.
          Elegí el medio de pago. Una vez que hayas elegido el medio de pago,
          hacé clic en “Continuar”. Allí podrás finalizar la compra dentro de
          nuestra web, o serás redirigido a la pasarela de pagos, dependiendo la
          opción que hayas seleccionado. Clickeá en “Finalizar compra”.
          Recibirás por mail las notificaciones sobre el estado de tu pedido.
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ComoComprar;
