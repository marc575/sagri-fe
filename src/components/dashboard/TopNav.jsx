import React, { useState } from 'react';
import logo from '../../assets/img/logo-light.png'
import Avatar from '../ui/Avatar';
import { useAuth } from '../../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiUser, FiMail, FiPhone, FiMapPin, FiCalendar, FiGlobe, FiInfo, FiCheckCircle, FiAward, FiLock, FiEye, FiEyeOff, FiImage, FiCrop } from 'react-icons/fi';
import ProfileUpdateModal from './ProfileUpdateModal';

function TopNav() {
  const { user, logout, changePassword, registerComplete } = useAuth();

  const [errors, setErrors] = useState({});
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showModalPassword, setShowModalPassword] = useState(false);
  const [formDataPassword, setFormDataPassword] = useState({
    current_password: '',
    new_password: '',
    new_password_confirmation: ''
  });
  const [selectedUser, setSelectedUser] = useState(user);
  const [showModal, setShowModal] = useState(false);
  
  const [showModalUpdateProfile, setShowModalUpdateProfile] = useState(false);

  const [formDataProfile, setFormDataProfile] = useState({
    phone: user?.phone || '',
    address: user?.address || '',
    region: user?.region || '',
    profile_picture: null,
    bio: user?.bio || '',
    land_size: user?.land_size || '',
    gps_coordinates: user?.gps_coordinates || '',
    farming_since: user?.farming_since || '',
    language_id: user?.language_id || '',
  });

  const languages = [{id: 1, name: "Français"}, {id: 2, name: "English"}]

  const [showModalProfile, setShowModalProfile] = useState(false);
  const [errorsProfile, setErrorsProfile] = useState({});
  const [previewImage, setPreviewImage] = useState(user?.profile_picture || null);
  const [isSubmittingProfile, setIsSubmittingProfile] = useState(false);

  const handleChangeProfile = (e) => {
    const { name, value } = e.target;
    setFormDataProfile(prev => ({ ...prev, [name]: value }));
    if (errorsProfile[name]) setErrorsProfile(prev => ({ ...prev, [name]: null }));
  };

  const handleFileChangeProfile = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormDataProfile(prev => ({ ...prev, profile_picture: file }));
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const validateProfile = () => {
    const newErrors = {};
    
    if (!formDataProfile.phone.trim()) newErrors.phone = 'Le téléphone est requis';
    if (!formDataProfile.address.trim()) newErrors.address = 'L\'adresse est requise';
    if (!formDataProfile.region.trim()) newErrors.region = 'La région est requise';
    
    if (formDataProfile.land_size && formDataProfile.land_size < 0) {
      newErrors.land_size = 'La superficie ne peut être négative';
    }
    
    if (formDataProfile.farming_since) {
      const currentYear = new Date().getFullYear();
      if (formDataProfile.farming_since < 1900 || formDataProfile.farming_since > currentYear) {
        newErrors.farming_since = `Année invalide (1900-${currentYear})`;
      }
    }

    setErrorsProfile(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmitProfile = async (e) => {
    e.preventDefault();
    if (!validateProfile()) return;

    setIsSubmittingProfile(true);
    try {
      await registerComplete(formDataProfile);
      closeModalProfile();
    } catch (error) {
      setErrorsProfile({
        server: error.response?.data?.message || 'Erreur lors de la mise à jour'
      });
    } finally {
      setIsSubmittingProfile(false);
    }
  };
  
  if (!user) return null;

  // Formater la date
  const formatDate = (dateString) => {
    if (!dateString) return 'Non renseigné';
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  // Traduire le statut
  const getStatusLabel = (status) => {
    return status === 1 ? 
      <span className="badge badge-success">Actif</span> : 
      <span className="badge badge-error">Inactif</span>;
  };

  // Traduire le rôle
  const getRoleLabel = (role) => {
    const roles = {
      farmer: 'Agriculteur',
      buyer: 'Acheteur',
      admin: 'Administrateur'
    };
    return <span className="badge badge-info">{roles[role] || role}</span>;
  };


  const openModalProfile = () => {
    setShowModalProfile(true);
  };
  
  const closeModalProfile = () => {
    setShowModalProfile(false);
  };


  const openModal = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };
  
  const closeModal = () => {
    setSelectedUser(null);
    setShowModal(false);
  };



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormDataPassword(prev => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formDataPassword.current_password) {
      newErrors.current_password = 'Le mot de passe actuel est requis';
    }
    
    if (!formDataPassword.new_password) {
      newErrors.new_password = 'Un nouveau mot de passe est requis';
    } else if (formDataPassword.new_password.length < 8) {
      newErrors.new_password = 'Minimum 8 caractères';
    }
    
    if (formDataPassword.new_password !== formDataPassword.new_password_confirmation) {
      newErrors.new_password_confirmation = 'Les mots de passe ne correspondent pas';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) return;
    try {
      await changePassword(formDataPassword);
      closeModalPassword();
    } catch (error) {
      setErrors({
        server: error.response?.data?.message || 'Erreur lors de la mise à jour'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const openModalPassword = () => {
    setShowModalPassword(true);
  };
  
  const closeModalPassword = () => {
    setShowModalPassword(false);
  };

  return (
    <>
    <div className='bg-primary shadow-sm py-2'>
      <div className="navbar container mx-auto">
        <div className="flex-1">
          <a href='/dashboard'><img src={logo} className="rounded-xl"  alt="logo" width="50"/> </a>
        </div>
        <div className="flex gap-2">
        <label className="input">
          <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input type="search" required placeholder="Rechercher..." />
        </label>
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <Avatar user={user} />
            </div>
            <ul
              tabIndex={0}
              className="menu menu-md dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
              <li>
                <a href='/me'>
                  Tableau de bord
                </a>
              </li>
              <li>
                <a onClick={() => openModal(user)}>
                  Mon Compte
                </a>
              </li>
              {
                user?.status === 0 ? (
                  <li>
                    <a onClick={() => openModalProfile()}>
                      Completer le profil
                    </a>
                  </li>
                ) : null
              }
              <li>
                <a onClick={() => openModalPassword()}>
                  Nouveau mot de Passe
                </a>
              </li>
              <li>
                <a onClick={logout}>Deconnexion</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <AnimatePresence>
      {showModalProfile && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.95, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 100 }}
            className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="sticky top-0 bg-primary p-6 flex justify-between items-center z-10">
              <h2 className="text-xl font-bold flex items-center gap-2 text-white">
                <FiUser className="" />
                Compléter votre profil
              </h2>
              <button 
                onClick={() => closeModalProfile()}
                className="btn btn-circle btn-ghost btn-sm"
                disabled={isSubmittingProfile}
              >
                <FiX className="text-lg" />
              </button>
            </div>

            {/* Body */}
            <form onSubmit={handleSubmitProfile} className="p-6 space-y-6">
              {errorsProfile.server && (
                <div className="alert alert-error">
                  <span>{errorsProfile.server}</span>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Photo de profil */}
                <div className="md:col-span-2">
                  <div className="flex flex-col items-center gap-4">
                    <div className="avatar">
                      <div className="w-24 h-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                        {previewImage ? (
                          <img src={previewImage} alt="Preview" className="object-cover" />
                        ) : (
                          <div className="bg-gray-200 text-gray-400 flex items-center justify-center h-full">
                            <FiUser className="text-3xl" />
                          </div>
                        )}
                      </div>
                    </div>
                    <label className="btn btn-outline btn-sm gap-2">
                      <FiImage />
                      Changer la photo
                      <input 
                        type="file" 
                        className="hidden" 
                        accept="image/*"
                        onChange={handleFileChangeProfile}
                      />
                    </label>
                  </div>
                </div>

                {/* Téléphone */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text flex items-center gap-1">
                      <FiPhone />
                      Téléphone *
                    </span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formDataProfile.phone}
                    onChange={handleChangeProfile}
                    className={`input input-bordered ${errorsProfile.phone ? 'input-error' : ''}`}
                    placeholder="+237 6XXXXXXXX"
                  />
                  {errorsProfile.phone && (
                    <label className="label">
                      <span className="label-text-alt text-error">{errorsProfile.phone}</span>
                    </label>
                  )}
                </div>

                {/* Langue */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text flex items-center gap-1">
                      <FiGlobe />
                      Langue préférée
                    </span>
                  </label>
                  <select
                    name="language_id"
                    value={formDataProfile.language_id}
                    onChange={handleChangeProfile}
                    className="select select-bordered"
                  >
                    <option value="">Sélectionnez une langue</option>
                    {languages.map(lang => (
                      <option key={lang.id} value={lang.id}>{lang.name}</option>
                    ))}
                  </select>
                </div>

                {/* Adresse */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text flex items-center gap-1">
                      <FiMapPin />
                      Adresse complète *
                    </span>
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formDataProfile.address}
                    onChange={handleChangeProfile}
                    className={`input input-bordered ${errorsProfile.address ? 'input-error' : ''}`}
                    placeholder="Rue, ville, quartier..."
                  />
                  {errorsProfile.address && (
                    <label className="label">
                      <span className="label-text-alt text-error">{errorsProfile.address}</span>
                    </label>
                  )}
                </div>

                {/* Région */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text flex items-center gap-1">
                      <FiMapPin />
                      Région *
                    </span>
                  </label>
                  <input
                    type="text"
                    name="region"
                    value={formDataProfile.region}
                    onChange={handleChangeProfile}
                    className={`input input-bordered ${errorsProfile.region ? 'input-error' : ''}`}
                    placeholder="Votre région"
                  />
                  {errorsProfile.region && (
                    <label className="label">
                      <span className="label-text-alt text-error">{errorsProfile.region}</span>
                    </label>
                  )}
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
                    value={formDataProfile.gps_coordinates}
                    onChange={handleChangeProfile}
                    className="input input-bordered"
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
                        value={formDataProfile.land_size}
                        onChange={handleChangeProfile}
                        className={`input input-bordered ${errorsProfile.land_size ? 'input-error' : ''}`}
                        min="0"
                        step="0.01"
                        placeholder="0.00"
                      />
                      {errorsProfile.land_size && (
                        <label className="label">
                          <span className="label-text-alt text-error">{errorsProfile.land_size}</span>
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
                        className={`input input-bordered ${errorsProfile.farming_since ? 'input-error' : ''}`}
                        onChange={(e) => setFormDataProfile({...formDataProfile, farming_since: parseInt(e.target.value) || null})}
                        placeholder="Année"
                      />
                      {errorsProfile.farming_since && (
                        <label className="label">
                          <span className="label-text-alt text-error">{errorsProfile.farming_since}</span>
                        </label>
                      )}
                    </div>
                  </>
                )}
              </div>

                {/* Bio */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text flex items-center gap-1">
                      <FiInfo />
                      À propos de vous
                    </span>
                  </label> <br />
                  <textarea
                    name="bio"
                    value={formDataProfile.bio}
                    onChange={handleChangeProfile}
                    className="textarea textarea-bordered h-32 w-full"
                    placeholder="Décrivez-vous en quelques mots..."
                    maxLength="500"
                  />
                  <label className="label">
                    <span className="label-text-alt">
                      {formDataProfile.bio.length}/500 caractères
                    </span>
                  </label>
                </div>

              {/* Footer */}
              <div className="pt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => closeModalProfile()}
                  className="btn btn-ghost"
                  disabled={isSubmittingProfile}
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isSubmittingProfile}
                >
                  {isSubmittingProfile ? (
                    <span className="loading loading-spinner"></span>
                  ) : 'Enregistrer'}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>

    <AnimatePresence>
      {showModalPassword && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0  backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.95, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 100 }}
            className="bg-white rounded-xl shadow-2xl w-full max-w-md"
          >
            {/* Header */}
            <div className="border-b p-6 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <FiLock className="text-primary" />
                Modifier le mot de passe
              </h2>
              <button 
                onClick={() => closeModalPassword()}
                className="btn btn-circle btn-ghost btn-sm"
                disabled={isSubmitting}
              >
                <FiX className="text-lg" />
              </button>
            </div>

            {/* Body */}
            <form onSubmit={handleSubmit} className="p-6">
              {errors.server && (
                <div className="alert alert-error mb-4">
                  <span>{errors.server}</span>
                </div>
              )}

              <div className="space-y-4">
                {/* Current Password */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Mot de passe actuel</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showCurrentPassword ? "text" : "password"}
                      name="current_password"
                      value={formDataPassword.current_password}
                      onChange={handleChange}
                      className={`input input-bordered w-full ${errors.current_password ? 'input-error' : ''}`}
                      disabled={isSubmitting}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    >
                      {showCurrentPassword ? <FiEyeOff /> : <FiEye />}
                    </button>
                  </div>
                  {errors.current_password && (
                    <label className="label">
                      <span className="label-text-alt text-error">{errors.current_password}</span>
                    </label>
                  )}
                </div>

                {/* New Password */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Nouveau mot de passe</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showNewPassword ? "text" : "password"}
                      name="new_password"
                      value={formDataPassword.new_password}
                      onChange={handleChange}
                      className={`input input-bordered w-full ${errors.new_password ? 'input-error' : ''}`}
                      disabled={isSubmitting}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                    >
                      {showNewPassword ? <FiEyeOff /> : <FiEye />}
                    </button>
                  </div>
                  {errors.new_password && (
                    <label className="label">
                      <span className="label-text-alt text-error">{errors.new_password}</span>
                    </label>
                  )}
                  <label className="label">
                    <span className="label-text-alt text-gray-500">Minimum 8 caractères</span>
                  </label>
                </div>

                {/* Confirm Password */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Confirmer le nouveau mot de passe</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="new_password_confirmation"
                      value={formDataPassword.new_password_confirmation}
                      onChange={handleChange}
                      className={`input input-bordered w-full ${errors.new_password_confirmation ? 'input-error' : ''}`}
                      disabled={isSubmitting}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                    </button>
                  </div>
                  {errors.new_password_confirmation && (
                    <label className="label">
                      <span className="label-text-alt text-error">{errors.new_password_confirmation}</span>
                    </label>
                  )}
                </div>
              </div>

              {/* Footer */}
              <div className="mt-8 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => closeModalPassword()}
                  className="btn btn-ghost"
                  disabled={isSubmitting}
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="loading loading-spinner"></span>
                  ) : 'Mettre à jour'}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
    
    <AnimatePresence>
    {showModal && selectedUser && (<motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.95, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ type: "spring", damping: 25 }}
          className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className="p-6 bg-primary text-white">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <Avatar user={user} />
                  {user.name}
                </h2>
              </div>
              <button 
                onClick={() => closeModal()}
                className="btn btn-circle btn-ghost btn-sm text-white hover:bg-white/20"
              >
                <FiX className="text-lg" />
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="overflow-y-auto p-6 flex-1">
            <div className="flex gap-3 mb-5">
              {getRoleLabel(user.role)}
              {getStatusLabel(user.status)}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Colonne 1 - Informations de base */}
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <FiMail className="text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-500">Email</h3>
                    <p>{user.email}</p>
                    {user.email_verified_at && (
                      <p className="text-sm text-success flex items-center gap-1 mt-1">
                        <FiCheckCircle /> Vérifié le {formatDate(user.email_verified_at)}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <FiPhone className="text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-500">Téléphone</h3>
                    <p>{user.phone || 'Non renseigné'}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <FiMapPin className="text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-500">Localisation</h3>
                    <p>{user.address || 'Non renseigné'}</p>
                    {user.region && <p className="text-sm">{user.region}</p>}
                    {user.gps_coordinates && (
                      <p className="text-sm text-gray-500 mt-1">
                        Coordonnées GPS: {user.gps_coordinates}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Colonne 2 - Informations spécifiques */}
              <div className="space-y-4">
                {user.role === 'farmer' && (
                  <>
                    <div className="flex items-start gap-3">
                      <FiAward className="text-primary mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-gray-500">Activité agricole</h3>
                        <p>
                          {user.farming_since 
                            ? `Agriculteur depuis ${formatDate(user.farming_since)}` 
                            : 'Début non spécifié'}
                        </p>
                        {user.land_size && (
                          <p className="mt-1">Superficie: {user.land_size} hectares</p>
                        )}
                      </div>
                    </div>
                  </>
                )}

                <div className="flex items-start gap-3">
                  <FiCalendar className="text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-500">Dates</h3>
                    <p>Inscrit le {formatDate(user.created_at)}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      Dernière mise à jour: {formatDate(user.updated_at)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bio */}
            {user.bio && (
              <div className="mt-6">
                <h3 className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <FiInfo className="text-primary" />
                  À propos
                </h3>
                <div className="bg-gray-50 p-4 rounded-lg whitespace-pre-line">
                  {user.bio}
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="border-t px-6 py-4 bg-gray-50 flex gap-4 justify-end">
            <button 
              onClick={() => closeModal()}
              className="btn btn-ghost"
            >
              Fermer
            </button>

            <div>
              <button 
                className="btn btn-primary"
                onClick={() => setShowModalUpdateProfile(true)}
              >
                Modifier le profil
              </button>

              {showModalUpdateProfile && (
                <ProfileUpdateModal 
                  user={user}
                  onClose={() => setShowModalUpdateProfile(false)}
                />
              )}
            </div>

          </div>
        </motion.div>
      </motion.div>
    )}
    </AnimatePresence>
    </>
  )
}

export default TopNav
