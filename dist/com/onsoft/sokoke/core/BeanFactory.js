"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const InjectableParamsEvaluator_1 = require("../utils/reflection/InjectableParamsEvaluator");
const jec_commons_1 = require("jec-commons");
const SokokeLoggerProxy_1 = require("../logging/SokokeLoggerProxy");
const SokokeLocaleManager_1 = require("../i18n/SokokeLocaleManager");
class BeanFactory {
    constructor() {
        this._evaluator = null;
        this._beanManager = null;
        this.initObj();
    }
    initObj() {
        this._evaluator = new InjectableParamsEvaluator_1.InjectableParamsEvaluator();
    }
    create(file) {
        let bean = this._evaluator.evaluate(file);
        SokokeLoggerProxy_1.SokokeLoggerProxy.getInstance().log(SokokeLocaleManager_1.SokokeLocaleManager.getInstance().get("bean.evaluated", bean.toString()), jec_commons_1.LogLevel.DEBUG);
        return bean;
    }
}
exports.BeanFactory = BeanFactory;
