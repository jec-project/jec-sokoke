"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const InjectionPointBuilder_1 = require("../../builders/InjectionPointBuilder");
class InjectPropertyDecorator {
    constructor() { }
    decorate(target, key, params) {
        console.log("InjectPropertyDecorator");
        console.log(target);
        console.log(key);
        console.log(params);
        let injectPoint = InjectionPointBuilder_1.InjectionPointBuilder.getInstance()
            .clear()
            .bean(null)
            .type(params.type)
            .element(null)
            .build();
        console.log(injectPoint);
        console.log("---------------------------------");
        return target;
    }
}
exports.InjectPropertyDecorator = InjectPropertyDecorator;
