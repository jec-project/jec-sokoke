"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SokokeContextImpl_1 = require("../core/SokokeContextImpl");
const SingletonErrorFactory_1 = require("../utils/SingletonErrorFactory");
class SokokeContextBuilder {
    constructor() {
        if (SokokeContextBuilder._locked || SokokeContextBuilder.INSTANCE) {
            new SingletonErrorFactory_1.SingletonErrorFactory().throw(SokokeContextBuilder);
        }
        SokokeContextBuilder._locked = true;
    }
    static getInstance() {
        if (SokokeContextBuilder.INSTANCE === null) {
            SokokeContextBuilder._locked = false;
            SokokeContextBuilder.INSTANCE = new SokokeContextBuilder();
        }
        return SokokeContextBuilder.INSTANCE;
    }
    build(domainPath, locale) {
        let context = new SokokeContextImpl_1.SokokeContextImpl(domainPath, locale);
        return context;
    }
}
SokokeContextBuilder._locked = true;
SokokeContextBuilder.INSTANCE = null;
exports.SokokeContextBuilder = SokokeContextBuilder;
