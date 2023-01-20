import React, { Component } from "react";
import Slider from "react-slick";
import style from "./CarouselDown.module.css";

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
        <Slider {...settings} className={style.slider}>
          <div className={style.img1}>
            <img />
          </div>

            <div className={style.img2}>
              <img />
            </div>

          <div className={style.img3}>
          <img />
          </div>

          <div className={style.img4}>
          <img />
          </div>

          <div className={style.img5}>
          <img />
          </div>

          <div className={style.img6}>
          <img />
          </div>
        </Slider>
      </div>
    );
  }
}
