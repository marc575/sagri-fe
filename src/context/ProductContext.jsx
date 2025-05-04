import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const ProductContext = createContext();
axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://localhost:8000";

export const ProductProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [products, setProducts] = useState(localStorage.getItem('products') || '');
  const [allProducts, setAllProducts] = useState(localStorage.getItem('allProducts') || '');
  const [product, setProduct] = useState(localStorage.getItem('product') || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getProducts = async (token) => {
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
        setProducts(response.data.data);
        localStorage.setItem('products', products);
      } catch (err) {
        setError(err.response?.data?.message || 'Une erreur est survenue !');
      }
    }
  };

  const getAllProducts = async (token) => {
    if (token) {
      try {
        await axios.get('/sanctum/csrf-cookie');
        const response = await axios.get('/api/products/all', {
          headers: { 
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            ContentType: "application/json"
            }
        });
        setAllProducts(response?.data.data);
        localStorage.setItem('allProducts', allProducts);
      } catch (err) {
        setError(err.response?.data?.message || 'Une erreur est survenue !');
      }
    }
  };

  useEffect(() => {
    getProducts(token);
    getAllProducts(token);
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
      const formData = new FormData();
      
      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formData.append(key, value);
        }
      });

        await axios.get('/sanctum/csrf-cookie');
        await axios.post('/api/products', formData, {
        headers: { 
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            'Content-Type': 'multipart/form-data'
            },
            validateStatus: (status) => status < 500
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
      const formData = new FormData();
      
      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formData.append(key, value);
        }
      });
      await axios.get('/sanctum/csrf-cookie');
      await axios.put(`/api/products/${id}`, formData, {
        headers: { 
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            'Content-Type': 'multipart/form-data'
            },
            validateStatus: (status) => status < 500
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
      allProducts,
      product,
      showProduct,
      postProduct,
      updateProduct,
      deleteProduct,
      porductsLoading: loading,
      error
    }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => useContext(ProductContext);