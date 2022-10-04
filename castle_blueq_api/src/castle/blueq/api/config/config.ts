
import { read } from 'fs';
import fs from 'fs/promises';
import _ from 'lodash';

/**
 * Private utility to read json file returned as map.
 */
async function readJsonConfig(jsonPath: string): Promise<Map<string, object>> {
    let r = await fs.readFile(jsonPath);
    let configObject: object = JSON.parse(r.toString("utf-8"));

    let config = new Map<string, object>();
    Object.entries(configObject).forEach(([k, v]) => {
        config.set(k, v);
    });

    return config;
}

/**
 * Represents a source of secrets.
 */
export interface SecretSource {
    type: string;
    getSecrets(): Promise<Map<string, object>>;
}

/**
 * Secrets which came from a file.
 */
export class FileSecretSource implements SecretSource {
    type: string = "file";
    file: string;

    constructor(file: string) {
        this.file = file;
    }

    async getSecrets(): Promise<Map<string, object>> {
        return readJsonConfig(this.file);
    }
}

/**
 * Construct secret sources from a objects.
 */
export class SecretSourceFactory {
    static TYPE_PROTOTYPES = new Map<string, object>([
        ["file", FileSecretSource.prototype]
    ]);

    static fromObject(obj: object): SecretSource {
        // Look up the prototype to use based on the secret type.
        let sourceType: string = (obj as any)["type"];
        let proto = SecretSourceFactory.TYPE_PROTOTYPES.get(sourceType);
        if (proto === undefined) {
            throw new Error(`Could not find handler for type ${sourceType}`);
        }
        else {
            // Creates a shallow copy of the object and assigns the prototype.
            // This bypasses a constructor. I don't know if this a common practice,
            // but it seems no worse to me then casting to an interface???
            return Object.setPrototypeOf(Object.assign({}, obj), proto) as SecretSource;
        }
    }
}

/**
 * How to get configuration data.
 */
export class Config {

    private config = new Map<string, object>();

    constructor() {
    }

    tryGet(key: string): object|undefined {
        return this.config.get(key);
    }

    get(key: string): object {
        let o = this.tryGet(key);
        if (o === undefined) {
            throw new Error(`No configuration exists for: ${key}`);
        }
        return o;
    }

    getString(key: string): string {
        return String(this.get(key));
    }

    async loadFromJSON(jsonFilePath: string): Promise<void> {
        let config = await readJsonConfig(jsonFilePath);
        config.forEach((v, k) => this.config.set(k, v));
    }

    async loadSecrets(): Promise<void> {
        let allSecrets = await Promise.all(_.map(this.getSecretSources(), ss => {
            return ss.getSecrets();
        }));
        allSecrets.forEach(secrets => {
            secrets.forEach((v, k) => {
                this.config.set(k, v);
            });
        });
    }

    getSecretSources(): SecretSource[] {
        let secretSources = this.config.get("secretSources");
        if (secretSources === undefined || secretSources === null) {
            secretSources = [];
        }
        return _.map(secretSources, SecretSourceFactory.fromObject);
    }

    static getEnvironmentName(): string {
        return process.env.NODE_ENV !== undefined
            ? String(process.env.NODE_ENV)
            : "development";
    }

    static async load(environment: string|undefined = undefined): Promise<Config> {
        if (environment === undefined) {
            environment = Config.getEnvironmentName();
        }
        let config = new Config();
        await config.loadFromJSON(`config/${environment}.json`);
        await config.loadSecrets();

        return config;
    }
}
