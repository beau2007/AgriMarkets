"use client"
import { useState} from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'react-hot-toast';


const Register= () => {

    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        telephone: '',
        password: '',
        role: 'client'
      })
    
      const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prevState => ({ ...prevState, [name]: value }))
      }

      const phone = formData.telephone.replace(/[-\s]/g, "");
      const formattedPhone = `+237${phone}`;

      const sendSMS = async (phone, message) => {
        const res = await fetch("/api/sendSMS", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ phone, message }),
        });
    
        if (!res.ok) {
          throw new Error("Failed to send SMS");
        }
    
        return res.json();
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        try {
          const response = await fetch('api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
          })
          
          if (response.ok) {
            const data = await response.json()
            const message = `Mr/Mme. ${formData.first_name}, votre Enregistrement sur Agrimarkets a été effectué avec succès.`;

            toast.promise(sendSMS(formattedPhone, message), {
              loading: "Envoi du SMS de confirmation...",
              success: "SMS envoyé avec succès",
              error: "Erreur lors de l'envoi du SMS",
            });

            console.log('Utilisateur enregistré:', data)
            router.push('/login')

            // Rediriger ou afficher un message de succès
          } else {
            const error = await response.json()
            console.error('Erreur d\'enregistrement:', error)
            // Afficher un message d'erreur
          }
        } catch (error) {
          console.error('Erreur:', error)
          // Afficher un message d'erreur
        }
      }
    return ( 
        <>   
            <div className=" w-full">
                <h1 className="text-6xl font-bold text-green-600 text-center mb-8 p-12">s'inscrire</h1>
                <p className="text-3xl font-bold text-center mb-8">si vous êtes déja inscrit <Link className="text-green-600" href="/login">connectez-vous ici.</Link> Sinon, dites-nous en plus sur vous! Vos informations d'inscription nous aideront à offrir une excellente expérience.
                Pour les vendeurs, des informations supplementaires seront necessaires pour recevoir des fonds.</p>
            </div>

            <div className="pt-34 max-w-md mx-auto rounded-lg shadow-md bg-gray-100">
                <form className="max-w-md mx-auto" onSubmit={handleSubmit} >
                    <div className="grid md:grid-cols-2 md:gap-6">
                        <div className="relative z-0 w-full mb-5 group">
                            <input type="text" name="nom_user" id="nom_user" value={formData.nom_user} onChange={handleChange} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                            <label htmlFor="nom_user" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">nom</label>
                        </div>
                        <div className="relative z-0 w-full mb-5 group">
                            <input type="text" name="prenom_user" id="prenom_user" value={formData.prenom_user} onChange={handleChange} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                            <label htmlFor="prenom_user" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">prenom</label>
                        </div>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                        <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                        <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">email</label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                            <input type="telephone" name="telephone" id="telephone" value={formData.telephone} onChange={handleChange} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                            <label htmlFor="telephone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">telephone</label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                        <input type="password" name="password" id="password" value={formData.password} onChange={handleChange} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                        <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">mot de passe</label>
                    </div>
                    {/* <div className="relative z-0 w-full mb-5 group">
                        <input type="password" name="repeat_password" id="repeat_password" value={formData.repeat_password} onChange={handleChange} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                        <label htmlFor="floating_repeat_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirm password</label>
                    </div> */}
                    <div className="relative z-0 w-full mb-5 group">
                        <label htmlFor="role" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Rôle</label>
                        <select
                            id="role"
                            name="role"
                            value={formData.role} onChange={handleChange}
                            className="w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 border-0 border-b-2 border-gray-300 dark:border-gray-600"
                            required
                            >
                            <option value="client">Client</option>
                            <option value="agriculteur">Agriculteur</option>
                            <option value="admin">Administateur</option>
                            <option value="livreur">Livreur</option>
                        </select>
                    </div>
                    <button type="submit" disabled={isLoading} className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-52 py-2.5 text-center dark:bg-green-600 dark:hover:bg-white-700 dark:focus:ring-white-800">{isLoading ? 'Envoi...' :"S'inscrire"}</button>
                </form>
            </div>
        </>
    );

}
export default Register;
