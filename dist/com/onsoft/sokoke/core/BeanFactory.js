"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const InjectableParamsEvaluator_1 = require("../utils/InjectableParamsEvaluator");
class BeanFactory {
    constructor() {
        this._evaluator = null;
        this.initObj();
    }
    initObj() {
        this._evaluator = new InjectableParamsEvaluator_1.InjectableParamsEvaluator();
    }
    addBeanArchive(file) {
        this._evaluator.evaluate(file);
    }
}
exports.BeanFactory = BeanFactory;
