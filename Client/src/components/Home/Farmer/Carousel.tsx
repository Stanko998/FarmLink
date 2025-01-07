import React from "react";

import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Carousel.scss";

interface sampleArrow {
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  direction: "left" | "right";
}
const SampleArrow: React.FC<sampleArrow> = (props) => {
  const arrowClass = props.direction === "left" ? "leftArrow" : "rightArrow";
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} ${"customArrow"} ${arrowClass}`} // Applying both slick-carousel and custom styles
      style={{ ...style, display: "block", color: "black" }}
      onClick={onClick}
    />
  );
};
const settings = {
  slidesToShow: 3,
  autoplay: true,
  autoplaySpeed: 10000,
  nextArrow: <SampleArrow direction="right" />,
  prevArrow: <SampleArrow direction="left" />,
  responsive: [
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2, // Display two items for smaller screens
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1, // Display one item for very small screens
        slidesToScroll: 1,
      },
    },
  ],
};

export function Carousel(props: any): any {
  return (
    <Slider {...settings} className={"carouselContainer carousel-wrapper"}>
      {props.children}
    </Slider>
  );
}
