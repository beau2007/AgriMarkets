import prisma from '../../../../lib/prisma';

export async function GET() {
  try {
    const produits = await prisma.produit.findMany();
    return new Response(JSON.stringify(produits), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Erreur lors de la récupération des produits' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
