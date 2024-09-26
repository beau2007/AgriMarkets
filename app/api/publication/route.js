const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Initialiser l'application Express
const app = express();
app.use(cors());
app.use(express.json()); // Pour parser les requêtes en JSON

// Connexion à MongoDB
mongoose.connect('mongodb://localhost:27017/agriMarket_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connexion à MongoDB réussie'))
.catch((err) => console.error('Erreur de connexion à MongoDB:', err));

// Définir le modèle de publication
const publicationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  imageUrl: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Publication = mongoose.model('Publication', publicationSchema);

// Route pour publier un produit
app.post('/api/publications/publish', async (req, res) => {
  try {
    const { name, price, quantity, imageUrl } = req.body;

    if (!name || !price || !quantity || !imageUrl) {
      return res.status(400).json({ error: 'Tous les champs sont obligatoires' });
    }

    // Créer et sauvegarder la publication dans MongoDB
    const newPublication = new Publication({
      name,
      price,
      quantity,
      imageUrl
    });
    
    await newPublication.save();
    
    res.status(201).json({ message: 'Publication créée avec succès', publication: newPublication });
  } catch (error) {
    console.error('Erreur lors de la création de la publication:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Démarrer le serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serveur en écoute sur le port ${PORT}`);
});
