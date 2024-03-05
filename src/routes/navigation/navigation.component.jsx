import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Noty from "noty";

import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";

import { UserContext } from "../../contexts/user.context";
import { CartContext } from "../../contexts/cart.context";

import { ReactComponent as PixelStoreLogo } from "../../assets/pixel-store.svg";
import { signOutUser } from "../../utils/firebase/firebase.utils";

import "./navigation.styles.scss";

const Navigation = () => {
  const { currentUser, userData } = useContext(UserContext);
  const { isCartOpen, setIsCartOpen } = useContext(CartContext);
  const navigate = useNavigate();

  const signOutHandler = async () => {
    await signOutUser();
    setIsCartOpen(false);
    navigate("/");

    new Noty({
      type: "success",
      text: `<i class="fa-solid fa-circle-check" style="margin-right: 8px"></i> Signed out successfully, See you soon :)`,
      layout: "topCenter",
      theme: "sunset",
      timeout: 4000,
    }).show();
  };

  const closeCart = () => setIsCartOpen(false);

  return (
    <div className="navigation">
      <Link className="logo-container" to="/" onClick={closeCart}>
        <PixelStoreLogo className="logo" />
      </Link>
      <div className="nav-links-container">
        {currentUser && userData?.role === "admin" ? (
          <Link className="nav-link" to="/admin/dashboard" onClick={closeCart}>
            DASHBOARD
          </Link>
        ) : (
          <Link className="nav-link" to="/shop" onClick={closeCart}>
            SHOP
          </Link>
        )}
        {currentUser && userData.role === "user" ? (
          <Link className="nav-link" to="/your-orders" onClick={closeCart}>
            YOUR ORDERS
          </Link>
        ) : (
          <></>
        )}
        {currentUser ? (
          <span className="nav-link" onClick={signOutHandler}>
            SIGN OUT
          </span>
        ) : (
          <>
            <Link className="nav-link" to="/sign-up" onClick={closeCart}>
              REGISTER
            </Link>
            <Link className="nav-link" to="/sign-in" onClick={closeCart}>
              LOGIN
            </Link>
          </>
        )}
        <CartIcon />
      </div>
      {isCartOpen && <CartDropdown />}
    </div>
  );
};

export default Navigation;
