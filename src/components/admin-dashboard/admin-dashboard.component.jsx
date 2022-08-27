import { useContext } from "react";
import { OrdersContext } from "../../contexts/orders.context";

import "./admin-dashboard.styles.scss";

const AdminDashboard = () => {
  const { ordersMap, updateOrderStatus } = useContext(OrdersContext);

  const handleSubmit = (id, status) => {
    switch (status) {
      case "Order Placed":
        updateOrderStatus(id, "Payment Done");
        break;
      case "Payment Done":
        updateOrderStatus(id, "Shipped");
        break;
      case "Shipped":
        updateOrderStatus(id, "Out For Delivery");
        break;
      case "Out For Delivery":
        updateOrderStatus(id, "Product Delivered");
        break;
      default:
        break;
    }
  };

  return (
    <div className="table-responsive">
      <table className="table">
        <thead>
          <tr>
            <th>Order Id</th>
            <th>User Id</th>
            <th>Delivery Address</th>
            <th>Total Items</th>
            <th>Total Price</th>
            <th>Placed On</th>
            <th>Order Status</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(ordersMap).map((key) => {
            const orderDetails = ordersMap[key];
            if (orderDetails.orderStatus !== "Product Delivered") {
              return (
                <tr key={key}>
                  <td>{key}</td>
                  <td>{orderDetails.userId}</td>
                  <td>{orderDetails.deliveryAddress}</td>
                  <td>{orderDetails.totalItems.length}</td>
                  <td>{orderDetails.totalPrice}</td>
                  <td>Placed on</td>
                  <td>{orderDetails.orderStatus}</td>
                  <td>
                    <button
                      onClick={() => {
                        handleSubmit(key, orderDetails.orderStatus);
                      }}
                    >
                      Update
                    </button>
                  </td>
                </tr>
              );
            }
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
