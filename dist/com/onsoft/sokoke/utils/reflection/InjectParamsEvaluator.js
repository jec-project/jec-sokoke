"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jec_commons_1 = require("jec-commons");
const JdiRegExp_1 = require("./JdiRegExp");
const InjectParamsString_1 = require("./InjectParamsString");
const InjectionString_1 = require("./InjectionString");
const InjectionSanitizer_1 = require("./InjectionSanitizer");
const InjectionPointBuilder_1 = require("../../builders/InjectionPointBuilder");
class InjectParamsEvaluator {
    constructor() { }
    extractField(decorator, beanClass) {
        const fieldName = decorator.substring(decorator.indexOf(InjectParamsString_1.InjectParamsString.PROTOTYPE) + 13, decorator.lastIndexOf(InjectParamsString_1.InjectParamsString.CLOSING_QUOTE));
        const field = new jec_commons_1.Field(fieldName, beanClass);
        return field;
    }
    extractParams(rawParams, file) {
        const params = {};
        let found = null;
        JdiRegExp_1.JdiRegExp.PARAMS_MATCHER.lastIndex = 0;
        while ((found = JdiRegExp_1.JdiRegExp.PARAMS_MATCHER.exec(rawParams)) !== null) {
            switch (found[1]) {
                case InjectionString_1.InjectionString.NAME:
                    InjectionSanitizer_1.InjectionSanitizer.getInstance().sanitizeName(params, found[2]);
                    break;
                case InjectionString_1.InjectionString.TYPE:
                    InjectionSanitizer_1.InjectionSanitizer.getInstance().sanitizeType(params, found[2], file);
                    break;
                case InjectionString_1.InjectionString.QUALIFIER:
                    console.log("qualifier detected", found[2]);
                    break;
            }
        }
        return params;
    }
    resolveInjectParams(file, rawDecorator) {
        let found = null;
        let params = null;
        JdiRegExp_1.JdiRegExp.INJECT_MATCHER.lastIndex = 0;
        found = JdiRegExp_1.JdiRegExp.INJECT_MATCHER.exec(rawDecorator);
        params = this.extractParams(found[1], file);
        return params;
    }
    resolveInjections(file, bean) {
        const decorators = this.extractDecorators(file);
        const result = new Array();
        let decorator = "";
        let len = decorators.length;
        let params = null;
        let element = null;
        let injectPoint = null;
        let beanClass = null;
        let className = null;
        if (bean) {
            beanClass = bean.getBeanClass();
            className = bean.getQualifiedClassName();
        }
        else {
            className = jec_commons_1.PathUtils.getInstance().buildFilePath(file.path, file.name);
        }
        while (len--) {
            decorator = decorators[len];
            if (decorator.indexOf(InjectParamsString_1.InjectParamsString.INJECT) !== -1) {
                if (decorator.indexOf(InjectParamsString_1.InjectParamsString.PROTOTYPE) !== -1) {
                    params = this.resolveInjectParams(file, decorator);
                    element = this.extractField(decorator, beanClass);
                    injectPoint = InjectionPointBuilder_1.InjectionPointBuilder.getInstance()
                        .clear()
                        .type(params.type)
                        .element(element)
                        .className(className)
                        .ref(params.name)
                        .qualifiers(params.qualifiers)
                        .build();
                    result.push(injectPoint);
                }
            }
        }
        return result;
    }
    extractDecorators(file) {
        const result = new Array();
        let content = file.content;
        let decorator = null;
        let startId = content.indexOf(InjectParamsString_1.InjectParamsString.DECORATE);
        let endId = -1;
        while (startId !== -1) {
            content = content.substring(startId);
            endId = content.indexOf(InjectParamsString_1.InjectParamsString.DECORATE_CLOSING) + 2;
            decorator = content.substring(0, endId);
            result.push(decorator);
            content = content.substring(endId + 1);
            startId = content.indexOf(InjectParamsString_1.InjectParamsString.DECORATE);
        }
        return result;
    }
    evaluate(file, bean) {
        const injectPoints = this.resolveInjections(file, bean);
        return injectPoints;
    }
}
exports.InjectParamsEvaluator = InjectParamsEvaluator;
