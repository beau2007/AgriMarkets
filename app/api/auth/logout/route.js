// Exemple pour Next.js API (dans le dossier /app/api/logout.js ou /api/logout.js selon ta structure)
import { getServerSession } from 'next-auth';  // Si tu utilises `next-auth`

export default async function handler(req, res) {
    if (req.method === 'POST') {
        // Terminer la session de l'utilisateur
        const session = await getServerSession(req, res);
        
        if (session) {
            req.session.destroy();
            res.status(200).json({ message: 'Déconnexion réussie' });
        } else {
            res.status(400).json({ message: 'Aucune session active' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Méthode ${req.method} non autorisée`);
    }
}
