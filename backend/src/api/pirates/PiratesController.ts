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
  const pirates = await getAllPirates.execute();
  try {
    res.status(200).json(pirates);
  } catch (err: any) {
    res.status(500).send(pirates);
  }
});

router.post('/pirates', async (req, res) => {
  const { name } = req.body;

  const result = await recruitPirate.execute(name);
  if (result.isSuccess) {
    res.status(201).send( result );
  } else {
    res.status(400).send( result );
  }
});

export default router;
