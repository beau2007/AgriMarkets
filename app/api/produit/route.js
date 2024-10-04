import multer from 'multer';
import  prisma  from '../../../lib/prisma';  // Utilise ton instance Prisma pour interagir avec MongoDB

// Configuration de Multer pour stocker les fichiers localement
const upload = multer({ dest: 'uploads/' });

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      // Gérer le téléversement de l'image
      const { nom_produit, quantite, prix, categorie } = req.body;
      const imageUrl = req.file ? `/uploads/${req.file.filename}` : '';

      // Enregistrer les données du produit et l'URL de l'image dans la base de données
      const newProduit = await prisma.produit.create({
        data: {
          nom_produit,
          quantite,
          prix,
          imageUrl,  // Sauvegarder l'URL de l'image téléversée
          categorie,
        },
      });

      res.status(200).json(newProduit);
    } catch (error) {
      res.status(500).json({ error: 'Erreur lors de la publication du produit.' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Méthode ${req.method} non autorisée`);
  }
}

// Middleware pour Multer
export const config = {
  api: {
    bodyParser: false,
  },
};

export const uploadMiddleware = upload.single('image');  // Accepter un seul fichier
