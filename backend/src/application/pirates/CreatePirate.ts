import { Pirate } from '../../domain/pirates/Pirate';
import { IPirateRepository } from '../../domain/pirates/IPirateRepository';

export class CreatePirate {
  constructor(private pirateRepository: IPirateRepository) {}

  async execute(name: string): Promise<void> {
    const pirate = new Pirate(name);
    await this.pirateRepository.save(pirate);
  }
}
