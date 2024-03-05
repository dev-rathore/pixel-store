import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../contexts/cart.context";
import { OrdersContext } from "../../contexts/orders.context";

import Noty from "noty";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import Button from "../button/button.component";

import "./payment-form.styles.scss";
import FormInput from "../form-input/form-input.component";

const defaultOrderFields = {
  //
  deliveryAddress: "",
};

const PaymentForm = ({ userId, userName, cartItems, cartTotal }) => {
  const { emptyCart } = useContext(CartContext); //
  const { addOrder } = useContext(OrdersContext); //
  const [orderFields, setOrderFields] = useState(defaultOrderFields); //
  const { deliveryAddress } = orderFields; //
  const navigate = useNavigate(); //

  let orderDetails = {
    userId,
    orderStatus: "Order Placed",
    deliveryAddress,
    totalPrice: cartTotal,
    totalItems: cartItems,
  };

  const stripe = useStripe();
  const elements = useElements();

  const resetOrderFields = () => {
    setOrderFields(defaultOrderFields);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setOrderFields({ ...orderFields, [name]: value });
  };

  const paymentHandler = async (event) => {
    event.preventDefault();

    if (!deliveryAddress) {
      new Noty({
        type: "error",
        text: `<i class="fa-solid fa-circle-exclamation" style="margin-right: 8px"></i> Please Enter Delivery Address`,
        layout: "topCenter",
        theme: "sunset",
        timeout: 5000,
      }).show();
      return;
    }

    if (!stripe || !elements) {
      return;
    }

    const response = await fetch("/.netlify/functions/create-payment-intent", {
      method: "post",
      header: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: cartTotal * 100,
      }),
    }).then((res) => res.json());

    // console.log(response);
    const {
      paymentIntent: { client_secret },
    } = response;
    // console.log(client_secret);

    const paymentResult = await stripe.confirmCardPayment(client_secret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: userName,
        },
      },
    });

    if (paymentResult.error) {
      console.log(paymentResult);
      new Noty({
        type: "error",
        text: `<i class="fa-solid fa-circle-exclamation" style="margin-right: 8px"></i> ${paymentResult.error.message}`,
        layout: "topCenter",
        theme: "sunset",
        timeout: 5000,
      }).show();
    } else {
      if (paymentResult.paymentIntent.status === "succeeded") {
        new Noty({
          type: "success",
          text: `<i class="fa-solid fa-circle-check" style="margin-right: 8px"></i> Payment Successful`,
          layout: "topCenter",
          theme: "sunset",
          timeout: 5000,
        }).show();

        try {
          addOrder(orderDetails); // After Successful Payment, Order added into Orders collection
          emptyCart(); // Setting user cart to empty
          resetOrderFields();
          navigate("/your-orders");
        } catch (error) {
          console.log(error);
        }
      }
    }
  };

  return (
    <div className="payment-form-container">
      <form className="form-container" onSubmit={paymentHandler}>
        <FormInput
          label="Enter Delivery Address"
          type="text"
          required
          onChange={handleChange}
          name="deliveryAddress"
          value={deliveryAddress}
          autoComplete="off"
        />
        <h3>Credit Card Payment : </h3>
        <CardElement className="card-element" />
        <Button>Place Order</Button>
      </form>
    </div>
  );
};

export default PaymentForm;
