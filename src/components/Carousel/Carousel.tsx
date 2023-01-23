import React from "react";
import Slider from "react-slick";
import { Box, IconButton, useBreakpointValue } from "@chakra-ui/react";
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";

const settings = {
  // dots: true,
  arrows: false,
  fade: true,
  infinite: true,
  autoplay: true,
  speed: 500,
  autoplaySpeed: 4000,
  slidesToShow: 1,
  slidesToScroll: 1,
};

export default function Carousel() {
  const [slider, setSlider] = React.useState<Slider | null>(null);

  const top = useBreakpointValue({ base: "90%", md: "50%" });
  const side = useBreakpointValue({ base: "10%", md: "10px" });

  const cards = [
    "https://www.qloud.com.ar/SITES/IMG/hypergaming-01-2020/117_07-12-2022-05-12-05-banner-mundo-itx.jpg",
    "https://media.discordapp.net/attachments/1064640307213377546/1065686851014365285/image_2.png?width=1920&height=400",
    // "https://www.lavoz.com.ar/resizer/S-ccGwfM3cMYCJUq7gHngfUVYEA=/1023x683/smart/cloudfront-us-east-1.images.arcpublishing.com/grupoclarin/6BNOR4YHWRHPPE35CK4XR2FMVU.jpg",
    // "https://blog.tiendasishop.com/wp-content/uploads/2022/07/productos-tecnologicos-2.webp",
  ];

  return (
    <Box height={"400px"} width={"full"} overflow={"hidden"}>
      <link
        rel="stylesheet"
        type="text/css"
        charSet="UTF-8"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
      />
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
      />

      {/* <IconButton
        aria-label="left-arrow"
        colorScheme="messenger"
        borderRadius="full"
        position="absolute"
        left={side}
        top={top}
        transform={"translate(0%, -50%)"}
        zIndex={2}
        onClick={() => slider?.slickPrev()}
      >
        <BiLeftArrowAlt />
      </IconButton>

      <IconButton
        aria-label="right-arrow"
        colorScheme="messenger"
        borderRadius="full"
        position="absolute"
        right={side}
        top={top}
        transform={"translate(0%, -50%)"}
        zIndex={2}
        onClick={() => slider?.slickNext()}
      >
        <BiRightArrowAlt />
      </IconButton> */}
      {/* Slider */}
      <Slider {...settings} ref={(slider: any) => setSlider(slider)}>
        {cards.map((url, index) => (
          <Box key={index} height={"6xl"} backgroundImage={`url(${url})`} />
        ))}
      </Slider>
    </Box>
  );
}
