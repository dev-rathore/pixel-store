import { Route, Routes } from "react-router-dom";
import Orders from "../../components/orders/orders.component";

const YourOrders = () => {
  return (
    <Routes>
      <Route index element={<Orders />} />
    </Routes>
  );
};

export default YourOrders;
