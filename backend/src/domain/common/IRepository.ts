export interface IRepository<T> {
    getAll(): Promise<T[]>;
    save(pirate: T): Promise<void>;
}