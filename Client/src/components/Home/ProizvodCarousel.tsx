import React from "react";

import Slider from "react-slick";

// Import slick-carousel CSS files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./ProizvodCarousel.module.scss"; // TODO module.scss radi samo unut ove skripte. odnosno samo tamo gde se koristi styles.imeklase

interface Product {
  title: string;
  image: string;
  unit: string;
  price: string;
  category: string;
}

interface ProizvodCarouselProps {
  products: Product[];
}
interface sampleArrow {
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  direction: "left" | "right";
}

const SampleArrow: React.FC<sampleArrow> = (props, direction) => {
  const arrowClass =
    direction === "left" ? styles.leftArrow : styles.rightArrow;
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} ${styles.customArrow} ${arrowClass}`} // Applying both slick-carousel and custom styles
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

const renderProduct = (item: Product, index: number) => (
  <div className={styles.carouselItem} key={index}>
    <img src={item.image} alt={item.title} className={styles.productImage} />
    <h3>{item.title}</h3>
    <div className={styles.productDetails}>
      <span>{item.unit}</span>
      <span>${item.price}</span>
    </div>
  </div>
);

const ProizvodCarousel: React.FC<ProizvodCarouselProps> = ({ products }) => {
  return (
    <div className="carousel-wrapper">
      <Slider {...settings} className={styles.carouselContainer}>
        {products.map(renderProduct)}
      </Slider>
    </div>
  );
};
export default ProizvodCarousel;
