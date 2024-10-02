'use client'
import { useState } from "react";



function Formpublication({ onClose }) {
  const [formData, setFormData] = useState({
    nom_produits: '',
    quantite: '',
    prix: '',
    image: null,
    categorie: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageUpload = (e) => {
    setFormData((prevData) => ({ ...prevData, image: e.target.files[0].name }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Envoyer les données du formulaire à l'API
    const response = await fetch('/api/produits', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const data = await response.json();
      console.log('Produit ajouté avec succès :', data);
      onClose(); // Fermer le formulaire après soumission
    } else {
      console.error('Erreur lors de l’ajout du produit');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-xl mb-4">Publier un produit</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium">Nom du produit</label>
            <input
              type="text"
              name="nom_produits"
              value={formData.nom_produits}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Quantité</label>
            <input
              type="number"
              name="quantite"
              value={formData.quantite}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Prix</label>
            <input
              type="number"
              name="prix"
              value={formData.prix}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Image du produit</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Catégorie</label>
            <input
              type="text"
              name="categorie"
              value={formData.categorie}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              className="bg-red-500 text-white py-2 px-4 rounded"
              onClick={onClose}
            >
              Annuler
            </button>
            <button
              type="submit"
              className="bg-green-500 text-white py-2 px-4 rounded"
            >
              Publier
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Formpublication;
