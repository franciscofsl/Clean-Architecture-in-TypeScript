import { IPirateRepository } from '../../domain/pirates/IPirateRepository';
import { Pirate } from '../../domain/pirates/Pirate';

export class InMemoryPirateRepository implements IPirateRepository {
    private pirates: Pirate[] = [];

    async getAll(): Promise<Pirate[]> {
        return [...this.pirates];
    }

    async save(pirate: Pirate): Promise<void> {
        this.pirates.push(pirate);
    }
}
