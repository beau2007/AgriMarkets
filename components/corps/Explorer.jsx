'use client'
import { useState } from 'react';
import HeaderApp from '../header/HeaderApp';

export default function Products() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [contactSupplier, setContactSupplier] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [formError, setFormError] = useState('');

  const countries = [
    'Cameroun', 'Congo', 'Gabon', 'Guinée Équatoriale', 'Tchad', 'République Centrafricaine', 
    'Angola', 'Burundi', 'Rwanda', 'Kenya', 'Tanzanie', 'Ouganda', 'Zambie', 'Soudan du Sud',
    'Ghana', 'Nigéria', 'Sénégal', 'Côte d’Ivoire', 'Mali', 'Niger', 'Bénin', 'Togo', 'Burkina Faso', 'Mauritanie'
  ];

  const products = [
    { id: 1, name: 'Tomates', price: 2.5, imageUrl: 'asset/images/tomatoes.jpg' },
    { id: 2, name: 'Pommes de terre', price: 1.8, imageUrl: '/asset/images/potatoes.jpg' },
    { id: 3, name: 'Carottes', price: 2.0, imageUrl: '/asset/images/carotte.jpeg' },
    { id: 4, name: 'Oignons', price: 1.5, imageUrl: '/asset/images/oignon.jpeg' },
    { id: 5, name: 'Cacao', price: 5.9, imageUrl: '/asset/images/cacao-6554305_1280.jpg' },
    { id: 6, name: 'Strawberries', price: 5.9, imageUrl: '/asset/images/strawberries-8177601_1280.jpg' },
    { id: 7, name: 'Watermelon', price: 2, imageUrl: '/asset/images/watermelon.jpg' },
    { id: 8, name: 'Mil', price: 3.0, imageUrl: '/asset/images/mile.jpg' },
    { id: 9, name: 'Corn', price: 2.1, imageUrl: '/asset/images/corn.jpg' }
  ];

  const handlePay = (product) => {
    setSelectedProduct(product);
  };

  const handleContact = (supplier) => {
    setContactSupplier(supplier);
  };

  const handleCancel = () => {
    setSelectedProduct(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const name = e.target.name.value;
    const phone = e.target.phone.value;
    const country = e.target.country.value;
    const region = e.target.region.value;
    const city = e.target.city.value;
    const address = e.target.address.value;
    const paymentMethod = e.target.paymentMethod.value;

    if (!name || !phone || !country || !region || !city || !address || !paymentMethod) {
      setFormError('Tous les champs sont obligatoires');
    } else {
      // Logique de soumission du formulaire
      setFormError('');
      alert('Paiement validé avec succès!');
      handleCancel();
    }
  };

  return (
    <>

      <HeaderApp/>

      <div className="bg-gray-100 min-h-screen pt-28">
        <h1 className="text-3xl font-bold text-center mb-6 text-green-500">Produits agricoles à vendre</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-lg p-4 text-center"
            >
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-40 object-cover rounded-md mb-4"
              />
              <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
              <p className="text-gray-600 mb-4">{product.price.toFixed(2)} €</p>
              <div className="flex justify-around">
                <button
                  className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
                  onClick={() => handlePay(product)}
                >
                  Payer
                </button>
                <button
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                  onClick={() => handleContact(product.supplier)}
                >
                  Contact Fournisseur
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Formulaire de paiement */}
        {selectedProduct && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-30">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
              <h2 className="text-2xl font-bold mb-4">Formulaire de paiement pour {selectedProduct.name}</h2>

              {formError && <p className="text-red-500">{formError}</p>}

              <form onSubmit={handleSubmit}>

                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2" htmlFor="name">Nom du titulaire</label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Entrez le nom du titulaire"
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2" htmlFor="phone">Numéro de téléphone</label>
                  <input
                    id="phone"
                    type="tel"
                    placeholder="Entrez votre numéro de téléphone"
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2" htmlFor="country">Pays</label>
                  <select
                    id="country"
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                  >
                    {countries.map((country, index) => (
                      <option key={index} value={country}>
                        {country}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2" htmlFor="city">Ville</label>
                  <input
                    id="city"
                    type="text"
                    placeholder="Entrez votre ville"
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2" htmlFor="address">Adresse</label>
                  <input
                    id="address"
                    type="text"
                    placeholder="Entrez votre adresse"
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                  />
                </div>

                {/* Section Mode de paiement */}
                <h3 className="text-xl font-bold mb-2">Mode de paiement</h3>

                <div className="flex justify-around mb-4">
                  <button
                    type="button"
                    className={`border p-2 rounded ${paymentMethod === 'OrangeMoney' ? 'border-green-500' : ''}`}
                    onClick={() => setPaymentMethod('OrangeMoney')}
                  >
                    <img
                      src="/asset/images/orange-money.png"
                      alt="Orange Money"
                      className="h-12"
                    />
                  </button>

                  <button
                    type="button"
                    className={`border p-2 rounded ${paymentMethod === 'MTNMoney' ? 'border-green-500' : ''}`}
                    onClick={() => setPaymentMethod('MTNMoney')}
                  >
                    <img
                      src="/asset/images/mtn-money.png"
                      alt="MTN Money"
                      className="h-12"
                    />
                  </button>

                  <button
                    type="button"
                    className={`border p-2 rounded ${paymentMethod === 'PayPal' ? 'border-green-500' : ''}`}
                    onClick={() => setPaymentMethod('PayPal')}
                  >
                    <img
                      src="/asset/images/paypal.png"
                      alt="PayPal"
                      className="h-12"
                    />
                  </button>
                </div>

                <div className="flex justify-between">
                  <button
                    className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                    type="button"
                    onClick={handleCancel}
                  >
                    Annuler
                  </button>
                  <button
                    className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
                    type="submit"
                  >
                    Valider Paiement
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Pop-up Contact Fournisseur */}
        {contactSupplier && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
              <h2 className="text-2xl font-bold mb-4">Contact Fournisseur</h2>
              <p className="text-gray-700 mb-2"><strong>Nom :</strong> {contactSupplier.name}</p>
              <p className="text-gray-700 mb-2"><strong>Téléphone :</strong> {contactSupplier.phone}</p>
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mt-4"
                onClick={() => setContactSupplier(null)}
              >
                Fermer
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
