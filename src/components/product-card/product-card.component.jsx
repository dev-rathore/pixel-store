import Noty from "noty";

import "noty/lib/noty.css";
import "noty/lib/themes/sunset.css";

import { useContext } from "react";
import { UserContext } from "../../contexts/user.context";
import { CartContext } from "../../contexts/cart.context";
import AddToCartButton from "../button/add-to-cart-button.component";
import "./product-card.styles.scss";

const ProductCard = ({ product }) => {
  const { name, price, imageUrl } = product;
  const { addItemToCart } = useContext(CartContext);
  const { currentUser, userData } = useContext(UserContext);

  const addProductToCart = () => {
    if (currentUser && userData.role === "user") {
      new Noty({
        type: "error",
        text: `<i class="fa-solid fa-circle-check" style="margin-right: 8px"></i> Added In The Cart`,
        layout: "topCenter",
        theme: "sunset",
        timeout: 3000,
      }).show();
      addItemToCart(product);
    } else {
      new Noty({
        type: "warning",
        text: `<i class="fa-solid fa-circle-exclamation" style="margin-right: 8px"></i> Please Login as user to add item in your cart`,
        layout: "topCenter",
        theme: "sunset",
        timeout: 3000,
      }).show();
    }
  };

  return (
    <div className="product-card-container">
      <img src={imageUrl} alt={`${name}`} />
      <div className="footer">
        <span className="name">{name}</span>
        <span className="price">${price}</span>
        <AddToCartButton onClick={addProductToCart}>
          ADD TO CART
        </AddToCartButton>
      </div>
    </div>
  );
};

export default ProductCard;
