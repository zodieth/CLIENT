import { Box, useColorModeValue } from "@chakra-ui/react";
import style from "./armado.module.css";

function Card(props: any) {
  return (
    <Box >
      <Box  className={style.card}>
        <Box className={style.titleImg}>
          <img className={style.imgCard} src={props.img} alt="" />
          <Box>
            <Box className={style.name}>{props.name}</Box>
            <Box>US$ {props.price}</Box>
          </Box>
        </Box>
        <Box className={style.compatible}></Box>
      </Box>
    </Box>
  );
}

export default Card;
