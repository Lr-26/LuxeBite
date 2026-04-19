import express from 'express';
import type { Request, Response } from 'express';
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
const menuEs = {
  starters: [
    { id: 1, name: 'Carpaccio de Res Wagyu', price: 24, desc: 'Láminas curadas de res Wagyu A5, alcaparras crujientes, trufa negra y parmesano.', image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=800&q=80' },
    { id: 2, name: 'Tartar de Salmón y Foie Gras', price: 28, desc: 'Corte artesanal, esferas de yuzu confitado y crujiente de pan brioche.', image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { id: 15, name: 'Ostras Guillardeau', price: 35, desc: 'Media docena de ostras frescas glaseadas con vinagreta de chalota y perlas de yuzu.', image: 'https://images.unsplash.com/photo-1599081533966-2358fb88baaf?auto=format&fit=crop&w=800&q=80' },
    { id: 16, name: 'Pulpo a la Brasa de Carbn', price: 32, desc: 'Tentáculo tierno ahumado con madera de encina sobre cremoso de patata violeta.', image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80' },
  ],
  mains: [
    { id: 3, name: 'Tomahawk añejado 45 Días', price: 120, desc: 'Corte con hueso madurado en seco, terminado en parrilla de roble fuego lento. Para compartir.', image: 'https://images.unsplash.com/photo-1594041680534-e8c8cdebd659?auto=format&fit=crop&w=800&q=80', pairing: 'Cabernet Sauvignon Napa Valley' },
    { id: 4, name: 'Lubina Chilena al Azafrán', price: 45, desc: 'Filete horneado servido sobre risotto negro cremoso y emulsión de azafrán español.', image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=800&q=80', pairing: 'Chardonnay Premier Cru' },
    { id: 17, name: 'Rack de Cordero Lechal', price: 58, desc: 'Costillar australiano horneado a las finas hierbas con cuscús de menta verde.', image: 'https://images.unsplash.com/photo-1603525166297-c75c50c058c4?auto=format&fit=crop&w=800&q=80', pairing: 'Barolo DOCG 2018' },
    { id: 16, name: 'Risotto de Langosta', price: 65, desc: 'Arroz arborio cremoso con azafrán, medallones de langosta y bisque marmoleado.', image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=800&q=80', pairing: 'Dom Pérignon Vintage' },
  ],
  desserts: [
    { id: 5, name: 'Esfera de Oro y Cacao', price: 20, desc: 'Cacao orgánico al 85%, mousse oscuro, frambuesas silvestres y pan de oro 24k.', image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=800&q=80' },
    { id: 6, name: 'Pavlova de Lichi y Rosas', price: 18, desc: 'Merengue francés quebradizo, crema ligera de rosas y compota de frutos rojos exóticos.', image: 'https://images.unsplash.com/photo-1464305795204-6f5bbfc7fb81?auto=format&fit=crop&w=800&q=80' },
    { id: 11, name: 'Tiramisú de Matcha', price: 16, desc: 'Mascarpone artesanal, bizcochos bañados en té matcha premium de Uji y polvo de pistacho.', image: 'https://images.unsplash.com/photo-1571115177098-24c424b32bb6?auto=format&fit=crop&w=800&q=80' },
    { id: 12, name: 'Crème Brûlée de Lavanda', price: 14, desc: 'Infusión floral suave, costra de caramelo flameado al momento y moras frescas.', image: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=800&q=80' },
    { id: 19, name: 'Ópera de Macarons', price: 22, desc: 'Crocantes capas finas francesas rellenas de crema de avellanas y moras silvestres.', image: 'https://images.unsplash.com/photo-1569864358642-9d1684040f43?auto=format&fit=crop&w=800&q=80' },
    { id: 20, name: 'Volcán de Praliné Ahumado', price: 25, desc: 'Bizcocho tibio que libera un centro líquido praliné al romperse, servido con helado de vainilla negra.', image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80' },
  ],
  drinks: [
    { id: 7, name: 'Cóctel Vivaia Enigma', price: 16, desc: 'Ginebra botánica, clarificación de yuzu y niebla aromática de romero humeante.', image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=800&q=80' },
    { id: 8, name: 'Agua Cítrica Artesiana', price: 8, desc: 'Agua mineral extraída en frío, gasificada finamente con esferas de naranja sanguina.', image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=800&q=80' },
    { id: 21, name: 'Old Fashioned de la Casa', price: 18, desc: 'Bourbon artesanal, amargos de trufa, azúcar moreno flameada y un enorme cubo de hielo.', image: 'https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&w=800&q=80' },
    { id: 22, name: 'Elixir de Sauco', price: 12, desc: 'Infusión en frío sin alcohol de flores de saúco, pepino fresco y hojas doradas de menta.', image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=800&q=80' },
  ],
  wines: [
    { id: 9, name: 'Château Margaux 2015', price: 850, desc: 'Premier Grand Cru Classé. Complejidad asombrosa con notas a casis y trufa.', image: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=800&q=80' },
    { id: 10, name: 'Napa Valley Reserve', price: 320, desc: 'Cabernet Sauvignon elegante, cuerpo robusto con final de roble tostado y vainilla.', image: 'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?auto=format&fit=crop&w=800&q=80' },
    { id: 13, name: 'Barolo DOCG 2018', price: 280, desc: 'Tinto italiano de cuerpo entero, aromas a rosa deshidratada, alquitrán y frutos rojos maduros.', image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80' },
    { id: 14, name: 'Dom Pérignon Vintage 2012', price: 450, desc: 'Champagne excepcional, brillante y preciso con una mousse cremosa y final prolongado.', image: 'https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?auto=format&fit=crop&w=800&q=80' },
    { id: 23, name: 'Brunello di Montalcino', price: 210, desc: 'Equilibrio perfecto de acidez, taninos estructurados e inigualables aromas de sotobosque.', image: 'https://images.unsplash.com/photo-1516594915697-87eb3b1c14ea?auto=format&fit=crop&w=800&q=80' },
    { id: 24, name: 'La Rioja Alta Gran Reserva', price: 180, desc: 'Elegancia pura del tempranillo español, notas a madera añeja de barrica y frutas secas.', image: 'https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?auto=format&fit=crop&w=800&q=80' },
  ],
};

const menuEn = {
  starters: [
    { id: 1, name: 'Wagyu Beef Carpaccio', price: 24, desc: 'Cured slices of A5 Wagyu beef, crispy capers, black truffle and parmesan cheese.', image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=800&q=80' },
    { id: 2, name: 'Salmon and Foie Gras Tartare', price: 28, desc: 'Artisanal cut, candied yuzu spheres and crispy brioche bread.', image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { id: 15, name: 'Guillardeau Oysters', price: 35, desc: 'Half a dozen fresh oysters glazed with shallot vinaigrette and yuzu pearls.', image: 'https://images.unsplash.com/photo-1599081533966-2358fb88baaf?auto=format&fit=crop&w=800&q=80' },
    { id: 16, name: 'Charcoal Grilled Octopus', price: 32, desc: 'Tender tentacle smoked with holm oak wood over creamy violet potato.', image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80' },
  ],
  mains: [
    { id: 3, name: '45-Day Dry-Aged Tomahawk', price: 120, desc: 'Dry-aged bone-in cut, finished on a slow oak grill. To share.', image: 'https://images.unsplash.com/photo-1594041680534-e8c8cdebd659?auto=format&fit=crop&w=800&q=80', pairing: 'Napa Valley Cabernet Sauvignon' },
    { id: 4, name: 'Saffron Chilean Sea Bass', price: 45, desc: 'Baked fillet served over creamy black risotto and Spanish saffron emulsion.', image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=800&q=80', pairing: 'Chardonnay Premier Cru' },
    { id: 17, name: 'Baby Lamb Rack', price: 58, desc: 'Australian rack of lamb baked with fine herbs perfectly paired with mint couscous.', image: 'https://images.unsplash.com/photo-1603525166297-c75c50c058c4?auto=format&fit=crop&w=800&q=80', pairing: 'Barolo DOCG 2018' },
    { id: 18, name: 'Royal Lobster Risotto', price: 65, desc: 'Arborio rice slowly cooked in seafood bisque topped with a whole buttered lobster tail.', image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=800&q=80', pairing: 'Dom Pérignon Vintage' },
  ],
  desserts: [
    { id: 5, name: 'Gold and Cocoa Sphere', price: 20, desc: '85% organic cocoa, dark mousse, wild raspberries and 24k gold leaf.', image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=800&q=80' },
    { id: 6, name: 'Lychee and Rose Pavlova', price: 18, desc: 'Crumbly French meringue, light rose cream and exotic red berry compote.', image: 'https://images.unsplash.com/photo-1464305795204-6f5bbfc7fb81?auto=format&fit=crop&w=800&q=80' },
    { id: 11, name: 'Matcha Tiramisu', price: 16, desc: 'Artisanal mascarpone, ladyfingers soaked in premium Uji matcha tea and pistachio dust.', image: 'https://images.unsplash.com/photo-1571115177098-24c424b32bb6?auto=format&fit=crop&w=800&q=80' },
    { id: 12, name: 'Lavender Crème Brûlée', price: 14, desc: 'Soft floral infusion, freshly flamed caramel crust and fresh blackberries.', image: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=800&q=80' },
    { id: 19, name: 'Macaron Opera', price: 22, desc: 'Crispy French thin layers filled with hazelnut cream and wild berries.', image: 'https://images.unsplash.com/photo-1569864358642-9d1684040f43?auto=format&fit=crop&w=800&q=80' },
    { id: 20, name: 'Smoked Praline Volcano', price: 25, desc: 'Warm cake that releases a liquid praline center when broken, served with black vanilla ice cream.', image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80' },
  ],
  drinks: [
    { id: 7, name: 'Vivaia Enigma Cocktail', price: 16, desc: 'Botanical gin, yuzu clarification and smoking rosemary aromatic mist.', image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=800&q=80' },
    { id: 8, name: 'Artesian Citrus Water', price: 8, desc: 'Cold extracted mineral water, finely carbonated with blood orange spheres.', image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=800&q=80' },
    { id: 21, name: 'House Old Fashioned', price: 18, desc: 'Artisanal bourbon, truffle bitters, flaming brown sugar and a massive ice cube.', image: 'https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&w=800&q=80' },
    { id: 22, name: 'Elderflower Elixir', price: 12, desc: 'Alcohol-free cold infusion of elderflowers, fresh cucumber and golden mint leaves.', image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=800&q=80' },
  ],
  wines: [
    { id: 9, name: 'Château Margaux 2015', price: 850, desc: 'Premier Grand Cru Classé. Astonishing complexity with notes of cassis and truffle.', image: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=800&q=80' },
    { id: 10, name: 'Napa Valley Reserve', price: 320, desc: 'Elegant Cabernet Sauvignon, robust body with a toasted oak and vanilla finish.', image: 'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?auto=format&fit=crop&w=800&q=80' },
    { id: 13, name: 'Barolo DOCG 2018', price: 280, desc: 'Full-bodied Italian red, aromas of dried rose, tar and ripe red fruits.', image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80' },
    { id: 14, name: 'Dom Pérignon Vintage 2012', price: 450, desc: 'Exceptional Champagne, bright and precise with a creamy mousse and lingering finish.', image: 'https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?auto=format&fit=crop&w=800&q=80' },
    { id: 23, name: 'Brunello di Montalcino', price: 210, desc: 'Perfect balance of acidity, structured tannins and unparalleled underbrush aromas.', image: 'https://images.unsplash.com/photo-1516594915697-87eb3b1c14ea?auto=format&fit=crop&w=800&q=80' },
    { id: 24, name: 'La Rioja Alta Gran Reserva', price: 180, desc: 'Pure elegance of Spanish tempranillo, notes of aged barrel wood and dried fruits.', image: 'https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?auto=format&fit=crop&w=800&q=80' },
  ],
};

app.get('/api/menu', (req: Request, res: Response) => {
  const lang = req.query.lang;
  if (lang === 'en') {
    res.json(menuEn);
  } else {
    res.json(menuEs);
  }
});

app.post('/api/reserve', (req: Request, res: Response) => {
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

console.log('__dirname:', __dirname);
console.log('frontendPath:', frontendPath);

// Fallback for SPA routing - should be after other routes
app.use((req: Request, res: Response) => {
  console.log('Serving SPA fallback for:', req.url);
  res.sendFile(path.join(frontendPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Servidor completo corriendo en http://localhost:${PORT}`);
});
