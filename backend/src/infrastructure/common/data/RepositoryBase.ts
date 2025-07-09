import { IRepository } from "../../../domain/common/IRepository";

export abstract class RepositoryBase<T> implements IRepository<T> {
    protected items: T[] = [];

    async getAll(): Promise<T[]> {
        return [...this.items];
    }

    async save(item: T): Promise<void> {
        this.items.push(item);
    }

    async clear(): Promise<void> {
        this.items = [];
    }
}