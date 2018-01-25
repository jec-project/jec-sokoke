"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BeanBuilder_1 = require("../../builders/BeanBuilder");
const jec_commons_1 = require("jec-commons");
const ScopeStrategy_1 = require("../../utils/ScopeStrategy");
const path = require("path");
const JdiRegExp_1 = require("./JdiRegExp");
const InjectionSanitizer_1 = require("./InjectionSanitizer");
const InjectionString_1 = require("./InjectionString");
const ClassNameBuilder_1 = require("../ClassNameBuilder");
class InjectableParamsEvaluator {
    constructor() { }
    getClassPath(file) {
        let fileName = file.name + InjectionString_1.InjectionString.DOT + file.extension;
        let filePath = path.join(file.path, fileName);
        return filePath;
    }
    getBeanClass(filePath) {
        let beanClass = jec_commons_1.GlobalClassLoader.getInstance().loadClass(filePath);
        return beanClass;
    }
    buildTypes(beanClass, beanType) {
        let types = new Set();
        types.add(beanClass);
        if (beanType)
            types.add(beanType);
        return types;
    }
    extractParams(rawParams, file) {
        let params = {};
        let found = null;
        while ((found = JdiRegExp_1.JdiRegExp.PARAMS_MATCHER.exec(rawParams)) !== null) {
            switch (found[1]) {
                case InjectionString_1.InjectionString.NAME:
                    InjectionSanitizer_1.InjectionSanitizer.getInstance().sanitizeName(params, found[2]);
                    break;
                case InjectionString_1.InjectionString.TYPE:
                    InjectionSanitizer_1.InjectionSanitizer.getInstance().sanitizeType(params, found[2], file);
                    break;
                case InjectionString_1.InjectionString.SCOPE:
                    InjectionSanitizer_1.InjectionSanitizer.getInstance().sanitizeScope(params, found[2]);
                    break;
                case InjectionString_1.InjectionString.RETENTION:
                    console.log("retention detected", found[2]);
                    break;
                case InjectionString_1.InjectionString.QUALIFIER:
                    console.log("qualifier detected", found[2]);
                    break;
            }
        }
        return params;
    }
    resolveInjectableParams(file) {
        let found = JdiRegExp_1.JdiRegExp.INJECTABLE_MATCHER.exec(file.content);
        let rawParams = found[1];
        let params = this.extractParams(rawParams, file);
        return params;
    }
    evaluate(file) {
        let params = this.resolveInjectableParams(file);
        let scope = ScopeStrategy_1.ScopeStrategy.getInstance().resolve(params.scope);
        let classPath = this.getClassPath(file);
        let beanClass = this.getBeanClass(classPath);
        let bean = BeanBuilder_1.BeanBuilder.getInstance()
            .clear()
            .name(params.name)
            .scope(scope)
            .types(this.buildTypes(beanClass, params.type))
            .beanClass(beanClass)
            .className(ClassNameBuilder_1.ClassNameBuilder.getInstance().build(classPath))
            .build();
        return bean;
    }
}
exports.InjectableParamsEvaluator = InjectableParamsEvaluator;
