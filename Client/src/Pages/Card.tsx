import { Link } from "react-router-dom";
import "../components/Home/Farmer/Card.scss";

interface Product {
  title: string;
  price: number;
  unit: string;
  image: string;
  farmerUsername: string; // We'll inject this property in Home.tsx
}

interface CardProps {
  product: Product;
}

export default function Card({ product }: CardProps) {
  return (
    <div className="product-card">
      {/* Farmer's name (links to their page, e.g., /:username) */}
      <Link to={`/${product.farmerUsername}`} className="farmer-link">
        {product.farmerUsername}
      </Link>

      {/* Product image */}
      <img src={product.image} alt={product.title} className="product-image" />

      {/* Product details */}
      <h3 className="product-title">{product.title}</h3>
      <p className="product-price">
        Price: {product.price} / {product.unit}
      </p>
    </div>
  );
}
