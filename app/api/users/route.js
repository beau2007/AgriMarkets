// app/api/user/route.js
import prisma from '../../../lib/prisma';

export async function GET(request) {
  // Assurez-vous d'avoir une méthode pour obtenir l'ID de l'utilisateur. 
  // Cela peut être via un token JWT ou d'autres moyens.
  const userId = request.headers.get('Authorization'); // Exemple pour récupérer l'ID de l'utilisateur

  if (!userId) {
    return new Response('Unauthorized', { status: 401 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId, // Utilisez l'ID correct
      },
    });

    if (!user) {
      return new Response('User not found', { status: 404 });
    }

    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error) {
    console.error('Error fetching user:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
