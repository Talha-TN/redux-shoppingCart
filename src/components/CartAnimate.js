import { useState, useEffect } from "react";
import { useTitle } from "../hooks/useTitle";
import { useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";

import { remove } from "../cartSlice/CartSlice";
import { useDispatch } from "react-redux";
import "./cartanimate.css";
export const CartAnimate = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.CartSlice.cartList);
  const total = useSelector((state) => state.CartSlice.total);
  const [isVisible, setIsVisible] = useState(false);
  useTitle("Cart");
  useEffect(() => {
    if (products.length > 0) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 3000); // Hide after 3 seconds
      return () => {
        clearTimeout(timer);
      };
    } else {
      // Ensure the animation hides if the last item is removed
      setIsVisible(false);
    }
  }, [products]);

  return (
    <div className={`cart-animate-wrapper ${isVisible ? "show" : ""}`}>
      <section className="cart">
        <div className="cart-items">
          <h1>
            Cart Items: {products.length} / ${total}
          </h1>
          {products.map((product) => (
            <div className="cart-item" key={product.id}>
              <img src={product.image} alt={product.name} />
              <div className="cart-item-details">
                <h2>{product.name}</h2>
                <p>{product.description}</p>
                <button
                  onClick={() => dispatch(remove(product))}
                  className="delete-btn"
                >
                  <MdDelete />
                </button>
              </div>
              <div className="cart-item-price">${product.price}</div>
            </div>
          ))}
        </div>
        <div className="cart-sidebar">
          <h2>Order Summary</h2>
          <p>Items: {products.length}</p>

          <div className="total-price">Total: ${total}</div>
          <a href="#" className="checkout-btn">
            Checkout
          </a>
        </div>
      </section>
    </div>
  );
};
