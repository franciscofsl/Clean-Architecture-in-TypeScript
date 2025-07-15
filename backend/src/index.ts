// src/index.ts
import express from 'express';
import cors from 'cors';
import pirateRoutes from './api/pirates/PiratesController';

const app = express();

// Configurar CORS para permitir peticiones desde el frontend
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(express.json());
app.use(pirateRoutes);

app.listen(3000, () => console.log('⚓ Server running on http://localhost:3000'));
