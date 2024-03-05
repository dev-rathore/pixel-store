import Order from "../order/order.component";
import "./orders.styles.scss";

import { useContext } from "react";
import { OrdersContext } from "../../contexts/orders.context";
import { UserContext } from "../../contexts/user.context";

const Orders = () => {
  const { ordersMap } = useContext(OrdersContext);
  const { currentUser } = useContext(UserContext);
  return (
    <div>
      <div className="orders-container">
        {Object.keys(ordersMap).map((key) => {
          const orderDetails = ordersMap[key];
          if (currentUser && orderDetails.userId === currentUser.uid) {
            return (
              <Order key={key} orderId={key} orderDetails={orderDetails} />
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default Orders;
