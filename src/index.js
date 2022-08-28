import React from "react";
import ReactDOM from "react-dom/client";
// import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";

import App from "./App";
import { UserProvider } from "./contexts/user.context";
import { CategoriesProvider } from "./contexts/categories.context";
import { CartProvider } from "./contexts/cart.context";
import { OrdersProvider } from "./contexts/orders.context";

import { stripePromise } from "./utils/stripe/stripe.utils";

import "./index.scss";

// Old and In the course

// const rootElement = document.getElementById("root");
// render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <UserProvider>
//         <CategoriesProvider>
//           <CartProvider>
//             <App />
//           </CartProvider>
//         </CategoriesProvider>
//       </UserProvider>
//     </BrowserRouter>
//   </React.StrictMode>,
//   rootElement
// );

// import reportWebVitals from "./reportWebVitals";

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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
