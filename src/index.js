import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";

import App from "./app.component";
import { UserProvider } from "./contexts/user.context";
import { CategoriesProvider } from "./contexts/categories.context";
import { CartProvider } from "./contexts/cart.context";
import { OrdersProvider } from "./contexts/orders.context";

import { stripePromise } from "./utils/stripe/stripe.utils";

import "./index.scss";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <CategoriesProvider>
          <CartProvider>
            <OrdersProvider>
              <Elements stripe={stripePromise}>
                <App />
              </Elements>
            </OrdersProvider>
          </CartProvider>
        </CategoriesProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);
