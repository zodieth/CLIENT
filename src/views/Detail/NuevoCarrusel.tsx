import React from "react";
import style from "./NuevoCarrusel.module.css"

import foto1 from "./imagenes/aeroIcon.webp"
import foto2 from "./imagenes/asusIcon.webp"
import foto3 from "./imagenes/aeroIcon.webp"
import foto4 from "./imagenes/intelIcon.webp"
import foto5 from "./imagenes/razerIcon.webp"
import foto6 from "./imagenes/corsairIcon.webp"
import { LightMode } from "@chakra-ui/react";

export default function NuevoCarrusel() {
return (
<body>
    <div className={style.carrusel}>
            <div className={style.carruselitems}>
                <div className={style.carruselitem}>
                    <img src={foto1} />
                </div>
                <div className={style.carruselitem}>
                    <img src={foto2} />
                </div>
                <div className={style.carruselitem}>
                    <img src={foto4} />
                </div>
                <div className={style.carruselitem}>
                    <img src={foto5} />
                </div>
            </div>
    </div>
</body>
    
    );
};


