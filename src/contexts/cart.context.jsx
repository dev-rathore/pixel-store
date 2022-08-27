import { createContext, useState, useEffect, useContext } from "react";
import { UserContext } from "./user.context";
import {
  getUserCartItems,
  addToUserCart,
  removeFromUserCart,
  clearFromUserCart,
  emptyUserCart,
} from "../utils/firebase/firebase.utils";

export const CartContext = createContext({
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  clearItemFromCart: () => {},

  cartIconCount: 0, // Inside Cart Icon
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartTotal: 0, // In Checkout Route

  emptyCart: () => {},
});

export const CartProvider = ({ children }) => {
  const { currentUser, userData } = useContext(UserContext);

  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartIconCount, setCartIconCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    if (currentUser && userData.role === "user") {
      const userCart = getUserCartItems(currentUser);
      userCart.then((data) => {
        setCartItems(data);
      });
    } else {
      setCartItems([]);
    }
  }, [currentUser]); // Run once only when the component mounts

  useEffect(() => {
    const newCartIconCount = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );
    setCartIconCount(newCartIconCount);
  }, [cartItems]);

  useEffect(() => {
    const newCartTotal = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity * cartItem.price,
      0
    );
    setCartTotal(newCartTotal);
  }, [cartItems]);

  const addItemToCart = (productToAdd) => {
    const userCart = addToUserCart(currentUser, productToAdd);
    userCart.then((data) => {
      setCartItems(data);
    });
  };

  const removeItemToCart = (cartItemToRemove) => {
    const userCart = removeFromUserCart(currentUser, cartItemToRemove);
    userCart.then((data) => {
      setCartItems(data);
    });
  };

  const clearItemFromCart = (cartItemToClear) => {
    const userCart = clearFromUserCart(currentUser, cartItemToClear);
    userCart.then((data) => {
      setCartItems(data);
    });
  };

  const emptyCart = () => {
    emptyUserCart(currentUser);
    setCartItems([]);
  };

  const value = {
    cartItems,
    addItemToCart,
    removeItemToCart,
    clearItemFromCart,

    cartIconCount,
    isCartOpen,
    setIsCartOpen,
    cartTotal,

    emptyCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
