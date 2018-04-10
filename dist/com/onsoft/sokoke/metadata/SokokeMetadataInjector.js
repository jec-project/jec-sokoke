"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SingletonErrorFactory_1 = require("../utils/SingletonErrorFactory");
const SokokeMetadataRefs_1 = require("./SokokeMetadataRefs");
const Sokoke_1 = require("../inject/Sokoke");
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
    injectContext(bean, context) {
        Object.defineProperty(bean, SokokeMetadataRefs_1.SokokeMetadataRefs.SOKOKE_CONTEXT_METADATA, {
            value: context,
            writable: false,
            configurable: false,
            enumerable: false
        });
    }
    injectInjectionPoint(target, injectionPoint) {
        const sokoke = Sokoke_1.Sokoke.getInstance();
        const hasMetadata = Reflect.has(target, SokokeMetadataRefs_1.SokokeMetadataRefs.SOKOKE_INJECTION_POINT_METADATA);
        let injectionPoints = null;
        if (!hasMetadata) {
            Reflect.defineProperty(target, SokokeMetadataRefs_1.SokokeMetadataRefs.SOKOKE_INJECTION_POINT_METADATA, {
                value: new Array(),
                configurable: false,
                enumerable: false,
                writable: false
            });
        }
        injectionPoints =
            target[SokokeMetadataRefs_1.SokokeMetadataRefs.SOKOKE_INJECTION_POINT_METADATA];
        injectionPoints.push(injectionPoint);
    }
}
SokokeMetadataInjector._locked = true;
SokokeMetadataInjector.INSTANCE = null;
exports.SokokeMetadataInjector = SokokeMetadataInjector;
