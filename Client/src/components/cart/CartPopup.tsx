// src/components/cart/CartPopup.tsx
import React, { useContext } from "react";
import { CartContext } from "../../context/CartProvider";
import "../../assets/Style/components/cart/CartPopup.scss";

const CartPopup: React.FC = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("CartPopup must be used within a CartProvider");
  }
  const { cartItems, handleAddToCart, handleRemoveFromCart, toggleCart } =
    context;

  // Calculate the overall total cost
  const totalCost = cartItems.reduce((acc, item) => acc + item.totalPrice, 0);

  const handlePayment = () => {
    // Here you could integrate with a payment gateway
    alert(`Proceeding to payment of $${totalCost.toFixed(2)}`);
  };

  return (
    <div className="cart-popup">
      <div className="cart-header">
        <h2>Your Cart</h2>
        <button onClick={toggleCart}>Close</button>
      </div>
      <ul>
        {cartItems.map((product, index) => (
          <li key={index}>
            <span>
              {index + 1}. {product.name}
            </span>
            <span>Price: ${product.price}</span>
            <span>Count: {product.count}</span>
            <span>Total: ${product.totalPrice}</span>
            <button onClick={() => handleRemoveFromCart(product)}>-</button>
            <button onClick={() => handleAddToCart(product)}>+</button>
          </li>
        ))}
      </ul>
      {cartItems.length === 0 && <p>Your cart is empty.</p>}
      {cartItems.length > 0 && (
        <div className="cart-footer">
          <p>Total: ${totalCost.toFixed(2)}</p>
          <button onClick={handlePayment}>Pay Now</button>
        </div>
      )}
    </div>
  );
};

export default CartPopup;
