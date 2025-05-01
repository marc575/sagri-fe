import { createContext, useState, useEffect, useCallback, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ActivityContext = createContext();
axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://localhost:8000";

export const ActivityProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [activities, setActivities] = useState(localStorage.getItem('activities') || '');
  const [activity, setActivity] = useState(localStorage.getItem('activity') || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const getActivities = useCallback(async (token) => {
    if (token) {
      try {
        await axios.get('/sanctum/csrf-cookie');
        const response = await axios.get('/api/activities', {
          headers: { 
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            ContentType: "application/json"
            }
        });
        setActivities(response.data.data);
        localStorage.setItem('activities', activities);
      } catch (err) {
        setError(err.response?.data?.message || 'Une erreur est survenue !');
      }
    }
  }, [navigate]);

  useEffect(() => {
    getActivities(token);
  }, [token])

  const showActivity = async (id, token) => {
    if (token) {
      try {
        await axios.get('/sanctum/csrf-cookie');
        const response = await axios.get(`/api/activities/${id}`, {
          headers: { 
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            ContentType: "application/json"
            }
        });
        setActivity(response.data.data);
        localStorage.setItem('activity', activity);
      } catch (err) {
        setError(err.response?.data?.message || 'Une erreur est survenue !');
      }
    }
  };

  const postActivity = async (data) => {
    setLoading(true);
    setError(null);
    try {
        await axios.get('/sanctum/csrf-cookie');
        await axios.post('/api/activities', data, {
        headers: { 
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            ContentType: "application/json"
            }
        });
        await getActivities(token);
    } catch (err) {
      setError(err.response?.data?.message || 'Une erreur est survenue !');
    } finally {
      setLoading(false);
    }
  };

  const updateActivity = async (data, id) => {
    setLoading(true);
    setError(null);
    try {
      await axios.get('/sanctum/csrf-cookie');
      await axios.put(`/api/activities/${id}`, data, {
        headers: { 
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            ContentType: "application/json"
            }
        });
        await getActivities(token);
    } catch (err) {
      setError(err.response?.data?.message || "Une erreur est survenue !");
    } finally {
      setLoading(false);
    }
  };

  const deleteActivity = async (id) => {
    await axios.get('/sanctum/csrf-cookie');
    await axios.delete(`/api/activities/${id}`, {}, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        ContentType: "application/json"
      }
    });
    await getActivities(token);
  };

  return (
    <ActivityContext.Provider value={{
      activities,
      activity,
      showActivity,
      postActivity,
      updateActivity,
      deleteActivity,
      activitiesLoading: loading,
      error
    }}>
      {children}
    </ActivityContext.Provider>
  );
};

export const useActivity = () => useContext(ActivityContext);