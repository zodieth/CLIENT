import NavBar from "../../components/NavBar/NavBar";
import style from "./buy.module.css";
import Footer from "../../components/Footer/Footer";
import { CheckCircleIcon } from "@chakra-ui/icons";
import Perfil from "././Santiago/index"
import { Box, Grid, LightMode } from "@chakra-ui/react";
import PerfilMateo from "./Mateo";
import PerfilMatias from "./Matias";
import PerfilJuan from "./Juan";
import PerfilLourdes from "./Lourdes";
import PerfilLucas from "./Lucas";


function Nosotros() {
  return (
    <div className={style.container}>
      <NavBar />

      <Box>
  <Grid templateColumns="1fr 1fr 1fr" gap={2}>
    <Perfil />
    <PerfilLourdes />
    <PerfilMateo />
    <PerfilMatias />
    <PerfilJuan />
    <PerfilLucas />
  </Grid>
</Box>
      <LightMode><Footer /></LightMode>
    </div>
  );
}

export default Nosotros;