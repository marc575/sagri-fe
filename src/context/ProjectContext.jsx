import { createContext, useState, useEffect, useCallback, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProjectContext = createContext();
axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://localhost:8000";

export const ProjectProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [projects, setProjects] = useState(localStorage.getItem('projects') || '');
  const [project, setProject] = useState(localStorage.getItem('project') || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const getProjects = useCallback(async (token) => {
    if (token) {
      try {
        await axios.get('/sanctum/csrf-cookie');
        const response = await axios.get('/api/projects', {
          headers: { 
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            ContentType: "application/json"
            }
        });
        setProjects(response.data.data);
        localStorage.setItem('projects', projects);
      } catch (err) {
        setError(err.response?.data?.message || 'Une erreur est survenue !');
      }
    }
  }, [navigate]);

  useEffect(() => {
    getProjects(token);
  }, [token])

  const showProject = async (id, token) => {
    if (token) {
      try {
        await axios.get('/sanctum/csrf-cookie');
        const response = await axios.get(`/api/projects/${id}`, {
          headers: { 
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            ContentType: "application/json"
            }
        });
        setProject(response.data.data);
        localStorage.setItem('project', project);
      } catch (err) {
        setError(err.response?.data?.message || 'Une erreur est survenue !');
      }
    }
  };

  const postProject = async (data) => {
    setLoading(true);
    setError(null);
    try {
        await axios.get('/sanctum/csrf-cookie');
        await axios.post('/api/projects', data, {
        headers: { 
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            ContentType: "application/json"
            }
        });
        await getProjects(token);
    } catch (err) {
      setError(err.response?.data?.message || 'Une erreur est survenue !');
    } finally {
      setLoading(false);
    }
  };

  const updateProject = async (data, id) => {
    setLoading(true);
    setError(null);
    try {
      await axios.get('/sanctum/csrf-cookie');
      await axios.put(`/api/projects/${id}`, data, {
        headers: { 
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            ContentType: "application/json"
            }
        });
        await getProjects(token);
    } catch (err) {
      setError(err.response?.data?.message || "Une erreur est survenue !");
    } finally {
      setLoading(false);
    }
  };

  const deleteProject = async (id) => {
    await axios.get('/sanctum/csrf-cookie');
    await axios.delete(`/api/projects/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    await getProjects(token);
  };

  return (
    <ProjectContext.Provider value={{
      projects,
      project,
      showProject,
      postProject,
      updateProject,
      deleteProject,
      projectsLoading: loading,
      error
    }}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProject = () => useContext(ProjectContext);