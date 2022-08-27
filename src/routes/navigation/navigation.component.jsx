import { Fragment, useContext } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";

import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";

import { UserContext } from "../../contexts/user.context";
import { CartContext } from "../../contexts/cart.context";

import { ReactComponent as PixelStoreLogo } from "../../assets/pixel-store.svg";
import { signOutUser } from "../../utils/firebase/firebase.utils";

import "./navigation.styles.scss";

const Navigation = () => {
  const { currentUser, userData } = useContext(UserContext);
  const { isCartOpen } = useContext(CartContext);
  const navigate = useNavigate();

  const signOutHandler = async () => {
    await signOutUser();
    navigate("/");
  };

  return (
    <Fragment>
      <div className="navigation">
        <Link className="logo-container" to="/">
          <PixelStoreLogo className="logo" />
        </Link>
        <div className="nav-links-container">
          {currentUser && userData.role === "admin" ? (
            <Link className="nav-link" to="/admin/dashboard">
              DASHBOARD
            </Link>
          ) : (
            <Link className="nav-link" to="/shop">
              SHOP
            </Link>
          )}
          {currentUser && userData.role === "user" ? (
            <Link className="nav-link" to="/your-orders">
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
              <Link className="nav-link" to="/sign-up">
                REGISTER
              </Link>
              <Link className="nav-link" to="/sign-in">
                LOGIN
              </Link>
            </>
          )}
          <CartIcon />
        </div>
        {isCartOpen && <CartDropdown />}
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
