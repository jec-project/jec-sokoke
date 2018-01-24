"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jec_commons_1 = require("jec-commons");
class InjectPropertyDecorator {
    constructor() { }
    decorate(target, key, params) {
        console.log("InjectPropertyDecorator");
        console.log(target.constructor);
        console.log(key);
        console.log(params);
        console.log(jec_commons_1.ClassLoaderContext.getInstance().getPath());
        console.log("---------------------------------");
        return target;
    }
}
exports.InjectPropertyDecorator = InjectPropertyDecorator;
