import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import { UserContext } from "../../contexts/user.context";

import CheckoutItem from "../../components/checkout-item/checkout-item.component";

import PaymentForm from "../../components/payment-form/payment-form.component";

import "./checkout.styles.scss";

const Checkout = () => {
  const { cartItems, cartTotal } = useContext(CartContext);
  const { currentUser, userData } = useContext(UserContext);

  return (
    <>
      <div className="checkout-table-container">
        <table className="checkout-table checkout-container">
          <thead>
            <tr className="checkout-header">
              <th className="header-block">Product</th>
              <th className="header-block">Description</th>
              <th className="header-block">Quantity</th>
              <th className="header-block">Price</th>
              <th className="header-block">Remove</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((cartItem) => (
              <CheckoutItem key={cartItem.id} cartItem={cartItem} />
            ))}
          </tbody>
        </table>
      </div>
      {currentUser && userData.role === "user" ? (
        <>
          {cartItems.length !== 0 ? (
            <div>
              <div className="total">
                <span>TOTAL: ${cartTotal}</span>
              </div>
              <PaymentForm
                cartItems={cartItems}
                cartTotal={cartTotal}
                userId={currentUser.uid}
                userName={userData.displayName}
              />
            </div>
          ) : (
            <p style={{ textAlign: "center" }}>Cart is Empty</p>
          )}
        </>
      ) : (
        <h2
          style={{
            textAlign: "center",
            marginTop: "3rem",
            color: "#5dade2",
          }}
        >
          Please Login to Buy Products
        </h2>
      )}
    </>
  );
};

export default Checkout;
