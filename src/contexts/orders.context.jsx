import { createContext, useState, useEffect } from "react";
import {
  getOrdersAndDocuments,
  addOrderToOrdersCollection,
  updateStatus,
} from "../utils/firebase/firebase.utils";

export const OrdersContext = createContext({
  ordersMap: {},
  addOrder: () => {},
  updateOrderStatus: () => {},
});

export const OrdersProvider = ({ children }) => {
  const [ordersMap, setOrdersMap] = useState({});

  useEffect(() => {
    const getOrdersMap = async () => {
      const orderMap = await getOrdersAndDocuments();
      setOrdersMap(orderMap);
    };
    getOrdersMap();
  }, []);

  const addOrder = async (orderToAdd) => {
    const orderMap = await addOrderToOrdersCollection(orderToAdd);
    setOrdersMap(orderMap);
  };

  const updateOrderStatus = async (orderId, orderStatus) => {
    const orderMap = await updateStatus(orderId, orderStatus);
    setOrdersMap(orderMap);
  };

  const value = {
    ordersMap,
    addOrder,
    updateOrderStatus,
  };

  return (
    <OrdersContext.Provider value={value}>{children}</OrdersContext.Provider>
  );
};
