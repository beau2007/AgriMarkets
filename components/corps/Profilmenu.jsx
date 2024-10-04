// // components/ProfileMenu.js
// import { useState, useEffect } from 'react';

// export default function ProfileMenu({ user }) {
//   const [isOpen, setIsOpen] = useState(false);

//   const toggleMenu = () => {
//     setIsOpen((prev) => !prev);
//   };

//   return (
//     <div className="relative">
//       <button onClick={toggleMenu} className="flex items-center p-2 rounded-full focus:outline-none">
//         <img src="/path/to/profile-icon.png" alt="Profile" className="w-8 h-8 rounded-full" />
//       </button>
//       {isOpen && (
//         <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-10">
//           <div className="px-4 py-2">
//             <h4 className="text-lg font-semibold">{user.name}</h4>
//             <p className="text-sm text-gray-600">{user.email}</p>
//             <p className="text-sm text-gray-600">{user.phone}</p>
//           </div>
//           <div className="border-t"></div>
//           <div className="flex flex-col">
//             <button className="px-4 py-2 text-left hover:bg-gray-100">Déconnexion</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
