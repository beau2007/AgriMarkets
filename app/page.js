import React from 'react';
import LandingPage from '../components/ComposantLanding/LandingPage';
import ComposantApp from '../components/ComposantApp/ComposantApp';


function App() {
  const isAuthenticated = false; // À modifier selon la logique d'authentification

  return (
    <div>
      {!isAuthenticated ? <LandingPage /> : <ComposantApp />}
    </div>
  );
}

export default App;
