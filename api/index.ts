import express from 'express';
import type { Request, Response } from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

// Datos del Menú (Copia de la lógica central)
const menuEs = {
  starters: [
    { id: 1, name: 'Carpaccio de Res Wagyu', price: 24, desc: 'Láminas curadas de res Wagyu A5, alcaparras crujientes, trufa negra y parmesano.', image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=800&q=80' },
    { id: 2, name: 'Tartar de Salmón y Foie Gras', price: 28, desc: 'Corte artesanal, esferas de yuzu confitado y crujiente de pan brioche.', image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  ],
  mains: [
    { id: 3, name: 'Tomahawk añejado 45 Días', price: 120, desc: 'Corte con hueso madurado en seco, terminado en parrilla de roble fuego lento.', image: 'https://images.unsplash.com/photo-1594041680534-e8c8cdebd659?auto=format&fit=crop&w=800&q=80' },
  ],
  desserts: [],
  drinks: [],
  wines: []
};

const menuEn = {
  starters: [
    { id: 1, name: 'Wagyu Beef Carpaccio', price: 24, desc: 'Cured slices of A5 Wagyu beef, black truffle and parmesan cheese.', image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=800&q=80' },
  ],
  mains: [],
  desserts: [],
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
