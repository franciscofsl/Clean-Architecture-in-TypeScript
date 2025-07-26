import { Pirate } from '../../domain/pirates/Pirate';
import { IPirateRepository } from '../../domain/pirates/IPirateRepository';
import { Result } from '../Result';

export class GetAllPirates {
  constructor(private pirateRepository: IPirateRepository) { }

  async execute(): Promise<Result<Pirate[]>> {
    return this.pirateRepository
    .getAll()
    .then((pirates) => Result.ok(pirates));
  }
}
