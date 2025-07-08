// src/index.ts
import express from 'express';
import pirateRoutes from './api/pirates/PiratesController';

const app = express();
app.use(express.json());
app.use(pirateRoutes);

app.listen(3000, () => console.log('⚓ Server running on http://localhost:3000'));
