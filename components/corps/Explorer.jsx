'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import HeaderApp from '../header/HeaderApp';
import { Card, CardContent } from "../../ui/card";
import { Button } from "../../ui/button";
import { Check } from 'lucide-react';
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';

export default function ExplorerMarche() {
  const [produits, setProduits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isPaid, setIsPaid] = useState({});
  
  useEffect(() => {
    async function fetchProduits() {
      try {
        const res = await fetch('/api/produit/produits');
        const data = await res.json();
        setProduits(data);
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors de la récupération des produits:', error);
      }
    }

    fetchProduits();
  }, []);

  if (loading) {
    return <p>Chargement des produits...</p>;
  }

  // Fonction pour gérer le paiement avec le prix dynamique du produit
  const handlePayment = (produit) => {
    const config = {
      public_key: "FLWPUBK_TEST-3cd14315fedbff83d51f02f62bb436f6-X",
      tx_ref: Date.now().toString(),
      amount: produit.prix, // Utilisation du prix du produit pour le paiement
      currency: "XAF",
      payment_options: "mobilemoney",
      customer: {
        email: "user@example.com",
        phone_number: "070********",
        name: "John Doe",
      },
    };

    const handleFlutterPayment = useFlutterwave(config);

    handleFlutterPayment({
      callback: (response) => {
        console.log(response);
        if (response.status === "successful") {
          setIsPaid((prev) => ({ ...prev, [produit.id]: true })); // Marquer le produit comme payé
        }
        closePaymentModal();
      },
      onClose: () => {},
    });
  };

  return (
    <>
      <HeaderApp />
      <h1 className="text-2xl font-bold text-green-500 text-center mb-8 top-4">
        Trouvez des fruits de qualités
      </h1>
      <div className="grid md:grid-cols-4 gap-4 p-6 ">
        {produits.map((produit) => (
          <div key={produit.id} className="border p-6 rounded-lg shadow-lg">
            <Card className="w-full max-w-md rounded-lg overflow-hidden shadow-lg transition-all hover:shadow-2xl">
              <Image
                src={produit.imageUrl}
                alt={produit.nom_produits}
                width={100}
                height={100}
                className="w-full h-44 object-cover"
                style={{ aspectRatio: "300/200", objectFit: "cover" }}
              />
              <CardContent className="p-6 space-y-4">
                <div>
                  <h2 className="text-lg font-bold mt-2">
                    {produit.nom_produits}
                  </h2>
                  <p className="text-muted-foreground">
                    Ce produit vaut{" "}
                    <span className="font-bold text-green-500">
                      Prix : {produit.prix} FCFA
                    </span>
                    , une excellente valeur.
                  </p>
                  <p className="font-bold text-gray-800">
                    Quantité : {produit.quantite}
                  </p>
                </div>
                <div className="flex items-center">
                  <Button
                    variant={isPaid[produit.id] ? "outline" : "default"}
                    className={`justify-start ${
                      isPaid[produit.id]
                        ? "bg-green-500 text-gray-200 cursor-not-allowed"
                        : ""
                    }`}
                    onClick={() => handlePayment(produit)}
                    disabled={isPaid[produit.id]}
                  >
                    {isPaid[produit.id] ? "Paid" : "Pay Now"}
                  </Button>
                  {isPaid[produit.id] && (
                    <Check className="ml-2 text-green-500" size={24} />
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </>
  );
}







//  import React, { useState } from 'react';
//  import { Card, CardContent } from "../../ui/card";
//  import { Button } from "../../ui/button";
//  import { Check } from 'lucide-react';
//  import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';
// import Image from 'next/image';

// export function PaymentCard() {
//   const [isPaid, setIsPaid] = useState(false);

//   const config = {
//     public_key: "FLWPUBK_TEST-3cd14315fedbff83d51f02f62bb436f6-X",
//     tx_ref: Date.now().toString(),
//     amount: 3500,
//     currency: "XAF",
//     payment_options: "mobilemoney",
//     customer: {
//       email: "user@example.com",
//       phone_number: "070********",
//       name: "John Doe",
//     },
//   };

//   const handleFlutterPayment = useFlutterwave(config);

//   const handlePayment = () => {
//     handleFlutterPayment({
//       callback: (response) => {
//         console.log(response);
//         if (response.status === "successful") {
//           setIsPaid(true);
//         }
//         closePaymentModal();
//       },
//       onClose: () => {},
//     });
//   };

//   return (
//     <>
//       <h1 className="text-5xl font-bold text-green-600 text-center mb-8 capitalize">
//         Produits disponibles
//       </h1>
//       <div className="flex gap-8">
//         <Card className="w-full max-w-md rounded-lg overflow-hidden shadow-lg transition-all hover:shadow-2xl">
//           <Image
//             src="/asset/images/carotte.jpeg"
//             alt="Article cover"
//             width="400"
//             height="200"
//             className="w-full h-48 object-cover"
//             style={{ aspectRatio: "300/200", objectFit: "cover" }}
//           />
//           <CardContent className="p-6 space-y-4">
//             <div>
//               <h3 className="text-xl font-semibold">Corottes</h3>
//               <p className="text-muted-foreground">
//                 This article is worth 3500XAF, a great value.
//               </p>
//             </div>
//             <div className="flex items-center">
//               <Button
//                 variant={isPaid ? "outline" : "default"}
//                 className={`justify-start ${
//                   isPaid ? "bg-green-500 text-gray-200 cursor-not-allowed" : ""
//                 }`}
//                 onClick={handlePayment}
//                 disabled={isPaid}
//               >
//                 {isPaid ? "Paid" : "Pay Now"}
//               </Button>
//               {isPaid && <Check className="ml-2 text-green-500" size={24} />}
//             </div>
//           </CardContent>
//         </Card>
//      </div>
//     </>
//    );
//  }

// export default PaymentCard;
