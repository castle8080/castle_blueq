"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Container = void 0;
class BaseEntry {
    constructor(name) {
        this.name = name;
    }
    getObject(c) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.get(c);
        });
    }
}
class SingletonEntry extends BaseEntry {
    constructor(name, factory) {
        super(name);
        this.factory = factory;
        this.value = null;
        this.initialized = false;
    }
    get(c) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.initialized) {
                this.value = yield this.factory(c);
            }
            return this.value;
        });
    }
}
class FactoryEntry extends BaseEntry {
    constructor(name, factory) {
        super(name);
        this.factory = factory;
    }
    get(c) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.factory(c);
        });
    }
}
class ObjectEntry extends BaseEntry {
    constructor(name, obj) {
        super(name);
        this.value = obj;
    }
    get(c) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.value;
        });
    }
}
class Container {
    constructor() {
        this.entries = new Map();
    }
}
exports.Container = Container;
