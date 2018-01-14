"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class InjectParameterDecorator {
    constructor() { }
    decorate(target, propertyKey, parameterIndex, params) {
        console.log("InjectParameterDecorator");
        console.log(target);
        console.log(propertyKey);
        console.log(parameterIndex);
        console.log(params);
        console.log("---------------------------------");
        return target;
    }
}
exports.InjectParameterDecorator = InjectParameterDecorator;
