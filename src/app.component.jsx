import { Routes, Route } from "react-router-dom";

import "noty/lib/noty.css";
import "noty/lib/themes/sunset.css";

import Admin from "./routes/admin/admin.component";
import Checkout from "./routes/checkout/checkout.component";
import Home from "./routes/home/home.component";
import Login from "./routes/login/login.component";
import PageLayout from "./routes/page-layout/page-layout.component";
import Register from "./routes/register/register.component";
import Shop from "./routes/shop/shop.component";
import YourOrders from "./routes/your-orders/your-orders.component";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<PageLayout />}>
        <Route index element={<Home />} />
        <Route path="sign-up" element={<Register />} />
        <Route path="sign-in" element={<Login />} />
        <Route path="admin/*" element={<Admin />} />
        <Route path="shop/*" element={<Shop />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="your-orders/*" element={<YourOrders />} />
      </Route>
    </Routes>
  );
};

export default App;
