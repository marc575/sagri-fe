import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiEdit2, FiTrash2, FiX, FiActivity, FiTag, FiAlignLeft } from 'react-icons/fi';
import Loading from '../ui/Loading';
import { useActivity } from '../../context/ActivityContext';
import Description from '../ui/Description';
import { useAuth } from '../../context/AuthContext';

const Activity = ({ userId }) => {
  const { user } = useAuth();
  const { activities, updateActivity, postActivity, deleteActivity, activitiesLoading } = useActivity();
  let isLoading = activitiesLoading;
  const [modalOpenActivity, setModalOpenActivity] = useState(false);
  const [currentActivity, setCurrentActivity] = useState(null);
  const [formDataActivity, setFormDataActivity] = useState({
    name: '',
    category: '',
    description: '',
    user_id: userId
  });

  // Catégories prédéfinies
  const categories = [
    'Agriculture',
    'Élevage',
    'Transformation',
    'Commercialisation',
    'Recherche'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormDataActivity(prev => ({ ...prev, [name]: value }));
  };

  const openModalActivity = (activity = null) => {
    setCurrentActivity(activity);
    setFormDataActivity(activity ? { ...activity } : {
      name: '',
      category: '',
      description: '',
      user_id: userId
    });
    setModalOpenActivity(true);
  };

  const closeModalActivity = () => {
    setModalOpenActivity(false);
    setCurrentActivity(null);
  };

  const handleSubmitActivity = async (e) => {
    e.preventDefault();
    try {
      if (currentActivity) {
        await updateActivity(formDataActivity, currentActivity.id);
        setModalOpenActivity(false);
      } else {
        await postActivity(formDataActivity);
        setModalOpenActivity(false);
      }
      closeModalActivity();
    } catch (error) {
      console.error('Error saving activity:', error);
    }
  };

  const handleDeleteActivity = async (id) => {
    try {
        await deleteActivity(id);
    } catch (error) {
      console.error('Error deleting activity:', error);
    }
  };

  if (isLoading) {
    return (
      <Loading />
    );
  }

  return (
    <div className="container mx-auto py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-xl font-bold text-secondary">Activités</h1>
            {
              user?.role === "farmer" ? (
                <button
                  onClick={() => openModalActivity()}
                  className="btn btn-primary gap-2 btn-sm"
                >
                  <FiPlus /> Nouvelle Activité
                </button>
              ) : null
            }
      </div>

      {/* Activities Grid */}
      <div className="grid grid-cols-1 gap-6">
        {Array.isArray(activities) && activities.map(activity => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="card bg-base-100 shadow-xs hover:shadow-md transition-shadow border border-gray-100"
          >
            <div className="card-body">
              <div className="flex items-center gap-3 mb-2">
                <FiActivity className="text-xl text-secondary" />
                <div className="card-title text-secondary text-lg space-x-2">
                  <h2>{activity.name} <span className="p-2 text-xs badge bg-[#FDFAD0] font-normal"><FiTag />{activity.category}</span></h2>
                </div>
              </div>
              

              {activity.description && (
                <div className="flex items-start gap-2">
                  <Description description={activity.description} />
                </div>
              )}
              {
                user?.role === "farmer" ? (
                  <div className="card-actions justify-end mt-2">
                    <button 
                      onClick={() => openModalActivity(activity)} 
                      className="btn btn-sm btn-ghost gap-1 border-success hover:bg-success"
                    >
                      <FiEdit2 /> Modifier
                    </button>
                    <button 
                      onClick={() => handleDeleteActivity(activity.id)} 
                      className="btn btn-sm btn-ghost text-error gap-1 border-error hover:bg-error hover:text-white"
                    >
                      <FiTrash2 /> Supprimer
                    </button>
                  </div>
                ) : null
              }
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {modalOpenActivity && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 100 }}
            className="fixed inset-0 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={closeModalActivity}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20, opacity: 0  }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 100 }}
              className="modal-box w-full max-w-md relative bg-white"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={closeModalActivity} 
                className="btn btn-sm btn-circle absolute right-2 top-2"
              >
                <FiX />
              </button>
              
              <h3 className="text-lg font-bold mb-4">
                {currentActivity ? 'Modifier Activité' : 'Nouvelle Activité'}
              </h3>

              <form onSubmit={handleSubmitActivity} className="space-y-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Nom</span>
                  </label><br />
                  <input
                    type="text"
                    name="name"
                    value={formDataActivity.name}
                    onChange={handleInputChange}
                    className="input input-bordered w-full"
                    required
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Catégorie</span>
                  </label><br />
                  <select
                    name="category"
                    value={formDataActivity.category}
                    onChange={handleInputChange}
                    className="select select-bordered w-full"
                    required
                  >
                    <option value="">Sélectionner une catégorie</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Description</span>
                  </label><br />
                  <textarea
                    name="description"
                    value={formDataActivity.description}
                    onChange={handleInputChange}
                    className="textarea textarea-bordered h-32 w-full"
                    placeholder="Décrivez cette activité..."
                  />
                </div>

                <div className="modal-action">
                  <button 
                    type="button" 
                    onClick={closeModalActivity} 
                    className="btn btn-ghost"
                  >
                    Annuler
                  </button>
                  <button 
                    type="submit" 
                    className="btn btn-primary"
                  >
                    {currentActivity ? 'Mettre à jour' : 'Créer'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Activity;