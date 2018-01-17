"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jec_commons_1 = require("jec-commons");
const InjectionPointBuilder_1 = require("../../builders/InjectionPointBuilder");
class InjectPropertyDecorator {
    constructor() { }
    decorate(target, key, params) {
        console.log("InjectPropertyDecorator");
        console.log(target);
        console.log(key);
        console.log(params);
        let bean = null;
        let element = new jec_commons_1.Field(key, target.constructor);
        let injectPoint = InjectionPointBuilder_1.InjectionPointBuilder.getInstance()
            .clear()
            .bean(bean)
            .type(params.type)
            .element(element)
            .build();
        console.log(injectPoint);
        console.log("---------------------------------");
        return target;
    }
}
exports.InjectPropertyDecorator = InjectPropertyDecorator;
