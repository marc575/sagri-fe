import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaEye, FaEdit } from "react-icons/fa";
import { FiX, FiUser, FiTruck, FiShoppingBag, FiAlertCircle, FiPackage } from 'react-icons/fi';
import { useOrder } from "../../context/OrderContext";
import { useAuth } from "../../context/AuthContext";
import Loading from "../ui/Loading";

export default function Order() {
    const { orders, updateOrder, OrdersLoading } = useOrder();
    const { user } = useAuth();

    const [userOrders, setUserOrders] = useState(localStorage.getItem('orders') || '');
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showModalUpdate, setShowModalUpdate] = useState(false);
    
    const [form, setForm] = useState({
      delivery_type: "",
      delivery_address: "",
      status: "",
      notes: "",
    });

    const getStatusLabel = (statut) => {
      const status = {
        pending: 'Attente de validation',
        confirmed: 'Confirmée',
        cancelled: 'Annulée',
        delivered: 'Livrée',
      };
      return <span className={`badge ${statusColors[statut]}`}>{status[statut] || statut}</span>;
    };

    const getDeliveryType = (delivery) => {
      const deliveryType = {
        pickup: 'Livreur indépendant',
        buyer_delivery: 'Livraison par le client',
        farmer_delivery: 'Livraison par le fournisseur',
      };
      return deliveryType[delivery] || delivery;
    };

    const statusColors = {
      pending: 'bg-blue-100 text-blue-800',
      confirmed: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800',
      delivered: 'bg-gray-100 text-gray-800'
    };

    useEffect(() => {
      const ordersArray = Array.isArray(orders) ? orders : [];
      setUserOrders(ordersArray.filter(order => 
        order.buyer?.id === user?.id || order.farmer?.id === user?.id
      ));
    }, [orders])
    
    const openModal = (order) => {
      setSelectedOrder(order);
      setShowModal(true);
    };
    
    const closeModal = () => {
      setSelectedOrder(null);
      setShowModal(false);
    };
    
    const openModalOrder = (order) => {
      setSelectedOrder(order);
      setForm({
        delivery_type: order.delivery_type || "",
        delivery_address: order.delivery_address || "",
        status: order.status || "",
      });
      setShowModalUpdate(true);
    };
    
    const closeModalUpdate = () => {
      setSelectedOrder(null);
      setShowModalUpdate(false);
    };
    
    const handleChange = (e) => {
      const { name, value } = e.target;
      setForm({ ...form, [name]: value });
    };
    
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        if (selectedOrder) {
          await updateOrder(form, selectedOrder.id);
        }
        closeModalUpdate();
      } catch (error) {
        console.error('Error saving activity:', error);
      }
    };
    
    if (OrdersLoading) {
      return <Loading />;
    }
    

  return (
    <div className="container mx-auto py-12 px-2">
      <h2 className="text-xl font-bold mb-4 text-secondary">Commandes</h2>
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        {Array.isArray(userOrders) && userOrders.map((order) => (
          <div
            key={order.id}
            className={`shadow rounded-xl p-6 flex justify-between items-center transition ${
              order.buyer.id === user?.id ? 'bg-[#FDFAD0]' : null
            } ${
              order.farmer.id === user?.id ? 'bg-white' : null
            }
          `}
          >
            <div>
              <h3 className="text-sm font-semibold text-secondary mb-3">Commande #{order.id} - {new Date(order.created_at).toLocaleDateString('fr-FR', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                    })}</h3>
                {order?.buyer?.id === user?.id ? (
                <p className="text-sm text-secondary">
                  Fournisseur: {order?.farmer?.name} • {order?.total_amount} FCFA • {getStatusLabel(order?.status)}
                </p>
                ) : null}

                {order?.farmer?.id === user?.id ? (
                <p className="text-sm text-secondary">
                  Acheteur: {order?.buyer?.name} • {order?.total_amount} FCFA • {getStatusLabel(order?.status)}
                </p>
                ) : null}
            </div>
            <div className="flex gap-4">
              <button
                className=""
                onClick={() => openModal(order)}
              >
                <FaEye className="text-blue-600" />
              </button>
              <button className=""
                  onClick={() => openModalOrder(order)}>
                <FaEdit className="text-yellow-600" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {showModal && selectedOrder && (
            <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            >
            <motion.div
                initial={{ scale: 0.95, y: 20, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ type: "spring", damping: 20, stiffness: 300 }}
                className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col"
            >
                {/* Header */}
                <div className="bg-primary px-6 py-4 text-white">
                <div className="flex justify-between items-center">
                    <h3 className="text-xl font-bold">
                      Commande #{selectedOrder.id} {getStatusLabel(selectedOrder.status)}
                    </h3>
                    <button 
                    onClick={closeModal}
                    className="btn btn-circle btn-ghost btn-sm text-white hover:bg-white/20"
                    >
                    <FiX className="text-lg" />
                    </button>
                </div>
                <p className="text-sm opacity-80 mt-1">
                    {new Date(selectedOrder.created_at).toLocaleDateString('fr-FR', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                    })}
                </p>
                </div>

                {/* Body with scrollable content */}
                <div className="overflow-y-auto p-6 flex-1">
                {/* Order Summary */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                        <FiUser className="text-primary" />
                        Informations acheteur
                    </h4>
                    <div className="space-y-2 text-sm">
                        <p><span className="font-medium">Nom:</span> {selectedOrder.buyer.name}</p>
                        <p><span className="font-medium">Email:</span> {selectedOrder.buyer.email}</p>
                        <p><span className="font-medium">Téléphone:</span> {selectedOrder.buyer.phone || 'Non renseigné'}</p>
                    </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                        <FiTruck className="text-primary" />
                        Livraison
                    </h4>
                    <div className="space-y-2 text-sm">
                        <p>
                        <span className="font-medium">Type: </span> 
                        <span className="capitalize"> {getDeliveryType(selectedOrder.delivery_type)}</span>
                        </p>
                        {selectedOrder.delivery_address && (
                        <p>
                            <span className="font-medium">Adresse: </span> 
                            {selectedOrder.delivery_address}
                        </p>
                        )}
                        <p>
                        <span className="font-medium">Montant total: </span> 
                        <span className="font-bold text-primary ml-1">
                            {selectedOrder.total_amount.toLocaleString('fr-FR')} FCFA
                        </span>
                        </p>
                    </div>
                    </div>
                </div>

                {/* Order Items */}
                <div className="mb-6">
                    <h4 className="font-semibold text-lg mb-4 flex items-center gap-2">
                    <FiShoppingBag className="text-primary" />
                    Articles ({selectedOrder.items.length})
                    </h4>
                    
                    <div className="overflow-x-auto">
                    <table className="table w-full border-collapse">
                        <thead>
                        <tr className="bg-gray-100 text-left">
                            <th className="p-3 font-medium">Produit</th>
                            <th className="p-3 font-medium text-right">Prix unitaire</th>
                            <th className="p-3 font-medium text-right">Quantité</th>
                            <th className="p-3 font-medium text-right">Total</th>
                        </tr>
                        </thead>
                        <tbody>
                        {selectedOrder.items.map((item) => (
                            <tr key={item.id} className="border-b border-primary hover:bg-gray-50">
                            <td className="p-3">
                                <div className="flex items-center gap-3">
                                {item.product.image ? (
                                    <div className="avatar">
                                    <div className="w-12 h-12 rounded-md">
                                        <img 
                                        src={`http://localhost:8000/storage/${item.product.image}`} 
                                        alt={item.product.name} 
                                        className="object-cover"
                                        />
                                    </div>
                                    </div>
                                ) : (
                                    <div className="w-12 h-12 rounded-md bg-gray-200 flex items-center justify-center">
                                    <FiPackage className="text-gray-400" />
                                    </div>
                                )}
                                <div>
                                    <p className="font-medium">{item.product.name}</p>
                                    <p className="text-sm text-gray-500 line-clamp-1">
                                    {item.product.description}
                                    </p>
                                </div>
                                </div>
                            </td>
                            <td className="p-3 text-right">
                                {item.unit_price.toLocaleString('fr-FR')} FCFA
                            </td>
                            <td className="p-3 text-right">
                                {item.quantity} {item.product.unit}
                            </td>
                            <td className="p-3 text-right font-medium text-primary">
                                {item.total_price.toLocaleString('fr-FR')} FCFA
                            </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    </div>
                </div>

                {/* Notes */}
                {selectedOrder.notes && (
                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
                    <h4 className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
                        <FiAlertCircle className="text-yellow-600" />
                        Notes spéciales
                    </h4>
                    <p className="text-sm text-gray-600">{selectedOrder.notes}</p>
                    </div>
                )}
                </div>

                {/* Footer */}
                <div className="border-t border-secondary  px-6 py-4 bg-gray-50 flex justify-between items-center">
                <button 
                    onClick={closeModal}
                    className="btn btn-ghost"
                >
                    Fermer
                </button>
                <div className="flex gap-2">
                    {selectedOrder.status === 'pending' && (
                    <>
                        <button className="btn btn-error text-white">
                        Annuler la commande
                        </button>
                        <button className="btn btn-success text-white">
                        Confirmer la commande
                        </button>
                    </>
                    )}
                    {selectedOrder.status === 'confirmed' && (
                    <button className="btn btn-primary">
                        Marquer comme livrée
                    </button>
                    )}
                </div>
                </div>
            </motion.div>
            </motion.div>
        )}
        </AnimatePresence>

        {showModalUpdate && (
        <div className="fixed inset-0 z-50 backdrop-blur-sm flex items-center justify-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 relative"
          >
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
              onClick={() => closeModalUpdate()}
            >
              <FiX />
            </button>
            <h2 className="text-xl font-semibold mb-4">Modifier la commande #{selectedOrder.id} - {new Date(selectedOrder.created_at).toLocaleDateString('fr-FR', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                    })}</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="label">Type de livraison</label>
                <select
                  name="delivery_type"
                  value={form.delivery_type}
                  onChange={handleChange}
                  className="select select-bordered w-full"
                  disabled
                >
                  <option value="pickup">Livreur Indépendant</option>
                  <option value="buyer_delivery">Livraison par acheteur</option>
                  <option value="farmer_delivery">Livraison par fermier</option>
                </select>
              </div>

              <div>
                <label className="label">Adresse de livraison</label>
                <input
                  type="text"
                  name="delivery_address"
                  value={form.delivery_address}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  placeholder="Entrez l'adresse"
                  disabled={ user?.id === selectedOrder?.buyer.id ? false : true }
                />
              </div>

              <div>
                <label className="label">Statut</label>
                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  className="select select-bordered w-full"
                  disabled={ user?.id === selectedOrder?.farmer.id ? false : true }
                >
                  <option value="pending">En attente</option>
                  <option value="confirmed">Confirmée</option>
                  <option value="cancelled">Annulée</option>
                  <option value="delivered">Livrée</option>
                </select>
              </div>

              <div className="flex justify-between">
                <button
                className="btn text-gray-500 hover:text-gray-800"
                onClick={() => closeModalUpdate()}
                >
                    Retour
                </button>
                <button type="submit" className="btn btn-primary">Mettre à jour</button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
