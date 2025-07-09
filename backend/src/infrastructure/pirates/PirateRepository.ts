import { IPirateRepository } from '../../domain/pirates/IPirateRepository';
import { Pirate } from '../../domain/pirates/Pirate';
import { RepositoryBase } from '../common/data/RepositoryBase';

export class InMemoryPirateRepository extends RepositoryBase<Pirate> implements IPirateRepository {

}
