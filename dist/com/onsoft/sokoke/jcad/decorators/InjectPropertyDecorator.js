"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jec_commons_1 = require("jec-commons");
const Sokoke_1 = require("../../inject/Sokoke");
class InjectPropertyDecorator {
    constructor() { }
    decorate(target, key, params) {
        let classPath = jec_commons_1.ClassLoaderContext.getInstance().getPath();
        let sokoke = Sokoke_1.Sokoke.getInstance();
        let context = sokoke.getContextByPath(classPath);
        let injectPoint = null;
        sokoke.setCurrentContext(context);
        injectPoint = sokoke.resolveInjectionPoint(classPath, key);
        console.log("---------------------------------");
        return target;
    }
}
exports.InjectPropertyDecorator = InjectPropertyDecorator;
