import { useContext } from "react";

import { ReactComponent as ShoppingCart } from "../../assets/shopping-cart.svg";

import { CartContext } from "../../contexts/cart.context";

import "./cart-icon.styles.scss";

const CartIcon = () => {
  const { isCartOpen, setIsCartOpen, cartIconCount } = useContext(CartContext);

  const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen);

  return (
    <div className="cart-icon-container" onClick={toggleIsCartOpen}>
      <ShoppingCart className="shopping-cart" />
      <span className="item-count">{cartIconCount}</span>
    </div>
  );
};

export default CartIcon;
