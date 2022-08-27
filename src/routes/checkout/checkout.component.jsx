import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { CartContext } from "../../contexts/cart.context";
import { OrdersContext } from "../../contexts/orders.context";

import CheckoutItem from "../../components/checkout-item/checkout-item.component";

import "./checkout.styles.scss";
import Button from "../../components/button/button.component";
import { UserContext } from "../../contexts/user.context";
import FormInput from "../../components/form-input/form-input.component";

const defaultOrderFields = {
  deliveryAddress: "",
};

const Checkout = () => {
  const { emptyCart, cartItems, cartTotal } = useContext(CartContext);
  const { currentUser, userData } = useContext(UserContext);
  const { addOrder } = useContext(OrdersContext);
  const navigate = useNavigate();

  const [orderFields, setOrderFields] = useState(defaultOrderFields);
  const { deliveryAddress } = orderFields;

  let orderDetails = {};
  if (currentUser) {
    orderDetails = {
      userId: currentUser.uid,
      orderStatus: "Order Placed",
      deliveryAddress,
      totalPrice: cartTotal,
      totalItems: cartItems,
    };
  }

  const resetOrderFields = () => {
    setOrderFields(defaultOrderFields);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setOrderFields({ ...orderFields, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      addOrder(orderDetails);

      emptyCart();

      resetOrderFields();

      navigate(`/payment`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <table className="checkout-container">
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
      {cartItems.length === 0 ? (
        <p style={{ textAlign: "center" }}>Cart is Empty</p>
      ) : (
        <div className="total">
          <span>TOTAL: ${cartTotal}</span>
        </div>
      )}

      {currentUser && userData.role === "user" ? (
        <form className="place-order-form" onSubmit={handleSubmit}>
          <div>
            <FormInput
              label="Enter Delivery Address"
              type="text"
              required
              onChange={handleChange}
              name="deliveryAddress"
              value={deliveryAddress}
              autoComplete="off"
            />
          </div>
          <Button type="submit">Place Order</Button>
        </form>
      ) : (
        <h2
          style={{
            textAlign: "center",
            fontWeight: "400",
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
