import multer from 'multer';
import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';  // Utilise ton instance Prisma pour interagir avec MongoDB
import { promises as fs } from 'fs';
import path from 'path';

// Configuration de Multer pour stocker les fichiers localement dans le dossier "uploads"
const upload = multer({ dest: 'uploads/' });

// Middleware pour gérer le fichier téléversé
const uploadMiddleware = upload.single('image');

// Désactiver le body parser pour que multer puisse gérer le fichier
export const config = {
  api: {
    bodyParser: false,
  },
};

// Handler pour gérer les requêtes POST
export async function POST(req) {
  try {
    // On exécute d'abord multer pour traiter le fichier
    await new Promise((resolve, reject) => {
      uploadMiddleware(req, {}, (err) => {
        if (err) return reject(err);
        resolve();
      });
    });

    // Récupérer les données du formulaire
    const formData = await req.formData();
    const nom_produit = formData.get('nom_produit');
    const quantite = formData.get('quantite');
    const prix = formData.get('prix');
    const categorie = formData.get('categorie');
    

    // Obtenir l'URL de l'image téléversée
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : '';

    // Enregistrer les données dans la base de données avec Prisma
    const newProduit = await prisma.produit.create({
      data: {
        nom_produits:nom_produit,
        quantite: parseInt(quantite, 10),
        prix: parseFloat(prix),
        categorie:categorie,
        imageUrl:imageUrl,  // Sauvegarder l'URL de l'image téléversée
      },
    });

    return NextResponse.json(newProduit, { status: 200 });
  } catch (error) {
    console.error('Erreur lors de la publication du produit :', error);
    return NextResponse.json({ error: 'Erreur lors de la publication du produit.' }, { status: 500 });
  }
}
