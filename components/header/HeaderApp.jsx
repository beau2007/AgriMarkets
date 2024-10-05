'use client';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons';
import PublishProductForm from '../Forms/Publication'; 
import { signOut, getSession } from 'next-auth/react'; 
import { getToken } from 'next-auth/jwt';
// import Userprofil from '../corps/Userprofil'

function HeaderApp() {
  const [showCartMenu, setShowCartMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isOpen, setIsOpen] = useState(false); 
  const [user, setUser] = useState({}); 

  const openModal = () =>{  
    setIsOpen(true);
  };

  const closeModal = () =>{
    setIsOpen(false);
  };

  
  // Fonction pour gérer la déconnexion
  const handleLogout = async () => {
    try {

      // Si tu utilises un token JWT, tu peux supprimer celui-ci
      localStorage.removeItem('token'); 
      sessionStorage.removeItem('token');

    //   Si tu utilises next-auth pour l'authentification
         await signOut({ callbackUrl: '/landingpage' });
    
    // Sinon, redirige avec window.location
      window.location.href = '/landingpage'; 
    } catch (error) {
      console.error('Erreur lors de la déconnexion', error);
    }
  };

  // Fonction pour récupérer le rôle de l'utilisateur connecté
  useEffect(() => {
    const fetchUser = async () => {
      const session = await getSession();
      if (session && session.user) {
        setUser(session.user);
      }
    };

    fetchUser();
  }, []);

  const toggleCartMenu = () => setShowCartMenu(!showCartMenu);
  const toggleUserMenu = () => setShowUserMenu(!showUserMenu);
  const handleCloseForm = () => setShowForm(false); // Ferme le formulaire

  return (
    <>
      <nav className="bg-white dark:bg-green-600 fixed w-full z-10 -top-4 start-0 border-b border-gray-200 dark:border-gray-600">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src="/asset/images/logo.webp" className="h-8" alt="AgriMarket Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">AgriMarket</span>
          </a>

          <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            {/* Icône Panier */}
            <div className="relative">
              <FontAwesomeIcon
                icon={faShoppingCart}
                className="text-xl cursor-pointer"
                onClick={toggleCartMenu}
              />
              {/* Menu déroulant pour le Panier */}
              {showCartMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-gray-400 text-black rounded-lg shadow-lg p-4 flex gap-6">
                  <button className="mt-6 bg-gray-400 text-white -py-4 -px-4 rounded dark:hover:bg-green-500">
                    supprimer
                  </button>
                  <button className="mt-6 bg-gray-400 text-white -py-4 -px-4 rounded dark:hover:bg-green-500">
                    valider
                  </button>
                </div>
              )}
            </div>

            {/* bouton de déconnexion */}
            <div className="flex gap-6 p-4">
              <button
                type="button"
                className="text-white bg-green-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-white-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-white-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                onClick={handleLogout} // Appel de la fonction handleLogout
              >
                Log Out
              </button>

              {/* Bouton "Publier un produit" affiché si l'utilisateur est agriculteur */}
              {user.role === 'agriculteur' && (
                <button
                  type="button"
                  className="text-white bg-green-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-white-300 font-medium rounded-lg text-sm px-4 py-2"
                  onClick={() => openModal(true)}
                >
                  Publier un produit
                </button>
              )}

              {isOpen && (
                      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                          <PublishProductForm closeModal={closeModal} />
                        </div>
                      </div>
               )}
            </div>

            {/* Icône Utilisateur */}
            <div className="relative">
              <FontAwesomeIcon
                icon={faUser}
                className="text-xl cursor-pointer"
                onClick={toggleUserMenu}
                
              />
              {/* Menu déroulant pour l'utilisateur */}
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-64 bg-white text-black rounded-lg shadow-lg p-4">
                  <p className='inline-flex font-bold'>Nom d'utilisateur : <span className='ml-2 font-semibold text-green-600'>{user.nom_user}</span>  </p>
                  <p className="font-bold">Email : {user.email}</p>
                  <p className="font-bold">phone: {user.telephone}</p>
                </div>
              )}
              
            </div>
          </div>

          {/* Menu de navigation */}
          <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-user">
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-500 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-green-600 md:dark:bg-green-600 dark:border-gray-700">
              <li>
                <a href="/" className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-gray-200" aria-current="page">Home</a>
              </li>
              <li>
                <a href="#apropos" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-gray-200 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">About us</a>
              </li>
              <li>
                <a href="#Noservice" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-gray-200 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Services</a>
              </li>
              <li>
                <a href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-gray-200 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Contact</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default HeaderApp;
