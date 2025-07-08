// src/web/pirates/PirateController.ts
import express from 'express';
import { InMemoryPirateRepository } from '../../infrastructure/pirates/PirateRepository';
import { CreatePirate } from '../../application/pirates/CreatePirate';
import { GetAllPirates } from '../../application/pirates/GetAllPirates';

const router = express.Router();
const pirateRepository = new InMemoryPirateRepository();
const recruitPirate = new CreatePirate(pirateRepository);
const getAllPirates = new GetAllPirates(pirateRepository);

router.get('/pirates', async (req, res) => {
  try {
    const pirates = await getAllPirates.execute();
    res.status(200).json(pirates);
  } catch (err: any) {
    res.status(500).send({ error: err.message });
  }
});

router.post('/pirates', async (req, res) => {
  const { name } = req.body;

  try {
    await recruitPirate.execute(name);
    res.status(201).send({ message: `${name} has been recruited to the crew!` });
  } catch (err: any) {
    res.status(400).send({ error: err.message });
  }
});

export default router;
