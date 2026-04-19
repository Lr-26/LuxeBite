const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json());

const menu = {
  starters: [
    { id: 1, name: 'Carpaccio de Res', price: 18, desc: 'Finas láminas de res con alcaparras y lluvia de parmesano.' },
    { id: 2, name: 'Ceviche de Maracuyá', price: 16, desc: 'Pescado fresco marinado con un toque cítrico y exótico.' },
  ],
  mains: [
    { id: 3, name: 'Lomo en Salsa de Vino', price: 32, desc: 'Corte premium con reducción de Malbec y vegetales asados.' },
    { id: 4, name: 'Salmón a las Hierbas', price: 28, desc: 'Filete sellado con costra de finas hierbas y puré de coliflor.' },
  ],
  desserts: [
    { id: 5, name: 'Volcán de Chocolate', price: 12, desc: 'Corazón derretido servido con helado de vainilla artesanal.' },
    { id: 6, name: 'Cheesecake de Frutos Rojos', price: 10, desc: 'Clásico cremoso con coulis natural de bayas silvestres.' },
  ],
};

app.get('/api/menu', (req, res) => { res.json(menu); });
app.post('/api/reserve', (req, res) => { res.status(201).json({ message: 'OK' }); });

app.listen(PORT, () => {
  console.log(`Fallback server running on http://localhost:${PORT}`);
});
