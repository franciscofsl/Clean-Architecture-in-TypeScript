import { Pirate } from './Pirate';

export interface IPirateRepository {
  getAll(): Promise<Pirate[]>;
  save(pirate: Pirate): Promise<void>;
}
