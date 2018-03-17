"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SingletonErrorFactory_1 = require("./SingletonErrorFactory");
class HashCodeBuilder {
    constructor() {
        if (HashCodeBuilder._locked || HashCodeBuilder.INSTANCE) {
            new SingletonErrorFactory_1.SingletonErrorFactory().throw(HashCodeBuilder);
        }
        HashCodeBuilder._locked = true;
    }
    static getInstance() {
        if (HashCodeBuilder.INSTANCE === null) {
            HashCodeBuilder._locked = false;
            HashCodeBuilder.INSTANCE = new HashCodeBuilder();
        }
        return HashCodeBuilder.INSTANCE;
    }
    build(...values) {
        const value = values.join();
        let hash = 0;
        let char = null;
        let len = value.length;
        while (len--) {
            char = value.charCodeAt(len);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        return hash;
    }
}
HashCodeBuilder._locked = true;
HashCodeBuilder.INSTANCE = null;
exports.HashCodeBuilder = HashCodeBuilder;
