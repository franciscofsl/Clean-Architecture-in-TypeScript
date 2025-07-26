import { Pirate } from '../../domain/pirates/Pirate';
import { IPirateRepository } from '../../domain/pirates/IPirateRepository';
import { Result } from '../Result';

export class CreatePirate {
  constructor(private pirateRepository: IPirateRepository) { }

  async execute(name: string): Promise<Result> {
    if (!name || name.length === 0) {
      return Result.fail('Name is required');
    }
    const pirate = new Pirate(name);
    await this.pirateRepository.save(pirate);
    return Result.ok();
  }
}
