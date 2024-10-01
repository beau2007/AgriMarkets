"use client";

import React from 'react';
import { useSession } from 'next-auth/react';
import LandingPage from '../components/ComposantLanding/LandingPage';
import ComposantApp from '../components/ComposantApp/ComposantApp';

function App() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>; // Ou un composant de chargement plus élaboré
  }

  return (
    <div>
      {!session ? <LandingPage /> : <ComposantApp />}
    </div>
  );
}

export default App;