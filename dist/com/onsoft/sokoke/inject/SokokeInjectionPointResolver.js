"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jec_commons_1 = require("jec-commons");
const jec_jdi_1 = require("jec-jdi");
const Sokoke_1 = require("../inject/Sokoke");
const SokokeLoggerProxy_1 = require("../logging/SokokeLoggerProxy");
const SingletonErrorFactory_1 = require("../utils/SingletonErrorFactory");
const SokokeLocaleManager_1 = require("../i18n/SokokeLocaleManager");
const SokokeMetadataInjector_1 = require("../metadata/SokokeMetadataInjector");
class SokokeInjectionPointResolver {
    constructor() {
        if (SokokeInjectionPointResolver._locked ||
            SokokeInjectionPointResolver.INSTANCE) {
            new SingletonErrorFactory_1.SingletonErrorFactory().throw(SokokeInjectionPointResolver);
        }
        SokokeInjectionPointResolver._locked = true;
    }
    static getInstance() {
        if (SokokeInjectionPointResolver.INSTANCE === null) {
            SokokeInjectionPointResolver._locked = false;
            SokokeInjectionPointResolver.INSTANCE = new SokokeInjectionPointResolver();
        }
        return SokokeInjectionPointResolver.INSTANCE;
    }
    resovelInjectionPoint(key) {
        const classPath = jec_commons_1.ClassLoaderContext.getInstance().getPath();
        const sokoke = Sokoke_1.Sokoke.getInstance();
        const context = sokoke.getContextByPath(classPath);
        sokoke.setCurrentContext(context);
        return sokoke.resolveInjectionPoint(classPath, key);
    }
    injectFieldMetadata(target, key) {
        const sokoke = Sokoke_1.Sokoke.getInstance();
        const injectionPoint = this.resovelInjectionPoint(key);
        const bean = sokoke.getBean(injectionPoint);
        const injection = sokoke.getInjectableReference(bean);
        injectionPoint.setBean(bean);
        SokokeMetadataInjector_1.SokokeMetadataInjector.getInstance()
            .injectInjectionPoint(target, injectionPoint);
        if (sokoke.isDebugMode()) {
            SokokeLoggerProxy_1.SokokeLoggerProxy.getInstance().log(SokokeLocaleManager_1.SokokeLocaleManager.getInstance().get("bean.injected.field", target.constructor.name, key, injection.constructor.name), jec_commons_1.LogLevel.DEBUG);
        }
    }
    injectParamMetadata(target, key, index) {
        console.log("InjectParameterDecorator");
        console.log(target.constructor.name, key, index);
    }
    resolve(context) {
        const decoratedType = context.decoratedType;
        if (decoratedType === jec_jdi_1.DecoratedType.FIELD) {
            this.injectFieldMetadata(context.target, String(context.key));
        }
        else if (decoratedType === jec_jdi_1.DecoratedType.PARAMETER) {
            this.injectParamMetadata(context.target, String(context.key), context.parameterIndex);
        }
        else {
        }
    }
}
SokokeInjectionPointResolver.INSTANCE = null;
SokokeInjectionPointResolver._locked = true;
exports.SokokeInjectionPointResolver = SokokeInjectionPointResolver;
