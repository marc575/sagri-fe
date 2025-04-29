import { createContext, useState, useEffect, useCallback, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AuthContext = createContext();
axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://localhost:8000";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(localStorage.getItem('user') || '');
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token') || false)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Vérifier l'état d'authentification au chargement
  const getUser = async (token) => {
    if (token) {
      try {
        const response = await axios.get('/api/user', {
          headers: { 
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            ContentType: "application/json"
          }
        });
        setUser(response.data);
        localStorage.setItem('user', user);
      } catch (err) {
        setError(err.response?.data?.message || 'Erreur de connexion');
      }
    }
  };

  const login = async (data) => {
    setLoading(true);
    setError(null);
    try {
      await axios.get('/sanctum/csrf-cookie');
      const response = await axios.post('/api/login', data);
      localStorage.setItem('token', response.data.access_token);
      setToken(response.data.access_token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur de connexion');
    } finally {
      setLoading(false);
    }
  };

  const registerInitial = async (data) => {
    setLoading(true);
    setError(null);
    try {
      await axios.get('/sanctum/csrf-cookie');
      const response = await axios.post('/api/register/initial', data);
      localStorage.setItem('token', response.data.access_token);
      setToken(response.data.access_token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || "Erreur d'inscription");
    } finally {
      setLoading(false);
    }
  };

  const registerComplete = async (data) => {
    setLoading(true);
    setError(null);
    try {
      await axios.get('/sanctum/csrf-cookie');
      const response = await axios.post('/api/register/complete', data);
      localStorage.setItem('token', response.data.access_token);
      setToken(response.data.access_token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || "Erreur d'inscription");
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await axios.get('/sanctum/csrf-cookie');
    await axios.post('/api/logout', {}, {
      headers: { 
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        ContentType: "application/json"
      }
    });
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setToken(null);
    setUser(null);
    navigate('/auth/login');
  };

  const changePassword = async (currentPassword, newPassword, newPasswordConfirmation) => {
    try {
      await axios.post('/api/change-password', {
        current_password: currentPassword,
        new_password: newPassword,
        new_password_confirmation: newPasswordConfirmation,
      }, {
        headers: { 
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          ContentType: "application/json"
        }
      });
    } catch (err) {
      setError(err.response?.data || 'Erreur de connexion');
    }
  };
  
  const forgotPassword = async (email) => {
    try {
      await axios.post('/api/forgot-password', { email });
    } catch (err) {
      setError(err.response?.data || 'Erreur de connexion');
    }
  };
  
  const resetPassword = async (email, password, passwordConfirmation) => {
    try {
      await axios.post('/api/reset-password', {
        email,
        password,
        password_confirmation: passwordConfirmation,
        token,
      });
    } catch (err) {
      setError(err.response?.data || 'Erreur de connexion');
    }
  };

  useEffect(() => {
    const loadUser = async () => {
      if (!token) {
        // Check for social auth token in URL
        const params = new URLSearchParams(window.location.search);
        const socialToken = params.get('token');
        if (socialToken) {
          login(socialToken);
          window.history.replaceState({}, document.title, window.location.pathname);
        }
      } else {
        getUser(token);
        setIsAuthenticated(true);
      }
      setLoading(false);
    };
    
    loadUser();
  }, [token]);

  return (
    <AuthContext.Provider value={{
      user,
      token,
      loading,
      error,
      login,
      registerInitial,
      registerComplete,
      logout,
      changePassword,
      forgotPassword,
      resetPassword,
      isAuthenticated
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);