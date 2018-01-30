"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SingletonErrorFactory_1 = require("../utils/SingletonErrorFactory");
class TargetContextBuilder {
    constructor() {
        if (TargetContextBuilder._locked || TargetContextBuilder.INSTANCE) {
            new SingletonErrorFactory_1.SingletonErrorFactory().throw(TargetContextBuilder);
        }
        TargetContextBuilder._locked = true;
    }
    static getInstance() {
        if (TargetContextBuilder.INSTANCE === null) {
            TargetContextBuilder._locked = false;
            TargetContextBuilder.INSTANCE = new TargetContextBuilder();
        }
        return TargetContextBuilder.INSTANCE;
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
TargetContextBuilder._locked = true;
TargetContextBuilder.INSTANCE = null;
exports.TargetContextBuilder = TargetContextBuilder;
