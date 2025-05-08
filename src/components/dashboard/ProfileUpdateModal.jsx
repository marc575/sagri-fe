import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiUser, FiPhone, FiMapPin, FiCamera, FiX, FiCalendar, FiInfo, FiCrop } from 'react-icons/fi';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

const ProfileUpdateModal = ({ user, onClose}) => {
  const { getUser } = useAuth();
  const [formDataProfileUpdate, setFormDataProfileUpdate] = useState({
    name: '',
    phone: '',
    address: '',
    region: '',
    bio: '',
    land_size: '',
    gps_coordinates: '',
    farming_since: ''
  });
  const [profilePicture, setProfilePicture] = useState(`http://localhost:8000/storage/${user?.profil_picture}` );
  const [previewImage, setPreviewImage] = useState(`http://localhost:8000/storage/${user?.profil_picture}`);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (user) {
      setFormDataProfileUpdate({
        name: user.name || '',
        phone: user.phone || '',
        address: user.address || '',
        region: user.region || '',
        bio: user.bio || '',
        land_size: user.land_size || '',
        gps_coordinates: user.gps_coordinates || '',
        farming_since: user.farming_since || ''
      });
      setPreviewImage(user.profile_picture || '');
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormDataProfileUpdate(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicture(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});
    try {
      const formDataToSend = new FormData();
      
      // Ajouter les champs texte
      Object.entries(formDataProfileUpdate).forEach(([key, value]) => {
        if (value) formDataToSend.append(key, value);
      });

      // Ajouter l'image si elle existe
      if (profilePicture) {
        formDataToSend.append('profile_picture', profilePicture);
      }

      // Configuration des headers
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      };

      // Appel API
      const response = await axios.put('/api/user', formDataToSend, config);
      await getUser(localStorage.getItem('token'));
      onClose();
    } catch (error) {
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      } else {
        console.error('Update error:', error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          className="modal-box max-w-lg w-full relative"
          onClick={(e) => e.stopPropagation()}
        >
          <button 
            className="btn btn-sm btn-circle absolute right-2 top-2"
            onClick={onClose}
            disabled={isLoading}
          >
            <FiX />
          </button>

          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <FiUser /> Mettre à jour votre profil
          </h3>

          <form onSubmit={handleSubmit}>
            {/* Photo de profil */}
            <div className="flex flex-col items-center mb-6">
              <div className="relative group">
                <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-primary">
                  {previewImage ? (
                    <img 
                      src={previewImage} 
                      alt="Profile preview" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <FiUser className="text-3xl text-gray-400" />
                    </div>
                  )}
                </div>
                <label 
                  className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full cursor-pointer group-hover:bg-primary-focus transition-all"
                  title="Changer la photo"
                >
                  <FiCamera />
                  <input 
                    type="file" 
                    className="hidden" 
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </label>
              </div>
              {errors.profile_picture && (
                <p className="mt-1 text-sm text-error">{errors.profile_picture}</p>
              )}
            </div>

            {/* Champs du formulaire */}
            <div className="space-y-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text flex items-center gap-2">
                    <FiUser /> Nom complet
                  </span>
                </label>
                <input
                  type="text"
                  name="name"
                  className={`input input-bordered w-full ${errors.name ? 'input-error' : ''}`}
                  value={formDataProfileUpdate.name}
                  onChange={handleChange}
                />
                {errors.name && <p className="mt-1 text-sm text-error">{errors.name}</p>}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text flex items-center gap-2">
                    <FiPhone /> Téléphone
                  </span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  className={`input input-bordered w-full ${errors.phone ? 'input-error' : ''}`}
                  value={formDataProfileUpdate.phone}
                  onChange={handleChange}
                />
                {errors.phone && <p className="mt-1 text-sm text-error">{errors.phone}</p>}
              </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text flex items-center gap-2">
                      <FiMapPin /> Adresse
                    </span>
                  </label>
                  <input
                    type="text"
                    name="address"
                    className={`input input-bordered w-full ${errors.address ? 'input-error' : ''}`}
                    value={formDataProfileUpdate.address}
                    onChange={handleChange}
                  />
                  {errors.city && <p className="mt-1 text-sm text-error">{errors.address}</p>}
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text flex items-center gap-2">
                      <FiMapPin /> Region
                    </span>
                  </label>
                  <input
                    type="text"
                    name="region"
                    className={`input input-bordered w-full ${errors.region ? 'input-error' : ''}`}
                    value={formDataProfileUpdate.region}
                    onChange={handleChange}
                  />
                  {errors.region && <p className="mt-1 text-sm text-error">{errors.region}</p>}
                </div>

              {/* Coordonnées GPS */}
              <div className="form-control">
                  <label className="label">
                    <span className="label-text flex items-center gap-1">
                      <FiMapPin />
                      Coordonnées GPS
                    </span>
                  </label>
                  <input
                    type="text"
                    name="gps_coordinates"
                    value={formDataProfileUpdate.gps_coordinates}
                    onChange={handleChange}
                    className="input w-full input-bordered"
                    placeholder="Latitude, Longitude"
                  />
                </div>

                {/* Pour les agriculteurs */}
                {user?.role === 'farmer' && (
                  <>
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text flex items-center gap-1">
                          <FiCrop />
                          Superficie (hectares)
                        </span>
                      </label>
                      <input
                        type="number"
                        name="land_size"
                        value={formDataProfileUpdate.land_size}
                        onChange={handleChange}
                        className={`input input-bordered w-full ${errors.land_size ? 'input-error' : ''}`}
                        min="0"
                        step="0.01"
                        placeholder="0.00"
                      />
                      {errors.land_size && (
                        <label className="label">
                          <span className="label-text-alt text-error">{errors.land_size}</span>
                        </label>
                      )}
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text flex items-center gap-1">
                          <FiCalendar />
                          Agriculteur depuis
                        </span>
                      </label>
                      <input
                        type="number"
                        name="farming_since"
                        min="1900"
                        max={new Date().getFullYear()}
                        className={`input input-bordered w-full ${errors.farming_since ? 'input-error' : ''}`}
                        onChange={(e) => setFormDataProfileUpdate({...formDataProfileUpdate, farming_since: parseInt(e.target.value) || null})}
                        placeholder="Année"
                      />
                      {errors.farming_since && (
                        <label className="label">
                          <span className="label-text-alt text-error">{errors.farming_since}</span>
                        </label>
                      )}
                    </div>
                  </>
                )}

              <div className="form-control">
                <label className="label">
                  <span className="label-text flex items-center gap-2">
                    <FiInfo /> A propos de vous
                  </span>
                </label>
                <textarea
                  name="bio"
                  className={`textarea textarea-bordered w-full ${errors.bio ? 'textarea-error' : ''}`}
                  rows="5"
                  value={formDataProfileUpdate.bio}
                  onChange={handleChange}
                ></textarea>
                {errors.bio && <p className="mt-1 text-sm text-error">{errors.bio}</p>}
              </div>

            </div>

            <div className="modal-action">
              <button 
                type="button" 
                className="btn btn-ghost"
                onClick={onClose}
                disabled={isLoading}
              >
                Annuler
              </button>
              <button 
                type="submit" 
                className={`btn btn-primary ${isLoading ? 'loading' : ''}`}
                disabled={isLoading}
              >
                {isLoading ? 'Enregistrement...' : 'Mettre à jour'}
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProfileUpdateModal;