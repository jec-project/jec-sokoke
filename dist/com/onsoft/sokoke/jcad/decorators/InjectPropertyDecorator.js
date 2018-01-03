"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class InjectPropertyDecorator {
    constructor() { }
    decorate(target, key, params) {
        console.log("InjectPropertyDecorator");
        console.log(target);
        console.log(key);
        return target;
    }
}
exports.InjectPropertyDecorator = InjectPropertyDecorator;
