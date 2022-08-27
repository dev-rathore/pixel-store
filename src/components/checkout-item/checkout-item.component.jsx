import Noty from "noty";

import "noty/lib/noty.css";
import "noty/lib/themes/sunset.css";

import { useContext } from "react";

import { CartContext } from "../../contexts/cart.context";

import "./checkout-item.styles.scss";

const CheckoutItem = ({ cartItem }) => {
  const { name, imageUrl, price, quantity } = cartItem;

  const { clearItemFromCart, addItemToCart, removeItemToCart } =
    useContext(CartContext);

  const clearItemHandler = () => {
    new Noty({
      type: "success",
      text: `<i class="fa-solid fa-trash" style="margin-right: 8px"></i> Product Removed`,
      layout: "topCenter",
      theme: "sunset",
      timeout: 3000,
    }).show();
    clearItemFromCart(cartItem);
  };
  const addItemHandler = () => {
    new Noty({
      type: "alert",
      text: `<i class="fa-solid fa-arrow-up-long" style="margin-right: 8px"></i> Quantity Increased`,
      layout: "topCenter",
      theme: "sunset",
      timeout: 3000,
    }).show();
    addItemToCart(cartItem);
  };

  const removeItemHandler = () => {
    new Noty({
      type: "information",
      text: `<i class="fa-solid fa-down-long" style="margin-right: 8px"></i> Quantity Decreased`,
      layout: "topCenter",
      theme: "sunset",
      timeout: 3000,
    }).show();
    removeItemToCart(cartItem);
  };

  return (
    <tr className="checkout-item-container">
      <td className="image-container">
        <img src={imageUrl} alt={`${name}`} />
      </td>
      <td className="name"> {name} </td>
      <td className="quantity">
        <div>
          <div className="arrow" onClick={removeItemHandler}>
            &#10094;
          </div>
          <span className="value">{quantity}</span>
          <div className="arrow" onClick={addItemHandler}>
            &#10095;
          </div>
        </div>
      </td>
      <td className="price"> {price}</td>
      <td className="remove-button" onClick={clearItemHandler}>
        &#10005;
      </td>
    </tr>
  );
};

export default CheckoutItem;
