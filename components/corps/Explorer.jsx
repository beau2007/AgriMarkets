'use client'
import { useEffect, useState } from 'react';

function ExplorerMarche() {
  const [produits, setProduits] = useState([]);

  useEffect(() => {
    const fetchProduits = async () => {
      const res = await fetch('/api/produits');
      if (res.ok) {
        const data = await res.json();
        setProduits(data);
      } else {
        console.error('Erreur lors de la récupération des produits');
      }
    };

    fetchProduits();
  }, []);

  return (
    <div>
      <h1 className="text-5xl font-bold text-green-600 text-center mb-8 capitalize">Produits disponibles</h1>
      <ul>
        {produits.map((produit) => (
          <li key={produit.id}>
            <h2>{produit.nom_poduits}</h2>
            <p>Prix: {produit.prix}</p>
            <p>Quantité: {produit.quantite}</p>
            <img src={produit.image} alt={produit.nom}/>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ExplorerMarche;
