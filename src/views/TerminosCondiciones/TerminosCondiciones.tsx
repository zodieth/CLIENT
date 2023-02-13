import NavBar from "../../components/NavBar/NavBar";
import style from "./buy.module.css";
import Footer from "../../components/Footer/Footer";
import { CheckCircleIcon } from "@chakra-ui/icons";
import { Box } from "@chakra-ui/react";

function TerminosCondiciones() {
  return (
    <Box className={style.container}>
      <NavBar />
      <Box className={style.buy}>
        <h1 className={style.title}>
        TÉRMINOS Y CONDICIONES
          <CheckCircleIcon className={style.icon} />
        </h1>
        <Box className={style.contenido}>
        Si el Usuario interactúa y/o utiliza el Sitio de cualquiera de las maneras posibles o crea una Cuenta de Usuario, se entenderá que ha aceptado plenamente y sin reservas estos Términos y Condiciones de Uso y la Política de Privacidad, los cuales son obligatorios y vinculantes para todos los Usuarios. En consecuencia, el Usuario se obliga a cumplir con todas las disposiciones contenidas en estos Términos y Condiciones de Uso, bajo las leyes aplicables, normas, reglamentos y regulaciones aplicables al uso del Sitio, como así también se obliga a respetar y cumplir todas las condiciones complementarias informadas por AllTech o que consten en el Sitio.
            <Box>
                <Box>Finalidad del sitio web y capacidad de compra:</Box>
            El sitio web está destinado a la venta online de productos de tecnología. Pueden utilizar el servicio únicamente personas mayores de edad con capacidad legal para contratarlo, y que acepten los presentes términos y condiciones. El uso del Sitio por parte de quienes carecieran de capacidad legal para hacerlo será responsabilidad de los padres, tutores o de quienes los representen legalmente. En el caso de Usuarios de empresas, la persona física registrada como usuario, deberá contar con capacidad para contratar en nombre de la entidad y de obligar a la misma bajo los términos de las presentes condiciones de uso. En caso de que el Usuario no comprenda cabalmente o no esté de acuerdo con los Términos y Condiciones que rigen el uso del Sitio, debe abstenerse de utilizarlo.

            </Box>

                <Box>Registro sesión usuarios:</Box>
            El registro de usuarios al completar los datos(Ya sea en un formulario, asociando las cuentas de Google etc) es obligatorio.
            Los datos deberán ser precisos, válidos, correctos y actuales, siendo exclusiva responsabilidad del usuario verificar que los datos sean correctos.
            El usuario se compromete a informar de manera inmediata respecto de cualquier cambio, manteniendo los datos personales actualizados, siendo enteramente responsable frente a daños y perjuicios que el incumplimiento de dicha obligación pudiere acarrearle.

       </Box>
      </Box>
      <Footer />
    </Box>
    
  );
}

export default TerminosCondiciones;