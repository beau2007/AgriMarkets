"use client"
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import Image from 'next/image'
import Link from 'next/link'
import { signIn } from 'next-auth/react'
import toast, { Toaster } from 'react-hot-toast'
import style from '../../style/connection.module.css'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter()

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsLoading(true)

    try {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      })

      if (result.error) {
        toast.error(result.error)
      } else {
        toast.success('Connexion réussie!')
        router.push('/composantApp') // Redirigez vers la page souhaitée après la connexion
      }
    } catch (error) {
      toast.error('Une erreur est survenue lors de la connexion')
    } finally {
      setIsLoading(false)
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <section className={style.identification}>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <Link href="/" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <Image className="w-8 h-8 mr-2" src="/asset/images/logo.webp" alt="logo" width={32} height={32} />
          AgriMarket  
        </Link>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-300 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Connectez-vous à votre compte
            </h1>
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Votre email</label>
                <input 
                  type="email" 
                  name="email" 
                  id="email" 
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                  placeholder="nom@exemple.com" 
                  onChange={(e) => setEmail(e.target.value)} 
                  required 
                />
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mot de passe</label>
                <input 
                  type="password" 
                  name="password" 
                  id="password" 
                  placeholder="••••••••" 
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                  onChange={(e) => setPassword(e.target.value)} 
                  required 
                />
                <button type="button" onClick={togglePasswordVisibility}>
                    {showPassword ? '🙈' : '👁️'}
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-green-500 focus:ring-3 focus:ring-primary-600 dark:bg-green-700 dark:border-green-600 dark:focus:ring-green-600 dark:ring-offset-green-800" />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="remember" className="text-gray-900 dark:text-gray-900">Se souvenir de moi</label>
                  </div>
                </div>
                <Link href="/restart" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">
                  Mot de passe oublié?
                </Link>
              </div>
              <button 
                type="submit" 
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-500 dark:hover:bg-green-700 dark:focus:ring-primary-800"
                disabled={isLoading}
              >
                {isLoading ? 'Connexion...' : 'Connexion'}
              </button>
              <p className="text-sm font-light text-White-700 dark:text-white-400">
                Vous n'avez pas encore de compte? <Link href="/register" className="font-medium text-primary-600 hover:underline dark:text-green-900">S'inscrire</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </section>
  )
}

export default Login
