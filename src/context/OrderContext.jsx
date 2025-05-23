import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const OrderContext = createContext();
axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://localhost:8000";

export const OrderProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [user, setUser] = useState(localStorage.getItem('user') || '');
  const [orders, setOrders] = useState(localStorage.getItem('orders') || '');
  const [order, setOrder] = useState(localStorage.getItem('order') || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getOrders = async (token) => {
    if (token) {
      try {
        await axios.get('/sanctum/csrf-cookie');
        const response = await axios.get('/api/orders', {
          headers: { 
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            ContentType: "application/json"
            }
        });
        setOrders(response.data.data);
        localStorage.setItem('orders', orders);
      } catch (err) {
        setError(err.response?.data?.message || 'Une erreur est survenue !');
      }
    }
  };

  useEffect(() => {
    getOrders(token);
  }, [token])

  const showOrder = async (id, token) => {
    if (token) {
      try {
        await axios.get('/sanctum/csrf-cookie');
        const response = await axios.get(`/api/orders/${id}`, {
          headers: { 
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            ContentType: "application/json"
            }
        });
        setOrder(response.data);
        localStorage.setItem('order', order);
      } catch (err) {
        setError(err.response?.data?.message || 'Une erreur est survenue !');
      }
    }
  };

  const postOrder = async (data) => {
    setLoading(true);
    setError(null);
    try {
        await axios.get('/sanctum/csrf-cookie');
        await axios.post('/api/orders', data, {
        headers: { 
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            ContentType: "application/json"
            }
        });
        await getOrders(token);
    } catch (err) {
      setError(err.response?.data?.message || 'Une erreur est survenue !');
    } finally {
      setLoading(false);
    }
  };

  const updateOrder = async (data, id) => {
    setLoading(true);
    setError(null);
    try {
      await axios.get('/sanctum/csrf-cookie');
      await axios.put(`/api/orders/${id}`, data, {
        headers: { 
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            ContentType: "application/json"
            }
        });
        await getOrders(token);
    } catch (err) {
      setError(err.response?.data?.message || "Une erreur est survenue !");
    } finally {
      setLoading(false);
    }
  };

  const deleteOrder = async (id) => {
    await axios.get('/sanctum/csrf-cookie');
    await axios.delete(`/api/orders/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        ContentType: "application/json"
      }
    });
    await getOrders(token);
  };

  return (
    <OrderContext.Provider value={{
      orders,
      order,
      showOrder,
      postOrder,
      updateOrder,
      deleteOrder,
      OrdersLoading: loading,
      error
    }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => useContext(OrderContext);