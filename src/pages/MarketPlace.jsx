import { useState, useEffect } from 'react';
import { FiFilter, FiSearch, FiStar, FiHeart, FiShoppingCart, FiTag, FiPackage, FiRefreshCw, FiGrid, FiList, FiImage, FiDollarSign, FiSliders, FiBarChart2, FiX, FiTrash2, FiArrowRight, FiAlertCircle, FiCheckCircle } from 'react-icons/fi';
import { useProduct } from '../context/ProductContext';
import Loading from '../components/ui/Loading';
import Description from '../components/ui/Description';
import TopNav from '../components/dashboard/TopNav';
import OrderForm from '../components/dashboard/OrderForm';
import { useAuth } from '../context/AuthContext';

const MarketPlace = () => {
  const { allProducts, loading, error } = useProduct();
  const { user } = useAuth();
  const [filteredProducts, setFilteredProducts] = useState([]);
  
  // États pour les filtres
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState([50, 10000]);
  const [organicOnly, setOrganicOnly] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortOption, setSortOption] = useState('newest');
  const [showFilters, setShowFilters] = useState(false);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [orderStatus, setOrderStatus] = useState(null); // 'success', 'error', null

  // Extraction des catégories uniques
  const allProductsArray = Array.isArray(allProducts) ? allProducts : [];
  const categories = ['all', ...new Set(allProductsArray.map(p => p?.category))];

  // Dans votre composant principal
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  // Fonction pour ajouter un produit au panier
  const addToCart = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  // Fonction pour mettre à jour la quantité
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId 
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  // Fonction pour supprimer un article
  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  // Calcul du total
  const cartTotal = cart.reduce((total, item) => total + (item.price_per_unit * item.quantity), 0);

  // Application des filtres et du tri
  useEffect(() => {
    if (!allProducts) return;

    let result = [...allProducts];
    
    // Filtre par recherche
    if (searchTerm) {
      result = result.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (product.description && product.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    // Filtre par catégorie
    if (selectedCategory !== 'all') {
      result = result.filter(product => product.category === selectedCategory);
    }
    
    // Filtre par prix
    result = result.filter(product => 
      product.price_per_unit >= priceRange[0] && 
      product.price_per_unit <= priceRange[1]
    );
    
    // Filtre bio
    if (organicOnly) {
      result = result.filter(product => product.is_organic);
    }
    
    // Filtre par statut
    if (statusFilter !== 'all') {
      result = result.filter(product => product.status === statusFilter);
    }
    
    // Tri des produits
    switch (sortOption) {
      case 'price_asc':
        result.sort((a, b) => a.price_per_unit - b.price_per_unit);
        break;
      case 'price_desc':
        result.sort((a, b) => b.price_per_unit - a.price_per_unit);
        break;
      case 'newest':
        result.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        break;
      case 'oldest':
        result.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
        break;
    }
    
    setFilteredProducts(result);
  }, [allProducts, searchTerm, selectedCategory, priceRange, organicOnly, statusFilter, sortOption]);

  if (loading) return (
    <Loading />
  );

  if (error) return (
    <div className="alert alert-error max-w-md mx-auto mt-8">
      <span>Erreur lors du chargement des produits: {error.message}</span>
    </div>
  );

  return (
    <>
    <TopNav />
    <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-8 relative">
      {/* En-tête amélioré */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-secondary uppercase">MarketPlace</h1>
          <p className="text-gray-500 mt-1">{filteredProducts.length} produits disponibles</p>
        </div>
        
        <div className="flex flex-row gap-3 w-full md:w-auto">
          <div className="relative flex-1 max-w-xl">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
              <FiSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Rechercher des produits, catégories..."
              className="input input-bordered pl-10 w-full bg-white focus:bg-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex gap-3">
            <button 
              className="btn border-secondary text-secondary flex items-center gap-2"
              onClick={() => setShowFilters(!showFilters)}
            >
              <FiFilter />
              {showFilters ? 'Masquer' : 'Filtres'}
            </button>
          </div>
          
          <button 
            className="bg-primary px-4 py-2 rounded-2xl text-secondary relative"
            onClick={() => setShowCart(true)}
          >
            <FiShoppingCart className="text-md text-white" />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-secondary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Panneau de filtres amélioré */}
      {showFilters && (
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-center">
            {/* Catégorie avec icône */}
            <div>
              <label className="label">
                <span className="label-text flex items-center gap-2">
                  <FiTag /> Catégorie
                </span>
              </label>
              <select
                className="select select-bordered w-full bg-gray-50"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'Toutes catégories' : category}
                  </option>
                ))}
              </select>
            </div>

            {/* Plage de prix améliorée */}
            <div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-gray-500">
                  <span>0 FCFA</span>
                  <span>{priceRange[1]} FCFA</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="10000"
                  step="50"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="range range-primary w-full"
                />
              </div>
            </div>

            {/* Filtres rapides avec icônes */}
            <div>
              <label className="label">
                <span className="label-text flex items-center gap-2">
                  <FiSliders /> Options
                </span>
              </label>
                <select
                  className="select select-bordered w-full bg-gray-50"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">Tous statuts</option>
                  <option value="available">Disponible</option>
                  <option value="sold_out">Rupture</option>
                </select>
            </div>

            
            <div className="mt-0 sm:mt-5">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-primary"
                    checked={organicOnly}
                    onChange={(e) => setOrganicOnly(e.target.checked)}
                  />
                  <span className="flex items-center gap-2">
                    Produits bio
                  </span>
                </label>
            </div>

            {/* Tri avec icône */}
            <div>
              <label className="label">
                <span className="label-text flex items-center gap-2">
                  <FiBarChart2 /> Trier par
                </span>
              </label>
              <select
                className="select select-bordered w-full bg-gray-50"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
              >
                <option value="newest">Plus récents</option>
                <option value="oldest">Plus anciens</option>
                <option value="price_asc">Prix croissant</option>
                <option value="price_desc">Prix décroissant</option>
                <option value="rating">Meilleures notes</option>
              </select>
            </div>
          </div>
          
          {/* Boutons d'action */}
          <div className="flex justify-end gap-3 mt-5 pt-4 border-t border-gray-100">
            <button 
              className="btn btn-ghost text-gray-500"
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
                setPriceRange([0, 1000]);
                setOrganicOnly(false);
                setStatusFilter('all');
              }}
            >
              Réinitialiser
            </button>
            <button 
              className="btn btn-primary"
              onClick={() => setShowFilters(false)}
            >
              Appliquer
            </button>
          </div>
        </div>
      )}

      {/* Affichage des produits amélioré */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 rounded-lg">
          <FiPackage className="mx-auto text-4xl text-gray-300 mb-4" />
          <p className="text-xl text-gray-500">Aucun produit ne correspond à vos critères</p>
          <button 
            className="btn btn-outline mt-6"
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('all');
              setPriceRange([0, 1000]);
              setOrganicOnly(false);
              setStatusFilter('all');
            }}
          >
            <FiRefreshCw className="mr-2" />
            Réinitialiser les filtres
          </button>
        </div>
      ) : (
        <>
          {/* Options d'affichage */}
          <div className="flex justify-between items-center mb-4">
            <div className="text-sm text-gray-500">
              Affichage de {Math.min(filteredProducts.length, 12)} sur {filteredProducts.length} produits
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Disposition :</span>
              <button className="p-2 rounded hover:bg-gray-100">
                <FiGrid />
              </button>
              <button className="p-2 rounded hover:bg-gray-100">
                <FiList />
              </button>
            </div>
          </div>
          
          {/* Grille de produits */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredProducts.map(product => (
              <div key={product.id} className="group relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 hover:border-primary/20">
                {/* Badge de statut amélioré */}
                {product.status === 'sold_out' && (
                  <div className="badge badge-error absolute top-3 right-3 z-10 shadow-sm">
                    <FiXCircle className="mr-1" /> Rupture
                  </div>
                )}
                
                {/* Image du produit avec effet hover */}
                <figure className="relative pt-[75%] bg-gray-50 overflow-hidden">
                  {product.image ? (
                    <img 
                      src={`http://localhost:8000/storage/${product.image}`} 
                      alt={product.name}
                      className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-gray-300">
                      <FiImage className="text-4xl" />
                    </div>
                  )}
                </figure>

                {/* Contenu de la carte amélioré */}
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-gray-900 line-clamp-2 hover:text-primary transition-colors">
                      {product.name}
                    </h3>
                  </div>

                  <Description description={product?.description} />

                  <div className="mt-3">
                    <p className="text-primary font-bold text-xl">
                      {product.price_per_unit.toLocaleString()} FCFA
                      <span className="text-sm font-normal text-primary"> / {product.unit}</span>
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      <FiPackage className="inline mr-1" />
                      {product.quantity_available} {product.unit} disponible(s)
                    </p>
                  </div>

                  <div className="mt-4 flex justify-between items-center">
                    <button 
                      className={`btn btn-sm btn-secondary flex-1 ${product.status === 'sold_out' ? 'btn-disabled' : ''}`}
                      disabled={product.status === 'sold_out' || product?.user_id === user?.id }
                      onClick={() => addToCart(product)}
                    >
                      <FiShoppingCart className="mr-2" />
                      {product.status === 'sold_out' ? 'Indisponible' : 'Ajouter au panier'}
                    </button>
                  </div>

                  {product.is_organic ? (
                    <div className="absolute top-3 right-3 bg-secondary text-white px-2 py-1 rounded-full text-xs flex items-center">
                      Bio
                    </div>
                  ): null}
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {filteredProducts.length > 12 && (
            <div className="flex justify-center mt-8">
              <div className="btn-group">
                <button className="btn btn-outline">Précédent</button>
                <button className="btn btn-outline btn-active">1</button>
                <button className="btn btn-outline">2</button>
                <button className="btn btn-outline">3</button>
                <button className="btn btn-outline">Suivant</button>
              </div>
            </div>
          )}
        </>
      )}
    </div>

    {/* Panier Offcanvas */}
    <div className={`fixed inset-0 z-50 ${showCart ? 'block' : 'hidden'}`}>
      <div 
        className="absolute inset-0 backdrop-blur-sm bg-opacity-50"
        onClick={() => setShowCart(false)}
      ></div>
      
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl flex flex-col">
        {/* Header du panier */}
        <div className="flex justify-between items-center p-4 border-b border-secondary">
          <h2 className="text-xl font-bold text-secondary">Votre Panier</h2>
          <button 
            className="btn btn-ghost btn-sm"
            onClick={() => setShowCart(false)}
          >
            <FiX className="text-lg" />
          </button>
        </div>
        
        {/* Liste des articles */}
        <div className="flex-1 overflow-y-auto p-4">
          {cart.length === 0 ? (
            <div className="text-center py-12">
              <FiShoppingCart className="mx-auto text-4xl text-gray-300 mb-4" />
              <p className="text-gray-500">Votre panier est vide</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map(item => (
                <div key={item.id} className="flex gap-4 pb-4 border-b border-secondary">
                  <div className="w-20 h-20 bg-gray-100 rounded overflow-hidden">
                    {item.image && (
                      <img 
                        src={`http://localhost:8000/storage/${item.image}`} 
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h3 className="font-medium">{item.name}</h3>
                      <button 
                        className="btn bg-red-500 hover:bg-base-300 btn-xs"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <FiTrash2 className="text-white hover:text-red-500" />
                      </button>
                    </div>
                    
                    <p className="text-primary font-bold mt-1">
                      {item.price_per_unit.toLocaleString()} FCFA / {item.unit}
                    </p>
                    
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border rounded-md border-secondary">
                        <button 
                          className="px-2 py-1 text-lg"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          -
                        </button>
                        <span className="px-3 py-1 border-x border-secondary">{item.quantity} {item.unit}</span>
                        <button 
                          className="px-2 py-1 text-lg"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          +
                        </button>
                      </div>
                      
                      <p className="font-bold">
                        {(item.price_per_unit * item.quantity).toLocaleString()} FCFA
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Footer du panier */}
        {cart.length > 0 && (
          <div className="p-4 border-t border-secondary">
            <div className="flex justify-between mb-4">
              <span className="font-bold">Total:</span>
              <span className="font-bold text-primary text-xl">
                {cartTotal.toLocaleString()} FCFA
              </span>
            </div>
            
            <button 
              className="btn btn-primary w-full"
              onClick={() => {
                setShowCart(false);
                setShowOrderModal(true);
              }}
            >
              Passer la commande <FiArrowRight className="ml-2" />
            </button>
          </div>
        )}
      </div>
    </div>

    {/* Modal de commande */}
    <div className={`modal ${showOrderModal ? 'modal-open' : ''}`}>
    <div className="modal-box max-w-3xl relative inset-0 backdrop-blur-sm z-50">
      {orderStatus === 'success' ? (
        <div className="text-center p-6">
          <FiCheckCircle className="text-5xl text-green-500 mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-2">Commande confirmée!</h3>
          <p className="text-gray-600 mb-6">
            Votre commande a été passée avec succès. Vous recevrez une confirmation par email.
          </p>
          <button 
            className="btn btn-primary"
            onClick={() => {
              setShowOrderModal(false);
              setOrderStatus(null);
              setCart([]); // Vider le panier après succès
            }}
          >
            Retour aux produits
          </button>
        </div>
      ) : orderStatus === 'error' ? (
        <div className="text-center p-6">
          <FiAlertCircle className="text-5xl text-red-500 mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-2">Erreur lors de la commande</h3>
          <p className="text-gray-600 mb-6">
            Une erreur est survenue lors du traitement de votre commande. Veuillez réessayer.
          </p>
          <div className="flex gap-3 justify-center">
            <button 
              className="btn btn-primary"
              onClick={() => setOrderStatus(null)}
            >
              Réessayer
            </button>
            <button 
              className="btn btn-ghost"
              onClick={() => {
                setShowOrderModal(false);
                setOrderStatus(null);
              }}
            >
              Annuler
            </button>
          </div>
        </div>
      ) : (
        <>
          <button 
            className="btn btn-sm btn-circle absolute right-2 top-2"
            onClick={() => setShowOrderModal(false)}
          >
            ✕
          </button>
          
          <h3 className="text-xl font-bold mb-6 text-secondary">Finaliser votre commande</h3>
          
          <OrderForm 
            cart={cart} 
            cartTotal={cartTotal}
            currentUserId={user?.id} // À adapter selon votre système d'authentification
            onSuccess={() => setOrderStatus('success')}
            onError={() => setOrderStatus('error')}
            onCancel={() => setShowOrderModal(false)}
          />
        </>
      )}
    </div>
    </div>
    </>
  );
};

export default MarketPlace;