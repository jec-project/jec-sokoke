"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BeanBuilder_1 = require("../builders/BeanBuilder");
const jec_commons_1 = require("jec-commons");
const ScopeStrategy_1 = require("../utils/ScopeStrategy");
const path = require("path");
class InjectableParamsEvaluator {
    constructor() { }
    getBeanClass(file) {
        let fileName = file.name + jec_commons_1.UrlStringsEnum.DOT + file.extension;
        let filePath = path.join(file.path, fileName);
        let beanClass = require(filePath);
        console.log(beanClass);
        return beanClass;
    }
    resolveInjectableParams(content) {
        let params = {};
        return params;
    }
    evaluate(file) {
        let params = this.resolveInjectableParams(file.content);
        let scope = ScopeStrategy_1.ScopeStrategy.getInstance().resolve(params.scope);
        let name = null;
        let beanClass = this.getBeanClass(file);
        let bean = BeanBuilder_1.BeanBuilder.getInstance()
            .clear()
            .name(name)
            .scope(scope)
            .beanClass(beanClass)
            .build();
        console.log(bean);
    }
}
exports.InjectableParamsEvaluator = InjectableParamsEvaluator;
