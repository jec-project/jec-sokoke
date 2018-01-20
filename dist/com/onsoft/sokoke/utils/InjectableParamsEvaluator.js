"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jec_jdi_1 = require("jec-jdi");
const BeanBuilder_1 = require("../builders/BeanBuilder");
const jec_commons_1 = require("jec-commons");
const ScopeStrategy_1 = require("../utils/ScopeStrategy");
const path = require("path");
const InjectableParamsString_1 = require("./InjectableParamsString");
const InjectableParamsRegExp_1 = require("./InjectableParamsRegExp");
class InjectableParamsEvaluator {
    constructor() { }
    getBeanClass(file) {
        let fileName = file.name + jec_commons_1.UrlStringsEnum.DOT + file.extension;
        let filePath = path.join(file.path, fileName);
        let beanClass = require(filePath);
        return beanClass;
    }
    buildTypes(beanClass, beanType) {
        let types = new Set();
        types.add(beanClass);
        if (beanType)
            types.add(beanType);
        return types;
    }
    sanitizesString(value) {
        let len = value.length - 1;
        let result = value.lastIndexOf(InjectableParamsString_1.InjectableParamsString.COMA) === len ?
            value.substr(1, len - 2) : value.substr(1, len - 1);
        return result;
    }
    sanitizeName(params, value) {
        params.name = this.sanitizesString(value);
    }
    sanitizeType(params, value, file) {
        let len = value.length - 1;
        let rawType = value.lastIndexOf(InjectableParamsString_1.InjectableParamsString.COMA) === len ?
            value.substr(0, len) : value;
        let importRefs = rawType.split(InjectableParamsString_1.InjectableParamsString.DOT);
        let importRefPath = InjectableParamsRegExp_1.InjectableParamsRegExp.getTypeMatcher(importRefs[0]).exec(file.content)[1];
        let importPath = path.resolve(file.path, importRefPath);
        let type = require(importPath)[importRefs[1]];
        params.type = type;
    }
    sanitizeScope(params, value) {
        if (value.indexOf(InjectableParamsString_1.InjectableParamsString.SCOPETYPE_APPLICATION) !== -1) {
            params.scope = jec_jdi_1.ScopeType.APPLICATION;
        }
        else if (value.indexOf(InjectableParamsString_1.InjectableParamsString.SCOPETYPE_SESSION) !== -1) {
            params.scope = jec_jdi_1.ScopeType.SESSION;
        }
        else if (value.indexOf(InjectableParamsString_1.InjectableParamsString.SCOPETYPE_REQUEST) !== -1) {
            params.scope = jec_jdi_1.ScopeType.REQUEST;
        }
        else if (value.indexOf(InjectableParamsString_1.InjectableParamsString.SCOPETYPE_DEPENDENT) !== -1 ||
            value.indexOf(InjectableParamsString_1.InjectableParamsString.NULL) !== -1) {
            params.scope = null;
        }
        else {
            params.scope = this.sanitizesString(value);
        }
    }
    extractParams(rawParams, file) {
        let params = {};
        let found = null;
        while ((found = InjectableParamsRegExp_1.InjectableParamsRegExp.PARAMS_MATCHER.exec(rawParams))
            !== null) {
            switch (found[1]) {
                case InjectableParamsString_1.InjectableParamsString.NAME:
                    this.sanitizeName(params, found[2]);
                    break;
                case InjectableParamsString_1.InjectableParamsString.TYPE:
                    this.sanitizeType(params, found[2], file);
                    break;
                case InjectableParamsString_1.InjectableParamsString.SCOPE:
                    this.sanitizeScope(params, found[2]);
                    break;
                case InjectableParamsString_1.InjectableParamsString.RETENTION:
                    console.log("retention detected", found[2]);
                    break;
                case InjectableParamsString_1.InjectableParamsString.QUALIFIER:
                    console.log("qualifier detected", found[2]);
                    break;
            }
        }
        return params;
    }
    resolveInjectableParams(file) {
        let found = InjectableParamsRegExp_1.InjectableParamsRegExp.INJECTABLE_MATCHER.exec(file.content);
        let rawParams = found[1];
        let params = this.extractParams(rawParams, file);
        return params;
    }
    evaluate(file) {
        let params = this.resolveInjectableParams(file);
        let scope = ScopeStrategy_1.ScopeStrategy.getInstance().resolve(params.scope);
        let beanClass = this.getBeanClass(file);
        let bean = BeanBuilder_1.BeanBuilder.getInstance()
            .clear()
            .name(params.name)
            .scope(scope)
            .types(this.buildTypes(beanClass, params.type))
            .beanClass(beanClass)
            .build();
        return bean;
    }
}
exports.InjectableParamsEvaluator = InjectableParamsEvaluator;
