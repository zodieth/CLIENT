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
          <div>
            <h3>2</h3>
          </div>
          <div>
            <h3>3</h3>
          </div>
          <div>
            <h3>4</h3>
          </div>
          <div>
            <h3>5</h3>
          </div>
          <div>
            <h3>6</h3>
          </div>
        </Slider>
      </div>
    );
  }
}
