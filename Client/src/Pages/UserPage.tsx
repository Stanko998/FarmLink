import { useState } from "react";
import { useParams } from "react-router-dom";
import productsData from "../home/Proizvodi.json";
import "./UserPage.scss";
import { CartContext } from "../cart/CartProvider";

const UserPage = () => {
  const { username } = useParams();
  //   const { handleAddToCart } = useContext(CartContext); // Access updateCart from CartContext
  const [records, setRecords] = useState<any>([]);

  async function getRecords() {
    const res = await fetch("http://localhost:5050/farmer/");
    if (!res.ok) {
      const message = "An error ";
      console.log(message);
      return;
    }
    const records = await res.json();
    setRecords(records);
  }
  getRecords();

  // Find the farmer by username
  const farmer = productsData.find((farmer) => farmer.username === username);

  if (!farmer) {
    return <p>User not found</p>;
  }

  return (
    <div className="user-page">
      <h1>@{farmer.username}</h1>
      <p>
        <strong>Location:</strong> {farmer.place}, {farmer.municipality}
      </p>
      <h2>Products</h2>
      <div className="products-list">
        {farmer.products.map((product, index) => (
          <div className="product-card" key={index}>
            <img
              src={product.image}
              alt={product.title}
              className="product-image"
            />
            <h3>{product.title}</h3>
            <p>
              <strong>Unit:</strong> {product.unit}
            </p>
            <p>
              <strong>Price:</strong> {product.price}
            </p>
            <button
              className="cart-button"
              onClick={() =>
                handleAddToCart(
                  {
                    name: product.title,
                    price: parseFloat(product.price.replace("$", "")),
                  },
                  "add"
                )
              }
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserPage;
