'use client';

 import React, { useState } from 'react';
 import { Card, CardContent } from "../../ui/card";
 import { Button } from "../../ui/button";
 import { Check } from 'lucide-react';
 import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';
import Image from 'next/image';

 export function PaymentCard() {
   const [isPaid, setIsPaid] = useState(false);

   const config = {
     public_key: 'FLWPUBK_TEST-3cd14315fedbff83d51f02f62bb436f6-X',
     tx_ref: Date.now().toString(),
     amount: 3500,
     currency: 'XAF',
     payment_options: 'mobilemoney',
     customer: {
       email: 'user@example.com',
       phone_number: '070********',
       name: 'John Doe',
     },
   };

   const handleFlutterPayment = useFlutterwave(config);

   const handlePayment = () => {
     handleFlutterPayment({
       callback: (response) => {
         console.log(response);
         if (response.status === "successful") {
           setIsPaid(true);
         }
         closePaymentModal();
       },
       onClose: () => {},
     });
  };

   return (

    <>
    
    <h1 className="text-5xl font-bold text-green-600 text-center mb-8 capitalize">Produits disponibles</h1>
     <div className='flex gap-8'>
          
          <Card className="w-full max-w-md rounded-lg overflow-hidden shadow-lg transition-all hover:shadow-2xl">
            <Image
              src="/asset/images/carotte.jpeg"
              alt="Article cover"
              width="400"
              height="200"
              className="w-full h-48 object-cover"
              style={{ aspectRatio: "300/200", objectFit: "cover" }}
            />
            <CardContent className="p-6 space-y-4">
              <div>
                <h3 className="text-xl font-semibold">Corottes</h3>
                <p className="text-muted-foreground">This article is worth 3500XAF, a great value.</p>
              </div>
              <div className="flex items-center">
                <Button
                  variant={isPaid ? "outline" : "default"}
                  className={`justify-start ${isPaid ? 'bg-green-500 text-gray-200 cursor-not-allowed' : ''}`}
                  onClick={handlePayment}
                  disabled={isPaid}
                >
                  {isPaid ? 'Paid' : 'Pay Now'}
                </Button>
                {isPaid && (
                  <Check className="ml-2 text-green-500" size={24} />
                )}
              </div>
            </CardContent>
          </Card>


          <Card className="w-full max-w-md rounded-lg overflow-hidden shadow-lg transition-all hover:shadow-2xl">
            <Image
              src="/asset/images/banana.jpg"
              alt="Article cover"
              width="400"
              height="200"
              className="w-full h-48 object-cover"
              style={{ aspectRatio: "300/200", objectFit: "cover" }}
            />
            <CardContent className="p-6 space-y-4">
              <div>
                <h3 className="text-xl font-semibold">banane</h3>
                <p className="text-muted-foreground">This article is worth 3500XAF, a great value.</p>
              </div>
              <div className="flex items-center">
                <Button
                  variant={isPaid ? "outline" : "default"}
                  className={`justify-start ${isPaid ? 'bg-green-500 text-gray-200 cursor-not-allowed' : ''}`}
                  onClick={handlePayment}
                  disabled={isPaid}
                >
                  {isPaid ? 'Paid' : 'Pay Now'}
                </Button>
                {isPaid && (
                  <Check className="ml-2 text-green-500" size={24} />
                )}
              </div>
            </CardContent>
          </Card>
     </div> 
    </>    
   );
 }

 export default PaymentCard;