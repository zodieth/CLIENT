import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
} from "@chakra-ui/react";
import NavBar from "../../components/NavBar/NavBar";
import style from "./preguntas.module.css";
import Footer from "../../components/Footer/Footer";

export default function PreguntasFrecuentes() {
  return (
    <div className={style.preguntasView}>
      <NavBar />
      <div className={style.container}>
        <h1 className={style.title}>PREGUNTAS FRECUENTES</h1>
        <Accordion className={style.preguntas} allowToggle display={"flex"}>
          <AccordionItem className={style.accordionItem}>
            <h2>
              <AccordionButton _expanded={{ bg: "#3182ce", color: "white" }}>
                <Box as="span" flex="1" textAlign="left">
                  ¿En qué zonas entregan?
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              Realizamos envíos a todo el país a través de la empresa logística
              Andreani. Hacemos envíos Express a Córdoba Capital con un servicio
              de transporte propio.
            </AccordionPanel>
          </AccordionItem>
          {/* ------------------------------------------------- */}
          <AccordionItem className={style.accordionItem}>
            <h2>
              <AccordionButton _expanded={{ bg: "#3182ce", color: "white" }}>
                <Box as="span" flex="1" textAlign="left">
                  ¿Cuál es el precio del envío?
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              Podés calcular el costo de envío indicando tu código postal en la
              sección “Ingrese su localidad”, dentro de cada publicación.
            </AccordionPanel>
          </AccordionItem>
          {/* ------------------------------------------------- */}
          <AccordionItem className={style.accordionItem}>
            <h2>
              <AccordionButton _expanded={{ bg: "#3182ce", color: "white" }}>
                <Box as="span" flex="1" textAlign="left">
                  ¿Puedo retirar mi pedido en la sucursal?
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              Sí, podés retirar tu pedido en nuestra sucursal. Ingresá al
              siguiente link para conocer los requisitos y los datos de la
              sucursal.
            </AccordionPanel>
          </AccordionItem>

          {/* ------------------------------------------------- */}
          <AccordionItem className={style.accordionItem}>
            <h2>
              <AccordionButton _expanded={{ bg: "#3182ce", color: "white" }}>
                <Box as="span" flex="1" textAlign="left">
                  ¿Puede retirar otra persona mi pedido a la sucursal de
                  AllTech?
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              Sí. Podés enviar una persona autorizada a retirar tu pedido en la
              sucursal. Tené en cuenta que previamente deberás haber enviado vía
              mail sus datos (Nombre, apellido y documento). La persona deberá
              presentarse en la sucursal con su documento.
            </AccordionPanel>
          </AccordionItem>
          {/* ------------------------------------------------- */}
          <AccordionItem className={style.accordionItem}>
            <h2>
              <AccordionButton _expanded={{ bg: "#3182ce", color: "white" }}>
                <Box as="span" flex="1" textAlign="left">
                  ¿Qué pasa si no me encuentro en mi domicilio en el momento en
                  que la logística que seleccioné acude a entregar mi pedido?
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              ¡No te preocupes! Puede recibir tu pedido un mayor de 18 años que
              se encuentre en tu domicilio. En el caso de que no haya nadie, la
              empresa de servicio logístico realizará un segundo intento de
              entrega en los siguientes días, y si no te encuentra nuevamente,
              tu pedido será entregado en la sucursal Andreani más cercana,
              donde tenés hasta 7 días para ir a retirarlo.
            </AccordionPanel>
          </AccordionItem>
          {/* ------------------------------------------------- */}
          <AccordionItem className={style.accordionItem}>
            <h2>
              <AccordionButton _expanded={{ bg: "#3182ce", color: "white" }}>
                <Box as="span" flex="1" textAlign="left">
                  ¿Es necesario que me haga una cuenta en su página para poder
                  comprar?
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              ¡No es necesario! Podés loguearte con tu cuenta de Google,
              Facebook, etc.
            </AccordionPanel>
          </AccordionItem>
          {/* ------------------------------------------------- */}
          <AccordionItem className={style.accordionItem}>
            <h2>
              <AccordionButton _expanded={{ bg: "#3182ce", color: "white" }}>
                <Box as="span" flex="1" textAlign="left">
                  ¿Qué pasa si me arrepiento de mi compra?
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              Si te arrepentís de tu compra y estás dentro del plazo de tiempo
              establecido por la Ley 24.240, podés acceder a éste link y te
              ayudaremos con el proceso de devolución.
            </AccordionPanel>
          </AccordionItem>
          {/* ------------------------------------------------- */}
          <AccordionItem className={style.accordionItem}>
            <h2>
              <AccordionButton _expanded={{ bg: "#3182ce", color: "white" }}>
                <Box as="span" flex="1" textAlign="left">
                  ¿Qué pasa si mi compra llega con desperfectos o si el producto
                  es diferente al que compré?
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              En ese caso, deberás contactarte con nosotros a la brevedad.
            </AccordionPanel>
          </AccordionItem>
          {/* ------------------------------------------------- */}
          <AccordionItem className={style.accordionItem}>
            <h2>
              <AccordionButton _expanded={{ bg: "#3182ce", color: "white" }}>
                <Box as="span" flex="1" textAlign="left">
                  ¿Puedo elegir en qué horario recibir mi producto?
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              Lamentablemente los horarios de entrega son horarios de corrido, y
              no dependen de nosotros, sino de la empresa de logística y su hoja
              de ruta. Te recomendamos indicar un domicilio donde haya un mayor
              de 18 años disponible para recibir tu pedido de 9 a 18, o en el
              caso de que no sea posible, podés solicitar envío a sucursal de
              Andreani.{" "}
            </AccordionPanel>
          </AccordionItem>
          {/* ------------------------------------------------- */}
          <AccordionItem className={style.accordionItem}>
            <h2>
              <AccordionButton _expanded={{ bg: "#3182ce", color: "white" }}>
                <Box as="span" flex="1" textAlign="left">
                  ¿Puedo hacer varios pedidos por separado y recibirlos juntos?{" "}
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              Lamentablemente no, ya que cada pedido se procesa por separado,
              con su respectivo N° de seguimiento.
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </div>
      <Footer />
    </div>
  );
}
