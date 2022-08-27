// import { Link } from "react-router-dom";
import "./order.styles.scss";

const Order = ({ orderId, orderDetails }) => {
  const { deliveryAddress, orderStatus, totalItems, totalPrice, placedOn } =
    orderDetails;
  const placedOnText = `${placedOn.toDate().getDate()}/${placedOn
    .toDate()
    .getMonth()}/${placedOn.toDate().getFullYear()} at ${placedOn
    .toDate()
    .getHours()}:${placedOn.toDate().getMinutes()}`;

  return (
    <div className="order-container">
      <h3 className="order-heading">Order Placed On : </h3>
      <table className="order-details">
        <tbody>
          <tr>
            <td>{placedOnText}</td>
          </tr>
          <tr>
            <td>
              <span className="bold">Delivery Address : </span>
              {deliveryAddress}
            </td>
          </tr>
          <tr>
            <td>
              <span className="bold">Status : </span>
              <span className="blue">{orderStatus}</span>
            </td>
          </tr>
          <tr>
            <td>
              <span className="bold">Total Price : </span>
              {totalPrice}
            </td>
          </tr>
          <tr>
            <td>
              <span className="bold">Total Items : </span>
            </td>
          </tr>
          <tr>
            <td>
              {totalItems.map((item) => {
                return (
                  <div key={item.id}>
                    {item.name} ({item.quantity})
                  </div>
                );
              })}
            </td>
          </tr>
          {/* <tr>
            <td style={{ paddingTop: "20px" }}>
              <Link className="order-status" to={`/your-orders/${orderId}`}>
                Track Delivery Status
              </Link>
            </td>
          </tr> */}
        </tbody>
      </table>
    </div>
  );
};

export default Order;
