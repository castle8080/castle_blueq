/**
 * A basic dependency injection container for TypeScript.
 */
type ContainerFactory<T> = (c: Container) => T;
type ContainerAsyncFactory<T> = (c: Container) => Promise<T>;

interface GenericContainerEntry {
    name: string;
    tags: string[];
    container: Container;
    getObject(): Promise<any>;
}

interface ContainerEntry<T> extends GenericContainerEntry {
    get(): Promise<T>;
}

abstract class BaseEntry<T> implements ContainerEntry<T> {
    public container: Container;
    public name: string;
    public tags: string[];

    constructor(c: Container, name: string, tags: string[]) {
        this.container = c;
        this.name = name;
        this.tags = tags;
    }

    public async getObject(): Promise<any> {
        return this.get();
    }

    public abstract get(): Promise<T>;
}

class SingletonEntry<T> extends BaseEntry<T> {
    public factory: ContainerAsyncFactory<T>;
    public value: T | null;
    public initialized: boolean;

    constructor(c: Container, name: string, factory: ContainerAsyncFactory<T>, tags: string[]) {
        super(c, name, tags);
        this.factory = factory;
        this.value = null; 
        this.initialized = false;
    }

    public async get(): Promise<T> {
        if (!this.initialized) {
            this.value = await this.factory(this.container);
        }
        return (this.value as unknown) as T;
    }
}

class FactoryEntry<T> extends BaseEntry<T> {
    public factory: ContainerAsyncFactory<T>;

    constructor(c: Container, name: string, factory: ContainerAsyncFactory<T>, tags: string[]) {
        super(c, name, tags);
        this.factory = factory;
    }
    
    public async get(): Promise<T> {
        return await this.factory(this.container);
    }
}

class ObjectEntry<T> extends BaseEntry<T> {
    public value: T;

    constructor(c: Container, name: string, obj: T, tags: string[]) {
        super(c, name, tags);
        this.value = obj;
    }

    public async get(): Promise<T> {
        return await this.value;
    }
}

export class ContainerKey<T> {
    public constructor(public name: string) {
    }

    public static keyof<T>(k: string | ContainerKey<T>) {
        return (k instanceof ContainerKey)
            ? (k as ContainerKey<T>)
            : new ContainerKey<T>(k);
    }

    public static nameof<T>(k: string|ContainerKey<T>): string {
        return (k instanceof ContainerKey)
            ? (k as ContainerKey<T>).name
            : k;
    }
}

export class Container {
    public entries = new Map<string, GenericContainerEntry>();

    public searchEntries<T>(tag: string): ContainerEntry<T>[] {
        var entries: ContainerEntry<T>[] = [];
        for (let e of this.entries.values()) {
            if (e.tags.indexOf(tag) >= 0) {
                entries.push(e as ContainerEntry<T>);
            }
        }
        return entries;
    }

    public getByTag<T>(tag: string): Promise<Array<T>> {
        let promises: Array<Promise<T>> = [];
        for (let e of this.searchEntries<T>(tag)) {
            promises.push(e.get());
        }
        return Promise.all(promises);
    }

    public get<T>(key: string|ContainerKey<T>): Promise<T> {
        var e = this.entry<T>(key);
        if (e === undefined) {
            throw new Error(`No entry found for ${ContainerKey.nameof<T>(key)}.`);
        }
        else {
            return e.get();
        }
    }

    public entry<T>(key: string|ContainerKey<T>): ContainerEntry<T>|undefined {
        var e = this.entries.get(ContainerKey.nameof<T>(key));
        if (e === undefined) {
            return undefined;
        }
        else {
            return e as ContainerEntry<T>
        }
    }

    public object<T>(key: string|ContainerKey<T>, obj: T, ...tags: string[]): ContainerKey<T> {
        return this.register(new ObjectEntry<T>(this, ContainerKey.nameof<T>(key), obj, tags));
    }

    public factory_sync<T>(key: string|ContainerKey<T>, factory: ContainerFactory<T>, ...tags: string[]): ContainerKey<T> {
        return this.register(new FactoryEntry(this, ContainerKey.nameof<T>(key), async (c) => factory(c), tags));
    }

    public factory<T>(key: string|ContainerKey<T>, factory: ContainerAsyncFactory<T>, ...tags: string[]): ContainerKey<T> {
        return this.register(new FactoryEntry(this, ContainerKey.nameof<T>(key), factory, tags));
    }

    public singleton_sync<T>(key: string|ContainerKey<T>, factory: ContainerFactory<T>, ...tags: string[]): ContainerKey<T> {
        return this.register(new SingletonEntry(this, ContainerKey.nameof<T>(key), async (c) => factory(c), tags));
    }

    public singleton<T>(key: string|ContainerKey<T>, factory: ContainerAsyncFactory<T>, ...tags: string[]): ContainerKey<T> {
        return this.register(new SingletonEntry(this, ContainerKey.nameof<T>(key), factory, tags));
    }

    private register<T>(entry: ContainerEntry<T>): ContainerKey<T> {
        this.entries.set(entry.name, entry);
        return new ContainerKey<T>(entry.name);
    }
}