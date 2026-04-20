import express from 'express';
import type { Request, Response } from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const menuEs = {
  starters: [
    { id: 1, name: 'Carpaccio de Res Wagyu A5', price: 42, desc: 'Láminas de mármol grado A5, perlas de trufa negra, emulsión de piñones tostados y escamas de sal Maldon.', image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=800&q=80' },
    { id: 2, name: 'Tartar de Atún Bluefin Imperial', price: 38, desc: 'Corte artesanal a punta de cuchillo, aire de jengibre y soja envejecida 15 años.', image: 'https://images.unsplash.com/photo-1544124499-58ec50672e81?auto=format&fit=crop&w=800&q=80' },
    { id: 15, name: 'Ostras Guillardeau "Gold"', price: 55, desc: 'Media docena de ostras premium, granizado de champán rosado y caviar cítrico.', image: 'https://images.unsplash.com/photo-1599081533966-2358fb88baaf?auto=format&fit=crop&w=800&q=80' },
  ],
  mains: [
    { id: 3, name: 'Tomahawk Black Angus 60 Días', price: 185, desc: 'Maduración en seco propia, terminado en leña de encina. Maridado con sal de carbón volcánico.', image: 'https://images.unsplash.com/photo-1594041680534-e8c8cdebd659?auto=format&fit=crop&w=800&q=80', pairing: 'Opus One 2018' },
    { id: 4, name: 'Bacalao Black Cod Miso-Real', price: 65, desc: 'Marinado 72 horas en miso blanco y sake, glaseado cítrico y brotes de rábano picante.', image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=800&q=80', pairing: 'Montrachet Grand Cru' },
    { id: 17, name: 'Risotto de Setas y Trufa Blanca', price: 58, desc: 'Arroz Acquerello reserva 7 años, sinfonía de setas silvestres y ralladura de trufa de Alba.', image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&w=800&q=80', pairing: 'Gaja Barbaresco' },
  ],
  desserts: [
    { id: 5, name: 'Órbita de Cacao y Oro', price: 35, desc: 'Esfera de chocolate al 90%, mousse de avellana y núcleo de caramelo salado fluído.', image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=800&q=80' },
  ],
  drinks: [
    { id: 7, name: 'Enigma Botanique', price: 28, desc: 'Cóctel de autor con ginebra de parcela, esencia de bergamota y humo de madera de cerezo.', image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=800&q=80' },
  ],
  wines: [
    { id: 9, name: 'Dom Pérignon Plénitude 2', price: 1200, desc: 'La máxima expresión del champagne. Complejidad, precisión y longevidad absoluta.', image: 'https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?auto=format&fit=crop&w=800&q=80' },
  ]
};

const menuEn = {
  starters: [
    { id: 1, name: 'Wagyu Beef Carpaccio A5', price: 42, desc: 'A5 grade marble slices, black truffle pearls, toasted pine nut emulsion.', image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=800&q=80' },
  ],
  mains: [
    { id: 3, name: '60-Day Aged Black Angus Tomahawk', price: 185, desc: 'In-house dry aging, finished over holm oak firewood. Volcanic charcoal salt.', image: 'https://images.unsplash.com/photo-1594041680534-e8c8cdebd659?auto=format&fit=crop&w=800&q=80', pairing: 'Opus One 2018' },
  ],
  desserts: [
    { id: 5, name: 'Gold & Cocoa Orbit', price: 35, desc: '90% dark chocolate sphere, hazelnut mousse and fluid salted caramel core.', image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=800&q=80' },
  ],
  drinks: [],
  wines: []
};

app.get('/api/menu', (req: Request, res: Response) => {
  const lang = req.query.lang;
  res.json(lang === 'en' ? menuEn : menuEs);
});

app.post('/api/reserve', (req: Request, res: Response) => {
  const { name, guests } = req.body;
  res.status(201).json({ message: 'Reserva confirmada', reservation: { name, guests } });
});

export default app;
