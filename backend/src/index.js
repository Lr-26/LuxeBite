import express, {} from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = process.env.PORT || 5001;
app.use(cors());
app.use(express.json());
// Serve Static Files
const frontendPath = path.join(__dirname, '../../frontend/dist');
app.use(express.static(frontendPath));
// Mock Menu Data
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
app.get('/api/menu', (req, res) => {
    res.json(menu);
});
app.post('/api/reserve', (req, res) => {
    const { name, date, time, guests, email } = req.body;
    if (!name || !date || !time || !guests) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }
    console.log(`Nueva reserva recibida: ${name} para ${guests} personas el ${date} a las ${time}`);
    // En un sistema real, guardaríamos esto en una base de datos
    res.status(201).json({
        message: 'Reserva confirmada con éxito',
        reservation: { name, date, time, guests }
    });
});
app.listen(PORT, () => {
    console.log(`Servidor completo corriendo en http://localhost:${PORT}`);
});
// Fallback for SPA routing
app.get('*', (req, res) => {
    res.sendFile(path.join(frontendPath, 'index.html'));
});
//# sourceMappingURL=index.js.map