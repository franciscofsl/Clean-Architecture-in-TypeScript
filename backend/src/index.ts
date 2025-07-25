// src/index.ts
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pirateRoutes from './api/pirates/PiratesController';

// Cargar variables de entorno
dotenv.config();

const app = express();

// Configurar CORS usando variables de entorno
const corsOrigins = process.env.CORS_ORIGINS?.split(',').map(origin => origin.trim()) || ['http://localhost:5173'];
const corsMethods = process.env.CORS_METHODS?.split(',').map(method => method.trim()) || ['GET', 'POST', 'PUT', 'DELETE'];
const corsAllowedHeaders = process.env.CORS_ALLOWED_HEADERS?.split(',').map(header => header.trim()) || ['Content-Type', 'Authorization'];
const corsCredentials = process.env.CORS_CREDENTIALS === 'true';

app.use(cors({
  origin: corsOrigins,
  methods: corsMethods,
  allowedHeaders: corsAllowedHeaders,
  credentials: corsCredentials
}));

app.use(express.json());
app.use(pirateRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`⚓ Server running on http://localhost:${port}`));
