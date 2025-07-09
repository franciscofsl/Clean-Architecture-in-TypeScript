import { IRepository } from '../common/IRepository';
import { Pirate } from './Pirate';

export interface IPirateRepository extends IRepository<Pirate> {
  getAll(): Promise<Pirate[]>;
  save(pirate: Pirate): Promise<void>;
}
