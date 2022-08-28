import { Routes, Route } from "react-router-dom";

import Home from "./routes/home/home.component";
import Navigation from "./routes/navigation/navigation.component";
import Shop from "./routes/shop/shop.component";
import Checkout from "./routes/checkout/checkout.component";
import YourOrders from "./routes/your-orders/your-orders.component";
import Register from "./routes/register/register.component";
import Login from "./routes/login/login.component";
import Admin from "./routes/admin/admin.component";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
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
