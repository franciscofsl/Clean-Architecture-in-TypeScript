export class Result<T = void> {
    private constructor(
        public readonly isSuccess: boolean,
        public readonly error?: string,
        public readonly value?: T
    ) { }

    static ok<U = void>(value?: U): Result<U> {
        return new Result<U>(true, undefined, value);
    }

    static fail<U = void>(error: string): Result<U> {
        return new Result<U>(false, error);
    }

    get isFailure(): boolean {
        return !this.isSuccess;
    }

    getValue(): T {
        if (this.isFailure) {
            throw new Error(`Cannot get value from failed result: ${this.error}`);
        }
        return this.value as T;
    }

    getError(): string {
        if (this.isSuccess) {
            throw new Error("Cannot get error from successful result");
        }
        return this.error as string;
    }
}