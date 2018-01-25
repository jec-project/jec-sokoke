"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jec_commons_1 = require("jec-commons");
const HashCodeBuilder_1 = require("../../utils/HashCodeBuilder");
const ClassNameBuilder_1 = require("../../utils/ClassNameBuilder");
class InjectPropertyDecorator {
    constructor() { }
    decorate(target, key, params) {
        let classPath = ClassNameBuilder_1.ClassNameBuilder.getInstance().build(jec_commons_1.ClassLoaderContext.getInstance().getPath());
        let hash = HashCodeBuilder_1.HashCodeBuilder.getInstance().build(classPath, key);
        console.log("InjectPropertyDecorator");
        console.log(target.constructor);
        console.log(key);
        console.log(params);
        console.log(hash);
        console.log("---------------------------------");
        return target;
    }
}
exports.InjectPropertyDecorator = InjectPropertyDecorator;
