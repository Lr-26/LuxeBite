import type { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, date, time, guests, email } = req.body;

  if (!name || !date || !time || !guests) {
    return res.status(400).json({ error: 'Faltan campos obligatorios' });
  }

  // Confirmación exitosa para el cliente
  return res.status(201).json({ 
    message: 'Reserva confirmada con éxito',
    reservation: { name, date, time, guests } 
  });
}
