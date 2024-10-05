import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';
import { writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/authOptions";
import path from 'path';

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req) {
  try {
    // Vérifier l'authentification
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Non autorisé. Veuillez vous connecter.' }, { status: 401 });
    }

    const data = await req.formData();
    const nom_produit = data.get('nom_produit');
    const quantite = data.get('quantite');
    const prix = data.get('prix');
    const categorie = data.get('categorie');
    const image = data.get('image');

    if (!nom_produit || !quantite || !prix || !categorie) {
      return NextResponse.json({ error: 'Tous les champs sont requis.' }, { status: 400 });
    }

    // Vérifier si l'utilisateur est un agriculteur
    const user = await prisma.utilisateur.findUnique({
      where: { id: session.user.id },
      include: { agriculteur: true },
    });

    if (!user || !user.agriculteur) {
      return NextResponse.json({ error: 'Seuls les agriculteurs peuvent publier des produits.' }, { status: 403 });
    }

    let imageUrl = null;
    if (image) {
      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);
      
      // Définir le chemin du dossier uploads
      const uploadDir = path.join(process.cwd(), 'public', 'uploads');
      
      // Vérifier si le dossier existe, sinon le créer
      if (!existsSync(uploadDir)) {
        await mkdir(uploadDir, { recursive: true });
      }

      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
      const filename = `${image.name.split('.')[0]}-${uniqueSuffix}.${image.name.split('.').pop()}`;
      const filepath = path.join(uploadDir, filename);
      
      await writeFile(filepath, buffer);
      imageUrl = `/uploads/${filename}`;
    }

    const newProduit = await prisma.produit.create({
      data: {
        nom_produits: nom_produit,
        quantite: parseInt(quantite, 10),
        prix: parseFloat(prix),
        categorie: categorie,
        imageUrl: imageUrl,
        agriculturPhone: user.agriculteur.telephone,
        agriculturId: user.agriculteur.id,
      },
    });

    return NextResponse.json(newProduit, { status: 201 });
  } catch (error) {
    console.error('Erreur lors de la publication du produit :', error);
    return NextResponse.json({ error: 'Erreur lors de la publication du produit.' }, { status: 500 });
  }
}