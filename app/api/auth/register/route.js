import { NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(request) {
  try {
    const body = await request.json();
    const { nom_user, prenom_user, email, telephone, password, role } = body;

    // Vérification de base des champs requis
    if (!nom_user || !prenom_user || !email || !password || !role) {
      return NextResponse.json({ error: "Tous les champs requis doivent être remplis" }, { status: 401 });
    }

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await prisma.utilisateur.findUnique({
      where: { email: email }
    });

    if (existingUser) {
      return NextResponse.json({ error: "Un utilisateur avec cet email existe déjà" }, { status: 400 });
    }

    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Créer le nouvel utilisateur
    const newUser = await prisma.utilisateur.create({
      data: {
        nom_user,
        prenom_user,
        email,
        telephone,
        password: hashedPassword,
        role
      }
    });

    // Créer l'enregistrement correspondant selon le rôle
    if (role === 'client') {
      await prisma.client.create({
        data: {
          utilisateur: { connect: { id: newUser.id } }
        }
      });
    } else if (role === 'agriculteur') {
      await prisma.agriculteur.create({
        data: {
          utilisateur: { connect: { id: newUser.id } }
        }
      });
    } else if (role === 'administrateur') {
      await prisma.administrateur.create({
        data: {
          utilisateur: { connect: { id: newUser.id } }
        }
      });
    } else if (role === 'livreur') {
      await prisma.livreur.create({
        data: {
          utilisateur: { connect: { id: newUser.id } }
        }
      });
    }

    // Ne pas renvoyer le mot de passe dans la réponse
    const { password: _, ...userWithoutPassword } = newUser;

    // Redirection après l'inscription réussie
    return NextResponse.json({
      user: userWithoutPassword,
      message: "Inscription réussie. Vous allez être redirigé vers la page de connexion.",
      redirect: "/login"  // L'URL de redirection
    }, { status: 201 });

  } catch (error) {
    console.error("Erreur lors de l'enregistrement:", error);
    return NextResponse.json({ error: "Une erreur est survenue lors de l'enregistrement" }, { status: 500 });
  }
}
