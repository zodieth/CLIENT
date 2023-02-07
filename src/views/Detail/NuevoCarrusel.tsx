import React from "react";
import style from "./NuevoCarrusel.module.css"

import foto1 from "./imagenes/aeroIcon.webp"
import foto2 from "./imagenes/asusIcon.webp"
import foto3 from "./imagenes/aeroIcon.webp"
import foto4 from "./imagenes/intelIcon.webp"
import foto5 from "./imagenes/razerIcon.webp"
import foto6 from "./imagenes/corsairIcon.webp"
import { Box, LightMode } from "@chakra-ui/react";

export default function NuevoCarrusel() {
return (
<body>
    <Box className={style.carrusel}>
            <Box className={style.carruselitems}>
                <Box className={style.carruselitem}>
                    <img src={foto1} />
                </Box>
                <Box className={style.carruselitem}>
                    <img src={foto2} />
                </Box>
                <Box className={style.carruselitem}>
                    <img src={foto4} />
                </Box>
                <Box className={style.carruselitem}>
                    <img src={foto5} />
                </Box>
            </Box>
    </Box>
</body>
    
    );
};


