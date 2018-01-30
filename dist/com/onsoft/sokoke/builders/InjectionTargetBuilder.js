"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SingletonErrorFactory_1 = require("../utils/SingletonErrorFactory");
class InjectionTargetBuilder {
    constructor() {
        if (InjectionTargetBuilder._locked || InjectionTargetBuilder.INSTANCE) {
            new SingletonErrorFactory_1.SingletonErrorFactory().throw(InjectionTargetBuilder);
        }
        InjectionTargetBuilder._locked = true;
    }
    static getInstance() {
        if (InjectionTargetBuilder.INSTANCE === null) {
            InjectionTargetBuilder._locked = false;
            InjectionTargetBuilder.INSTANCE = new InjectionTargetBuilder();
        }
        return InjectionTargetBuilder.INSTANCE;
    }
    build(target, key, decoratedType, parameterIndex = -1) {
        let context = {
            target: target,
            key: key,
            parameterIndex: parameterIndex,
            decoratedType: decoratedType
        };
        return context;
    }
}
InjectionTargetBuilder._locked = true;
InjectionTargetBuilder.INSTANCE = null;
exports.InjectionTargetBuilder = InjectionTargetBuilder;
