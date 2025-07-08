import { Pirate } from '../../domain/pirates/Pirate';
import { IPirateRepository } from '../../domain/pirates/IPirateRepository';

export class GetAllPirates {
  constructor(private pirateRepository: IPirateRepository) {}

  async execute(): Promise<Pirate[]> {
    return await this.pirateRepository.getAll();
  }
}
