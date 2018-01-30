"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jec_commons_1 = require("jec-commons");
const jec_jdi_1 = require("jec-jdi");
const Sokoke_1 = require("../inject/Sokoke");
const SokokeLoggerProxy_1 = require("../logging/SokokeLoggerProxy");
const SingletonErrorFactory_1 = require("../utils/SingletonErrorFactory");
const SokokeLocaleManager_1 = require("../i18n/SokokeLocaleManager");
class SokokeInjector {
    constructor() {
        if (SokokeInjector._locked || SokokeInjector.INSTANCE) {
            new SingletonErrorFactory_1.SingletonErrorFactory().throw(SokokeInjector);
        }
        SokokeInjector._locked = true;
    }
    static getInstance() {
        if (SokokeInjector.INSTANCE === null) {
            SokokeInjector._locked = false;
            SokokeInjector.INSTANCE = new SokokeInjector();
        }
        return SokokeInjector.INSTANCE;
    }
    injectField(target, key) {
        let classPath = jec_commons_1.ClassLoaderContext.getInstance().getPath();
        let sokoke = Sokoke_1.Sokoke.getInstance();
        let context = sokoke.getContextByPath(classPath);
        let injectPoint = null;
        let injection = null;
        sokoke.setCurrentContext(context);
        injectPoint = sokoke.resolveInjectionPoint(classPath, key);
        injection = sokoke.getInjectableReference(injectPoint);
        Object.defineProperty(target, key, { value: injection });
        if (sokoke.isDebugMode()) {
            SokokeLoggerProxy_1.SokokeLoggerProxy.getInstance().log(SokokeLocaleManager_1.SokokeLocaleManager.getInstance().get("bean.injected.field", target.constructor.name, key, injection.constructor.name), jec_commons_1.LogLevel.DEBUG);
        }
    }
    inject(context) {
        let decoratedType = context.decoratedType;
        if (decoratedType === jec_jdi_1.DecoratedType.FIELD) {
            this.injectField(context.target, String(context.key));
        }
        else if (decoratedType === jec_jdi_1.DecoratedType.PARAMETER) {
        }
    }
    dispose(context) {
    }
}
SokokeInjector.INSTANCE = null;
SokokeInjector._locked = true;
exports.SokokeInjector = SokokeInjector;
