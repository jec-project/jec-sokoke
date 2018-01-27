"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jec_commons_1 = require("jec-commons");
const HashCodeBuilder_1 = require("../../utils/HashCodeBuilder");
const Sokoke_1 = require("../../inject/Sokoke");
class InjectPropertyDecorator {
    constructor() { }
    decorate(target, key, params) {
        let beanManager = null;
        let classPath = jec_commons_1.ClassLoaderContext.getInstance().getPath();
        let hash = HashCodeBuilder_1.HashCodeBuilder.getInstance().build(classPath, key);
        let sokoke = Sokoke_1.Sokoke.getInstance();
        let context = sokoke.getContextByPath(classPath);
        sokoke.setCurrentContext(context);
        beanManager = sokoke.getBeanManager();
        console.log("InjectPropertyDecorator");
        console.log(target.constructor);
        console.log(key);
        console.log(params);
        console.log(hash);
        console.log(context);
        console.log("---------------------------------");
        return target;
    }
}
exports.InjectPropertyDecorator = InjectPropertyDecorator;
