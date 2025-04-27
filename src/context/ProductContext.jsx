import { createContext, useState, useEffect, useCallback, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProductContext = createContext();
axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://localhost:8000";

export const ProductProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [products, setProducts] = useState(localStorage.getItem('products') || '');
  const [product, setProduct] = useState(localStorage.getItem('product') || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const getProducts = useCallback(async (token) => {
    if (token) {
      try {
        await axios.get('/sanctum/csrf-cookie');
        const response = await axios.get('/api/products', {
          headers: { 
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            ContentType: "application/json"
            }
        });
        setProducts(response.data);
        localStorage.setItem('products', products);
      } catch (err) {
        setError(err.response?.data?.message || 'Une erreur est survenue !');
      }
    }
  }, [navigate]);

  useEffect(() => {
    getProducts(token);
  }, [token])

  const showProduct = async (id, token) => {
    if (token) {
      try {
        await axios.get('/sanctum/csrf-cookie');
        const response = await axios.get(`/api/products/${id}`, {
          headers: { 
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            ContentType: "application/json"
            }
        });
        setProduct(response.data);
        localStorage.setItem('product', product);
      } catch (err) {
        setError(err.response?.data?.message || 'Une erreur est survenue !');
      }
    }
  };

  const postProduct = async (data) => {
    setLoading(true);
    setError(null);
    try {
        await axios.get('/sanctum/csrf-cookie');
        await axios.post('/api/products', data, {
        headers: { 
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            ContentType: "application/json"
            }
        });
        await getProducts(token);
    } catch (err) {
      setError(err.response?.data?.message || 'Une erreur est survenue !');
    } finally {
      setLoading(false);
    }
  };

  const updateProduct = async (data, id) => {
    setLoading(true);
    setError(null);
    try {
      await axios.get('/sanctum/csrf-cookie');
      await axios.put(`/api/products/${id}`, data, {
        headers: { 
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            ContentType: "application/json"
            }
        });
        await getProducts(token);
    } catch (err) {
      setError(err.response?.data?.message || "Une erreur est survenue !");
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id) => {
    await axios.get('/sanctum/csrf-cookie');
    await axios.delete(`/api/products/${id}`, {}, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        ContentType: "application/json"
      }
    });
    await getProducts(token);
  };

  return (
    <ProductContext.Provider value={{
      products,
      product,
      showProduct,
      postProduct,
      updateProduct,
      deleteProduct,
      loading,
      error
    }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => useContext(ProductContext);