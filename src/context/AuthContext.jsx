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
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(response.data);
        localStorage.setItem('user', user);
      } catch (err) {
        setError(err.response?.data?.message || 'Erreur de connexion');
      }
    }
  };

  useEffect(() => {
    getUser(token);
    setIsAuthenticated(true);
  }, [token])

  const login = useCallback(async (credentials) => {
    setLoading(true);
    setError(null);
    try {
      await axios.get('/sanctum/csrf-cookie');
      const response = await axios.post('/api/login', credentials);
      localStorage.setItem('token', response.data.access_token);
      setToken(response.data.access_token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur de connexion');
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  const register = useCallback(async (userData) => {
    setLoading(true);
    setError(null);
    try {
      await axios.get('/sanctum/csrf-cookie');
      const response = await axios.post('/api/register', userData);
      localStorage.setItem('token', response.data.access_token);
      setToken(response.data.access_token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || "Erreur d'inscription");
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  const logout = async () => {
    await axios.get('/sanctum/csrf-cookie');
    await axios.post('/api/logout', {}, {
      headers: {
        'Authorization': `Bearer ${token}`
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
          'Authorization': `Bearer ${token}`
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
      register,
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