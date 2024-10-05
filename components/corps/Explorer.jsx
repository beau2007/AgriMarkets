'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function ExplorerMarche() {
  const [produits, setProduits] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6">
      {produits.map((produit) => (
        <div key={produit.id} className="border p-6 rounded-lg shadow-lg">
          <Image src={produit.imageUrl} alt={produit.nom_produits} width={100} height={100}className="w-full h-44 object-cover" />
          <h2 className="text-lg font-bold mt-2">{produit.nom_produits}</h2>
          <p className="font-bold text-green-500">Prix : {produit.prix} FCFA</p>
          <p>Quantité : {produit.quantite}</p>
          <button className="bg-green-500 text-white px-4 py-2 mt-2 rounded hover:bg-green-700">
            Payer
          </button>
        </div>
      ))}
    </div>
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

//           <Card className="w-full max-w-md rounded-lg overflow-hidden shadow-lg transition-all hover:shadow-2xl">
//             <Image
//               src="/asset/images/banana.jpg"
//               alt="Article cover"
//               width="400"
//               height="200"
//               className="w-full h-48 object-cover"
//               style={{ aspectRatio: "300/200", objectFit: "cover" }}
//             />
//             <CardContent className="p-6 space-y-4">
//               <div>
//                 <h3 className="text-xl font-semibold">banane</h3>
//                 <p className="text-muted-foreground">This article is worth 3500XAF, a great value.</p>
//               </div>
//               <div className="flex items-center">
//                 <Button
//                   variant={isPaid ? "outline" : "default"}
//                   className={`justify-start ${isPaid ? 'bg-green-500 text-gray-200 cursor-not-allowed' : ''}`}
//                   onClick={handlePayment}
//                   disabled={isPaid}
//                 >
//                   {isPaid ? 'Paid' : 'Pay Now'}
//                 </Button>
//                 {isPaid && (
//                   <Check className="ml-2 text-green-500" size={24} />
//                 )}
//               </div>
//             </CardContent>
//           </Card>
//      </div>
//     </>
//    );
//  }

// export default PaymentCard;
