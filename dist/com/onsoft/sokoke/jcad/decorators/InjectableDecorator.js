"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class InjectableDecorator {
    constructor() { }
    decorate(target, params) {
        console.log("InjectableDecorator");
        console.log(target);
        return target;
    }
}
exports.InjectableDecorator = InjectableDecorator;
