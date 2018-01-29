"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jec_commons_1 = require("jec-commons");
const Sokoke_1 = require("../../inject/Sokoke");
const SokokeLoggerProxy_1 = require("../../logging/SokokeLoggerProxy");
const SokokeLocaleManager_1 = require("../../i18n/SokokeLocaleManager");
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
        injection = sokoke.getInjectableReference(injectPoint);
        Object.defineProperty(target, key, { value: injection });
        if (SokokeLoggerProxy_1.SokokeLoggerProxy.getInstance()
            .getLogger()
            .getLogLevel() <= jec_commons_1.LogLevel.DEBUG) {
            SokokeLoggerProxy_1.SokokeLoggerProxy.getInstance().log(SokokeLocaleManager_1.SokokeLocaleManager.getInstance().get("bean.injected.field", target.constructor.name, key, injection.constructor.name), jec_commons_1.LogLevel.DEBUG);
        }
        return target;
    }
}
exports.InjectFieldDecorator = InjectFieldDecorator;
