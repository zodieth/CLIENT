import NavBar from "../../components/NavBar/NavBar";
import style from "./politicas.module.css";
import Footer from "../../components/Footer/Footer";
import { CheckCircleIcon } from "@chakra-ui/icons";
import { Box, Textarea } from "@chakra-ui/react";

function Politicas() {
  return (
    <Box className={style.container}>
      <NavBar />
      <Box className={style.buy}>
        <h1 className={style.title}>
        POLÍTICAS DE PRIVACIDAD
          <CheckCircleIcon className={style.icon} />
        </h1>
        <Box className={style.contenido}>
        <Box>INFORMACIÓN QUE RECOPILAMOS AUTOMÁTICAMENTE.</Box> 
En AllTech nos comprometemos a respetar su privacidad y no recolectar información personal sin el consentimiento de los usuarios que utilicen nuestros sitios web.
Al visitar AllTech o cualquier otra página enlazada, características, contenido, aplicaciones móviles, y cualquier otro servicio que ofrecemos de vez en cuando, en relación con cualquiera de los anteriores (colectivamente, los “Sitios”), por la presente reconoce y consiente a los términos de la presente Política de Privacidad. Si usted tiene preguntas o quejas con respecto a nuestra Política de Privacidad o las prácticas de las mismas, por favor contáctese con nosotros.
Como usted utiliza nuestros Sitios, queremos ser claros sobre cómo nos preocupamos por cómo se utiliza y comparte su información personal, así como las formas en que usted puede proteger su privacidad. 
Nuestra política de privacidad puede cambiar, publicando cualquier cambio en el sitio. Si los cambios son significativos, entonces le proporcionaremos un aviso más prominente, el cual será publicado en este sitio antes de que los cambios entren en funcionamiento. Cada vez que un usuario accede a los Sitios, verá la versión actual de la Política de Privacidad.   
                
 
       </Box>
      </Box>
      <Footer />
    </Box>
    
  );
}

export default Politicas;