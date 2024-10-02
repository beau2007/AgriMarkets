import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const body = await req.json(); // Récupérer les données JSON envoyées

    // Vérifier que toutes les données nécessaires sont présentes
    const { nom_produits, quantite, prix, image, categorie } = body;
    if (!nom_produits || !quantite || !prix || !image || !categorie) {
      return new Response(JSON.stringify({ message: 'Données manquantes' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    // Créer le produit dans la base de données
    const nouveauProduit = await prisma.produit.create({
      data: {
        nom_produits,
        quantite: parseInt(quantite),
        prix: parseFloat(prix),
        imageUrl,
        categorie,
      },
    });

    return new Response(JSON.stringify(nouveauProduit), {
      status: 201, // Succès
    });
  } catch (error) {
    console.error('Erreur lors de la création du produit :', error);
    return new Response(JSON.stringify({ message: 'Erreur serveur' }), {
      status: 500,
    });
  }
}
