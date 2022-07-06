
interface GenericContainerEntry {
    name: string;
    getObject(c: Container): Promise<any>;
}

interface ContainerEntry<T> extends GenericContainerEntry {
    get(c: Container): Promise<T>;
}

abstract class BaseEntry<T> implements ContainerEntry<T> {
    public name: string;

    constructor(name: string) {
        this.name = name;
    }

    public async getObject(c: Container): Promise<any> {
        return this.get(c);
    }

    public abstract get(c: Container): Promise<T>;
}

class SingletonEntry<T> extends BaseEntry<T> {
    public factory: (c: Container) => Promise<T>;
    public value: T | null;
    public initialized: boolean;

    constructor(name: string, factory: (c: Container) => Promise<T>) {
        super(name);
        this.factory = factory;
        this.value = null;
        this.initialized = false;
    }

    public async get(c: Container): Promise<T> {
        if (!this.initialized) {
            this.value = await this.factory(c);
        }
        return (this.value as unknown) as T;
    }
}

class FactoryEntry<T> extends BaseEntry<T> {
    public factory: (c: Container) => Promise<T>;

    constructor(name: string, factory: (c: Container) => Promise<T>) {
        super(name);
        this.factory = factory;
    }
    
    public async get(c: Container): Promise<T> {
        return await this.factory(c);
    }
}

class ObjectEntry<T> extends BaseEntry<T> {
    public value: T;

    constructor(name: string, obj: T) {
        super(name);
        this.value = obj;
    }

    public async get(c: Container): Promise<T> {
        return await this.value;
    }
}

export class Container {
    private entries: Map<string, GenericContainerEntry> = new Map();

    

}

