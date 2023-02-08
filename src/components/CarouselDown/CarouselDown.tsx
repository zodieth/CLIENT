import React, { Component } from "react";
import Slider from "react-slick";
import style from "./CarouselDown.module.css";
import foto1 from "./imagenes/aeroIcon.webp"
import foto2 from "./imagenes/asusIcon.webp"
import foto3 from "./imagenes/aeroIcon.webp"
import foto4 from "./imagenes/intelIcon.webp"
import foto5 from "./imagenes/razerIcon.webp"
import foto6 from "./imagenes/corsairIcon.webp"

export default class PauseOnHover extends Component {
  render() {
    var settings = {
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000,
      pauseOnHover: true,
    };

    return (
      <div className={style.div1}>
        <Slider  {...settings} className={style.slider}>
          <div className={style.img}>
          <img src={foto1} />
          </div>

            <div className={style.img}>
            <img src={foto2} />
            </div>

          <div className={style.img}>
          <img src={foto3} />
          </div>

          <div className={style.img}>
          <img src={foto4} />
          </div>

          <div className={style.img}>
          <img src={foto5} />
          </div>

          <div className={style.img}>
          <img src={foto6} />
          </div>
        </Slider>
      </div>
    );
  }
}
