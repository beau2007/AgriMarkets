'use client'
import { useState } from 'react';
import HeaderApp from '../header/HeaderApp'

export default function Products() {
  const [cart, setCart] = useState([]);

  const products = [
    { id: 1, name: 'Tomates', price: 2.5, imageUrl: 'asset/images/tomatoes.jpg' },
    { id: 2, name: 'Pommes de terre', price: 1.8, imageUrl: '/asset/images/potatoes.jpg' },
    { id: 3, name: 'Carottes', price: 2.0, imageUrl: '/asset/images/carotte.jpeg' },
    { id: 4, name: 'Oignons', price: 1.5, imageUrl: '/asset/images/oignon.jpeg' },
    { id: 5, name: 'Cacao', price: 5.9, imageUrl: '/asset/images/cacao-6554305_1280.jpg'},
    { id: 6, name: 'Strawberries', price: 5.9, imageUrl: '/asset/images/strawberries-8177601_1280.jpg'},
    { id: 7, name: 'Watermelon', price: 2, imageUrl: '/asset/images/watermelon.jpg'},
    { id: 8, name: 'Mil', price: 3.0, imageUrl: '/asset/images/mile.jpg'},
    { id: 9, name: 'Corn', price: 2.1, imageUrl: '/asset/images/corn.jpg'}
  ];

  const addToCart = (product) => {
    setCart([...cart, product]);
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
            <button
              className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
    </>
  );
}
