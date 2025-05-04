import { useState } from 'react';
import { FiTruck, FiMapPin, FiHome, FiInfo } from 'react-icons/fi';
import { useOrder } from '../../context/OrderContext';

const OrderForm = ({ cart, cartTotal, currentUserId, onSuccess, onError, onCancel }) => {
    const { postOrder } = useOrder();
  const [formData, setFormData] = useState({
    farmer_id: cart[0]?.user_id || '', // Supposant que tous les produits viennent du même fermier
    delivery_type: 'pickup',
    delivery_address: '',
    notes: '',
    status: 'pending'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Préparer les données pour l'API
      const orderData = {
        buyer_id: currentUserId,
        farmer_id: formData.farmer_id,
        total_amount: cartTotal,
        delivery_type: formData.delivery_type,
        delivery_address: formData.delivery_address,
        status: formData.status,
        notes: formData.notes,
        items: cart.map(item => ({
          product_id: item.id,
          quantity: item.quantity,
          unit_price: item.price_per_unit,
          total_price: item.price_per_unit * item.quantity
        }))
      };

      await postOrder(orderData);

      if (!response.ok) throw new Error('Erreur API');

      onSuccess();
    } catch (error) {
      console.error('Erreur commande:', error);
      onError();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Section Livraison */}
        <div className="md:col-span-2">
          <h4 className="font-bold mb-3 flex items-center gap-2">
            <FiTruck /> Options de livraison
          </h4>
          
          <div className="space-y-3 mb-4">
            <label className="flex items-start gap-3 p-3 border rounded-lg cursor-pointer hover:border-primary">
              <input 
                type="radio" 
                name="delivery_type" 
                className="radio radio-primary mt-1" 
                value="pickup"
                checked={formData.delivery_type === 'pickup'}
                onChange={handleChange}
              />
              <div>
                <span className="font-medium">Retrait chez le producteur</span>
                <p className="text-sm text-gray-500 mt-1">
                  Vous viendrez récupérer votre commande directement à la ferme
                </p>
              </div>
            </label>
            
            <label className="flex items-start gap-3 p-3 border rounded-lg cursor-pointer hover:border-primary">
              <input 
                type="radio" 
                name="delivery_type" 
                className="radio radio-primary mt-1" 
                value="buyer_delivery"
                checked={formData.delivery_type === 'buyer_delivery'}
                onChange={handleChange}
              />
              <div>
                <span className="font-medium">Livraison à mon adresse</span>
                <p className="text-sm text-gray-500 mt-1">
                  Frais de livraison à déterminer avec le producteur
                </p>
              </div>
            </label>
            
            <label className="flex items-start gap-3 p-3 border rounded-lg cursor-pointer hover:border-primary">
              <input 
                type="radio" 
                name="delivery_type" 
                className="radio radio-primary mt-1" 
                value="farmer_delivery"
                checked={formData.delivery_type === 'farmer_delivery'}
                onChange={handleChange}
              />
              <div>
                <span className="font-medium">Point relais</span>
                <p className="text-sm text-gray-500 mt-1">
                  Le producteur livrera à un point relais près de chez vous
                </p>
              </div>
            </label>
          </div>
          
          {formData.delivery_type !== 'pickup' && (
            <div className="mb-4">
              <label className="label">
                <span className="label-text flex items-center gap-2">
                  <FiMapPin /> Adresse de livraison
                </span>
              </label>
              <textarea
                name="delivery_address"
                className="textarea textarea-bordered w-full"
                rows="3"
                placeholder="Entrez votre adresse complète"
                value={formData.delivery_address}
                onChange={handleChange}
                required={formData.delivery_type !== 'pickup'}
              ></textarea>
            </div>
          )}
        </div>
        
        {/* Section Notes */}
        <div className="md:col-span-2">
          <label className="label">
            <span className="label-text flex items-center gap-2">
              <FiInfo /> Notes supplémentaires
            </span>
          </label>
          <textarea
            name="notes"
            className="textarea textarea-bordered w-full"
            rows="3"
            placeholder="Instructions spéciales, préférences de livraison, etc."
            value={formData.notes}
            onChange={handleChange}
          ></textarea>
        </div>
        
        {/* Récapitulatif */}
        <div className="md:col-span-2 bg-gray-50 p-4 rounded-lg">
          <h4 className="font-bold mb-3">Récapitulatif de la commande</h4>
          
          <div className="space-y-3 mb-4">
            {cart.map(item => (
              <div key={item.id} className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gray-100 rounded overflow-hidden">
                    {item.image && (
                      <img 
                        src={`http://localhost:8000/storage/${item.image}`} 
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-500">
                      {item.quantity} × {item.price_per_unit.toLocaleString()} FCFA
                    </p>
                  </div>
                </div>
                <p className="font-bold">
                  {(item.quantity * item.price_per_unit).toLocaleString()} FCFA
                </p>
              </div>
            ))}
          </div>
          
          <div className="border-t pt-3">
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>{cartTotal.toLocaleString()} FCFA</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="modal-action">
        <button 
          type="button" 
          className="btn btn-ghost"
          onClick={onCancel}
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
          ) : (
            'Confirmer la commande'
          )}
        </button>
      </div>
    </form>
  );
};

export default OrderForm;