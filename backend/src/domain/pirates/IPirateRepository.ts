import { Pirate } from './Pirate';

export interface PirateRepository {
  getAll(): Promise<Pirate[]>;
  save(pirate: Pirate): Promise<void>;
}
