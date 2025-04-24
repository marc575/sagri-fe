import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useEffect } from 'react';

export const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/auth/login');
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-base-100">
      <div className="navbar bg-base-300">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">Mon Application</a>
        </div>
        <div className="flex-none">
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full bg-primary text-white flex items-center justify-center">
                {user?.name?.charAt(0).toUpperCase() || 'U'}
              </div>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              <li>
                <button onClick={logout}>Déconnexion</button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Bienvenue, {user?.name}!</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="card bg-base-200">
            <div className="card-body">
              <h2 className="card-title">Tableau de bord</h2>
              <p>Contenu personnalisé pour l'utilisateur connecté</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};