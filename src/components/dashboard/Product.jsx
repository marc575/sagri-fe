import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiEdit2, FiTrash2, FiX, FiBox, FiDollarSign, FiTag, FiCheckCircle, FiAlignLeft } from 'react-icons/fi';
import { useProject } from '../../context/ProjectContext';
import { useProduct } from '../../context/ProductContext';
import Loading from '../ui/Loading';
import Description from '../ui/Description';

const Product = ({ userId }) => {
  const { products, updateProduct, postProduct, deleteProduct, productsLoading } = useProduct();
  const { projects, projectsLoading } = useProject();
  let isLoading = productsLoading || projectsLoading;
  const [modalOpenProduct, setModalOpenProduct] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [formDataProduct, setFormDataProduct] = useState({
    name: '',
    description: '',
    project_id: '',
    quantity_available: '',
    unit: 'kg',
    price_per_unit: '',
    category: '',
    is_organic: false,
    status: 'available',
    user_id: userId
  });

  // Unités disponibles
  const units = ['kg', 'g', 'L', 'mL', 'piece', 'dozen', 'box'];
  
  // Catégories disponibles
  const categories = [
    'Agriculture',
    'Élevage',
    'Transformation',
    'Commercialisation',
    'Recherche'
  ];

  const getStatusLabel = (statut) => {
    const status = {
      available: 'Disponible',
      sold_out: 'Rupture',
    };
    return <span className={`badge ${statusColors[statut]}`}>{status[statut] || statut}</span>;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormDataProduct(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked ? 1 : 0
      : value
    }));
  };

  const openModalProduct = (product = null) => {
    setCurrentProduct(product);
    setFormDataProduct(product ? { 
      ...product,
      is_organic: product.is_organic || false
    } : {
      name: '',
      description: '',
      project_id: '',
      quantity_available: '',
      unit: 'kg',
      price_per_unit: '',
      category: '',
      is_organic: false,
      status: 'available',
      user_id: userId
    });
    setModalOpenProduct(true);
  };

  const closeModalProduct = () => {
    setModalOpenProduct(false);
    setCurrentProduct(null);
  };

  const handleSubmitProduct = async (e) => {
    e.preventDefault();
    try {
      if (currentProduct) {
        await updateProduct(formDataProduct, currentProduct.id);
        setModalOpenProduct(false);
      } else {
        await postProduct(formDataProduct);
        setModalOpenProduct(false);
      }
      closeModalProduct();
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  const handleDeleteProduct = async (e, id) => {
    e.preventDefault();
    try {
        await deleteProduct(id);
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const statusColors = {
    coming_soon: 'bg-blue-100 text-blue-800',
    available: 'bg-green-100 text-green-800',
    sold_out: 'bg-red-100 text-red-800'
  };

  if (isLoading) return <Loading/>;

  return (
    <div className="container mx-auto py-12 px-2 border-t-2 border-[#FDFAD0]">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-xl font-bold text-secondary">Mes Produits</h1>
        <button
          onClick={() => openModalProduct()}
          className="btn btn-primary gap-2 btn-sm"
        >
          <FiPlus /> Nouveau Produit
        </button>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {Array.isArray(products) && products.map(product => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="card bg-base-100 shadow-xs hover:shadow-md transition-shadow border border-[#FDFAD0]"
          >
            <figure>
              {product.image ? (
                <img 
                  src={`http://localhost:8000/storage/${product.image}`} 
                  alt={product.name} 
                  className="w-full h-48 object-cover"
                />
              ) : (
                <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                  <FiBox className="text-4xl text-gray-400" />
                </div>
              )}
            </figure>
            <div className="card-body">
              <div className="flex justify-between items-start">
                <h2 className="card-title text-secondary text-lg">{product.name}</h2>
                { getStatusLabel(product.status) }
              </div>
              
              <div className="mt-2 flex flex-wrap gap-4 items-center">
                <div className="flex items-center gap-2">
                  <FiDollarSign className="text-secondary" />
                  <span>{product.price_per_unit} FCFA/{product.unit}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FiTag className="text-secondary" />
                  <span>{product.quantity_available} {product.unit} disponibles</span>
                </div>
                <div className="flex items-center gap-2">
                  <FiCheckCircle className="text-secondary" />
                  <span>{product.category} {product.is_organic ? '(Bio)' : null }</span>
                </div>
              </div>

              {product.description && (
                <Description description={product.description} />
              )}

              <div className="card-actions justify-end mt-4">
                <button onClick={() => openModalProduct(product)} className="btn btn-sm btn-ghost gap-1 border-success hover:bg-success">
                  <FiEdit2 /> Modifier
                </button>
                <button onClick={(e) => handleDeleteProduct(e, product.id)} className="btn btn-sm btn-ghost text-error gap-1 border-error hover:bg-error hover:text-white">
                  <FiTrash2 /> Supprimer
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {modalOpenProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={closeModalProduct}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 100 }}
              className="modal-box w-full max-w-2xl relative bg-white shadow-xl rounded-xl p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={closeModalProduct} className="btn btn-sm btn-circle absolute right-4 top-4 z-10">
                <FiX />
              </button>
              
              <h3 className="text-2xl font-bold mb-10 mt-4">
                {currentProduct ? 'Modifier le Produit' : 'Ajouter un Nouveau Produit'}
              </h3>

              <form onSubmit={handleSubmitProduct} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Nom du produit</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formDataProduct.name}
                      onChange={handleInputChange}
                      className="input input-bordered"
                      required
                    />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Projet associé</span>
                    </label>
                    <select
                      name="project_id"
                      value={formDataProduct.project_id}
                      onChange={handleInputChange}
                      className="select select-bordered"
                    >
                      <option value="">Aucun projet</option>
                      {projects.map(project => (
                        <option key={project.id} value={project.id}>
                          {project.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Quantité disponible</span>
                    </label>
                    <input
                      type="number"
                      name="quantity_available"
                      value={formDataProduct.quantity_available}
                      onChange={handleInputChange}
                      className="input input-bordered"
                      min="0"
                      step="0.01"
                      required
                    />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Unité</span>
                    </label>
                    <select
                      name="unit"
                      value={formDataProduct.unit}
                      onChange={handleInputChange}
                      className="select select-bordered"
                      required
                    >
                      {units.map(unit => (
                        <option key={unit} value={unit}>{unit}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Prix par unité (FCFA)</span>
                    </label>
                    <input
                      type="number"
                      name="price_per_unit"
                      value={formDataProduct.price_per_unit}
                      onChange={handleInputChange}
                      className="input input-bordered"
                      min="0"
                      step="0.01"
                      required
                    />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Catégorie</span>
                    </label>
                    <select
                      name="category"
                      value={formDataProduct.category}
                      onChange={handleInputChange}
                      className="select select-bordered"
                      required
                    >
                      <option value="">Sélectionner une catégorie</option>
                      {categories.map(category => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Image du produit</span>
                  </label>
                  <input
                    type="file"
                    name="image"
                    onChange={(e) => {
                        if (e.target.files[0]) {
                            // Validation de la taille
                            if (e.target.files[0].size > 2 * 1024 * 1024) {
                            alert('Fichier trop volumineux (max 2MB)');
                            return;
                            }
                            setFormDataProduct({...formDataProduct, image: e.target.files[0]});
                        }
                    }}
                    className="file-input file-input-bordered w-full"
                    accept="image/png, image/jpeg, image/jpg, image/webp, image/tiff, image/svg"
                  />
                </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Statut</span>
                    </label>
                    <select
                      name="status"
                      value={formDataProduct.status}
                      onChange={handleInputChange}
                      className="select select-bordered"
                      required
                    >
                      <option value="available">Disponible</option>
                      <option value="out_of_stock">En rupture</option>
                      <option value="coming_soon">Bientôt disponible</option>
                    </select>
                  </div>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Description</span>
                  </label>
                  <br />
                  <textarea
                    name="description"
                    value={formDataProduct.description}
                    onChange={handleInputChange}
                    className="textarea textarea-bordered h-24 w-full"
                  />
                </div>

                <div className="form-control">
                    <label className="label cursor-pointer">
                      <span className="label-text">Produit bio</span>
                      <input
                        type="checkbox"
                        name="is_organic"
                        checked={formDataProduct.is_organic}
                        onChange={handleInputChange}
                        className="checkbox checkbox-primary"
                      />
                    </label>
                </div>

                <div className="modal-action">
                  <button type="button" onClick={closeModalProduct} className="btn btn-ghost">
                    Annuler
                  </button>
                  <button type="submit" className="btn btn-primary">
                    {currentProduct ? 'Mettre à jour' : 'Ajouter'}
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

export default Product;
