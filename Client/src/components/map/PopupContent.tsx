import React from "react";
// import ProizvodCarousel from "../home/ProizvodCarousel";
import { Farmer } from "../../Pages/Maps"; // Or a shared interface if you prefer

interface PopupContentProps {
  farmer: Farmer;
}

const PopupContent: React.FC<PopupContentProps> = ({ farmer }) => {
  return (
    <div>
      <h3>@{farmer.username}</h3>
      {/* If you have a product carousel, show it here */}
      {/* <ProizvodCarousel products={farmer.products} transitionSpeed={10000} /> */}
      {/* Or just list the products */}
      <ul>
        {farmer.products.map((p, idx) => (
          <li key={idx}>{p.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default PopupContent;
