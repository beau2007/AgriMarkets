'use client';
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons';
import Formpublication from '../Forms/Publication'; // Importation du formulaire

function HeaderApp() {
  const [showCartMenu, setShowCartMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showForm, setShowForm] = useState(false); // État pour le formulaire pop-up

  const toggleCartMenu = () => setShowCartMenu(!showCartMenu);
  const toggleUserMenu = () => setShowUserMenu(!showUserMenu);

  const [role, setRole] = useState('');

  useEffect(() => {
    // Appel API pour récupérer le rôle de l'utilisateur connecté
    const fetchUserRole = async () => {
      const userRole = await getUserRole(); // Ex: 'agriculteur', 'client'
      setRole(userRole);
    };

    fetchUserRole();
  }, []);

  const handleCloseForm = () => {
    setShowForm(false); // Ferme le formulaire
  };
    return(
        <>
       <nav className="bg-white dark:bg-green-600 fixed w-full z-10 -top-4 start-0 border-b border-gray-200 dark:border-gray-600">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <a href="https://flowbite.com/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src="/asset/images/logo.webp" className="h-8" alt="AgriMarket Logo"/>
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">AgriMarket</span>
                </a>
                <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                    
                    {/* <!-- Dropdown menu --> */}
                    <div className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600" id="user-dropdown">
                        <div className="px-4 py-3">
                            <span className="block text-sm text-gray-900 dark:text-white">Name</span>
                            <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">Email</span>
                        </div>
                        <ul className="py-2" aria-labelledby="user-menu-button">
                            <li>
                                <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Dashboard</a>
                            </li>
                            <li>
                                <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Settings</a>
                            </li>
                            <li>
                                <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Earnings</a>
                            </li>
                        </ul>
                    </div>
                    <button data-collapse-toggle="navbar-user" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-user" aria-expanded="false">
                        <span class="sr-only">Open main menu</span>
                        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
                        </svg>
                    </button>

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

                    {/* bouton deconnexion */}
                    <div class=" flex gap-6 p-4">
                        <Link href="">
                            <button type="button" class="text-white bg-green-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-white-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-white-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Log Out</button>
                        </Link>
                         {/* Bouton "Publier un produit" affiché si l'utilisateur est agriculteur */}
                        {role === 'agriculteur' && (
                        <button
                            type="button"
                            className="text-white bg-green-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-white-300 font-medium rounded-lg text-sm px-4 py-2"
                            onClick={() => setShowForm(true)} // Ouvre le formulaire pop-up
                        >
                            Publier un produit
                        </button>
                        )}

                        {/* Affichage du formulaire en pop-up */}
                        {showForm && <Formpublication onClose={handleCloseForm} />}
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
                        <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg p-4">
                            <p>Nom d'utilisateur : </p>
                            <p>Email : </p>
                        </div>
                        )}
                    </div>
                </div>
                <div class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-user">
                        <ul class="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-500 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-green-600 md:dark:bg-green-600 dark:border-gray-700">
                            <li>
                                <a href="#" class="block py-2 px-3 text-white bg-bleu-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-gray-200" aria-current="page">Home</a>
                            </li>
                            <li>
                                <a href="#apropos" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-gray-200 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">About us</a>
                            </li>
                            <li>
                                <a href="#Noservice" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-gray-200 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Services</a>
                            </li>
                            <li>
                                <a href="#" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-gray-200 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Contact</a>
                            </li>
                        </ul>
                </div>
            </div>
        </nav>

        
        </>
    )
}

export default HeaderApp;