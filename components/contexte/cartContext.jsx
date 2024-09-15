'use client'
import { createContext, useState, useContext } from 'react';

// Créer un contexte pour le panier
const CartContext = createContext();

// Fournisseur du panier (pour envelopper ton application)
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Fonction pour ajouter un produit au panier
  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Hook pour utiliser le contexte du panier dans les composants
export const useCart = () => useContext(CartContext);
