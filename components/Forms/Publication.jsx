import { useState } from 'react';

export default function PublishProductForm({ closeModal }) {
  const [formData, setFormData] = useState({
    nom_produit: '',
    quantite: '',
    prix: '',
    categorie: '',
  });

  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('nom_produit', formData.nom_produit);
    formDataToSend.append('quantite', formData.quantite);
    formDataToSend.append('prix', formData.prix);
    formDataToSend.append('categorie', formData.categorie);
    if (image) {
      formDataToSend.append('image', image);
    }

    const response = await fetch('/api/produit', {
      method: 'POST',
      body: formDataToSend,
    });

    if (response.ok) {
      alert('Produit publié avec succès');
      closeModal(); // Appel pour fermer la modal
    } else {
      alert('Erreur lors de la publication');
    }
  };

  return (
    
    <form onSubmit={handleSubmit} className="space-y-4">

      <h1 className="text-4xl font-bold text-green-700 mb-6 capitalize">publier vos produits</h1>
      {/* Formulaire pour la publication du produit */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Nom du produit
        </label>
        <input
          type="text"
          name="nom_produit"
          placeholder="Nom du produit"
          value={formData.nom_produit}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded-lg"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          quantite
        </label>
        <input
          type="number"
          name="quantite"
          placeholder="quantite"
          value={formData.quantite}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded-lg"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          prix
        </label>
        <input
          type="number"
          name="prix"
          placeholder="prix"
          value={formData.prix}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded-lg"
        />
      </div>

      

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Téléverser une image
        </label>
        <input
          type="file"
          accept="image/*"
          name="image"
          onChange={handleImageChange}
          className="w-full border border-gray-300 p-2 rounded-lg"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          categorie
        </label>
        <input
          type="text"
          name="categorie"
          placeholder="categorie"
          value={formData.categorie}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded-lg"
        />
      </div>

      <div className="flex justify-between items-center">
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded-lg"
        >
          Publier
        </button>
        <button
          type="button"
          className="bg-red-600 text-white px-4 py-2 rounded-lg"
          onClick={closeModal}
        >
          Annuler
        </button>
      </div>
    </form>
  );
}
