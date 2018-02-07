"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SingletonErrorFactory_1 = require("../utils/SingletonErrorFactory");
const SokokeMetadataRefs_1 = require("./SokokeMetadataRefs");
class SokokeMetadataInjector {
    constructor() {
        if (SokokeMetadataInjector._locked || SokokeMetadataInjector.INSTANCE) {
            new SingletonErrorFactory_1.SingletonErrorFactory().throw(SokokeMetadataInjector);
        }
        SokokeMetadataInjector._locked = true;
    }
    static getInstance() {
        if (SokokeMetadataInjector.INSTANCE === null) {
            SokokeMetadataInjector._locked = false;
            SokokeMetadataInjector.INSTANCE = new SokokeMetadataInjector();
        }
        return SokokeMetadataInjector.INSTANCE;
    }
    inject(bean, context) {
        Object.defineProperty(bean, SokokeMetadataRefs_1.SokokeMetadataRefs.SOKOKE_METADATA, {
            value: context,
            writable: false,
            configurable: false,
            enumerable: false
        });
    }
}
SokokeMetadataInjector._locked = true;
SokokeMetadataInjector.INSTANCE = null;
exports.SokokeMetadataInjector = SokokeMetadataInjector;
