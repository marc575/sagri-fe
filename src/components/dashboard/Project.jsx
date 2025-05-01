import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiEdit2, FiTrash2, FiX, FiCalendar, FiInfo, FiCheckCircle } from 'react-icons/fi';
import { useProject } from '../../context/ProjectContext';
import { useActivity } from '../../context/ActivityContext';
import Loading from '../ui/Loading';

const Project = ({ userId }) => {
  const { projects, project, updateProject, getProjects, postProject, deleteProject, projectsLoading } = useProject();
  const { activities, activity, activitiesLoading } = useActivity();
  const [modalOpen, setModalOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    activity_id: '',
    start_date: '',
    end_date: '',
    status: 'planned',
    total_surface: '',
    user_id: userId
  });
  
  let isLoading = activitiesLoading || projectsLoading;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const openModal = (project = null) => {
    setCurrentProject(project);
    setFormData(project ? { ...project } : {
      name: '',
      description: '',
      activity_id: '',
      start_date: '',
      end_date: '',
      status: 'planned',
      total_surface: '',
      user_id: userId
    });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setCurrentProject(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (currentProject) {
        await updateProject(formData, `${currentProject.id}`);
        setModalOpen(false);
      } else {
        await postProject(formData);
        setModalOpen(false);
      }
      closeModal();
    } catch (error) {
      console.error('Error saving project:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteProject(`${id}`);
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  const statusColors = {
    planned: 'bg-blue-100 text-blue-800',
    in_progress: 'bg-yellow-100 text-yellow-800',
    completed: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800'
  };

  if (isLoading) return <Loading/>;

  return (
    <div className="container mx-auto px-4 md:px-2 py-18">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Mes Projets</h1>
        <button
          onClick={() => openModal()}
          className="btn btn-primary gap-2"
        >
          <FiPlus /> Nouveau Projet
        </button>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {Array.isArray(projects) && projects.map(project => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="card bg-base-100 shadow-md hover:shadow-xl transition-shadow border-[#FDFAD0]"
          >
            <div className="card-body">
              <div className="flex justify-between items-start">
                <h2 className="card-title text-xl">{project.name}</h2>
                <span className={`badge ${statusColors[project.status]}`}>
                  {project.status}
                </span>
              </div>
              <p className="text-gray-600 mt-2">{project.description}</p>
              
              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <FiCalendar className="text-gray-500" />
                  <span>{new Date(project.start_date).toLocaleDateString()} - {project.end_date ? new Date(project.end_date).toLocaleDateString() : 'Present'}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <FiInfo className="text-gray-500" />
                  <span>
                    {activities.find(a => a.id === project.activity_id)?.name || 'Aucune activité !'}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <FiCheckCircle className="text-gray-500" />
                  <span>{project.total_surface} m²</span>
                </div>
              </div>

              <div className="card-actions justify-end mt-4">
                <button onClick={() => openModal(project)} className="btn btn-sm btn-ghost gap-1">
                  <FiEdit2 /> Modifier
                </button>
                <button onClick={() => deleteProject(project.id)} className="btn btn-sm btn-ghost text-error gap-1">
                  <FiTrash2 /> Supprimer
                </button>
              </div>
            </div>
          </motion.div>
        ))}
        
      </div>

      {/* Modal */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center p-4 z-50"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="modal-box w-full max-w-2xl relative bg-white shadow-xl rounded-lg p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={closeModal} className="btn btn-sm btn-circle absolute right-4 top-4 z-10">
                <FiX />
              </button>
              
              <h3 className="text-2xl font-bold mb-4">
                {currentProject ? 'Modifier le Projet' : 'Créer un Nouveau Projet'}
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Nom du projet</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="input input-bordered"
                      required
                    />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Activité</span>
                    </label>
                    <select
                      name="activity_id"
                      value={formData.activity_id}
                      onChange={handleInputChange}
                      className="select select-bordered"
                      required
                    >
                      <option value="">Sélectionner une activité</option>
                      {activities.map(activity => (
                        <option key={activity.id} value={activity.id}>
                          {activity.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Date de début</span>
                    </label>
                    <input
                      type="date"
                      name="start_date"
                      value={formData.start_date}
                      onChange={handleInputChange}
                      className="input input-bordered"
                      required
                    />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Date de fin</span>
                    </label>
                    <input
                      type="date"
                      name="end_date"
                      value={formData.end_date}
                      onChange={handleInputChange}
                      className="input input-bordered"
                    />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Statut</span>
                    </label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      className="select select-bordered"
                      required
                    >
                      <option value="planned">Planifié</option>
                      <option value="in_progress">En cours</option>
                      <option value="completed">Terminé</option>
                      <option value="cancelled">Annulé</option>
                    </select>
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Surface totale (m²)</span>
                    </label>
                    <input
                      type="number"
                      name="total_surface"
                      value={formData.total_surface}
                      onChange={handleInputChange}
                      className="input input-bordered"
                      min="0"
                      step="0.01"
                    />
                  </div>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Description</span>
                  </label><br />
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="textarea textarea-bordered h-24 w-full"
                  />
                </div>

                <div className="modal-action">
                  <button type="button" onClick={closeModal} className="btn btn-ghost">
                    Annuler
                  </button>
                  <button type="submit" className="btn btn-primary">
                    {currentProject ? 'Mettre à jour' : 'Créer'}
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

export default Project;