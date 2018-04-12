"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SingletonErrorFactory_1 = require("../utils/SingletonErrorFactory");
const Sokoke_1 = require("../inject/Sokoke");
const jec_jdi_1 = require("jec-jdi");
const SokokeMetadataRefs_1 = require("../metadata/SokokeMetadataRefs");
class SokokeInjector {
    constructor() {
        if (SokokeInjector._locked || SokokeInjector.INSTANCE) {
            new SingletonErrorFactory_1.SingletonErrorFactory().throw(SokokeInjector);
        }
        SokokeInjector._locked = true;
    }
    static getInstance() {
        if (SokokeInjector.INSTANCE === null) {
            SokokeInjector._locked = false;
            SokokeInjector.INSTANCE = new SokokeInjector();
        }
        return SokokeInjector.INSTANCE;
    }
    inject(target, scopeTypes) {
        const sokoke = Sokoke_1.Sokoke.getInstance();
        const injectionPoints = target[SokokeMetadataRefs_1.SokokeMetadataRefs.SOKOKE_INJECTION_POINT_METADATA];
        let len = -1;
        let injectionPoint = null;
        let value = null;
        let bean = null;
        let scopeType = null;
        let scope = null;
        if (injectionPoints) {
            len = injectionPoints.length;
            while (len--) {
                injectionPoint = injectionPoints[len];
                bean = injectionPoint.getBean();
                if (bean) {
                    scope = bean.getScope();
                    scopeType = scope ? scope.getType() : jec_jdi_1.ScopeType.DEPENDENT;
                    if (scopeTypes.indexOf(scopeType) !== -1) {
                        value = sokoke.getInjectableReference(bean);
                        Reflect.defineProperty(target, injectionPoint.getElement().getName(), { value: value });
                    }
                }
            }
        }
    }
    dispose(target, scopeTypes) { }
}
SokokeInjector.INSTANCE = null;
SokokeInjector._locked = true;
SokokeInjector.DEFAULT_SCOPE_TYPES = [
    jec_jdi_1.ScopeType.APPLICATION, jec_jdi_1.ScopeType.DEPENDENT
];
exports.SokokeInjector = SokokeInjector;
