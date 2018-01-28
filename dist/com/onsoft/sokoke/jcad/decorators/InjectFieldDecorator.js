"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jec_commons_1 = require("jec-commons");
const Sokoke_1 = require("../../inject/Sokoke");
class InjectFieldDecorator {
    constructor() { }
    decorate(target, key, params) {
        let classPath = jec_commons_1.ClassLoaderContext.getInstance().getPath();
        let sokoke = Sokoke_1.Sokoke.getInstance();
        let context = sokoke.getContextByPath(classPath);
        let injectPoint = null;
        let injection = null;
        sokoke.setCurrentContext(context);
        injectPoint = sokoke.resolveInjectionPoint(classPath, key);
        injection = sokoke.getInjectableReference(params, injectPoint);
        Object.defineProperty(target, key, { value: injection });
        return target;
    }
}
exports.InjectFieldDecorator = InjectFieldDecorator;
