import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import prisma from '../../../../lib/prisma'
import bcrypt from 'bcryptjs'

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const user = await prisma.utilisateur.findUnique({
          where: { email: credentials.email }
        })

        if (!user) {
          return null
        }

        const isPasswordValid = await bcrypt.compare(credentials.password, user.password)

        if (!isPasswordValid) {
          return null
        }

        return {
          id: user.id,
          email: user.email,
          nom_user: user.nom_user,
          prenom_user: user.prenom_user,
          role: user.role,
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
        token.nom_user = user.nom_user
      }
      return token
    },
    async session({ session, token }) {
      session.user.role = token.role
      session.user.nom_user = token.nom_user;
      return session
    }
  },
  pages: {
    signIn: '/login',
  }
}

