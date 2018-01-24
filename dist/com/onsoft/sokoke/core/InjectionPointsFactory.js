"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const InjectParamsEvaluator_1 = require("../utils/reflection/InjectParamsEvaluator");
class InjectionPointsFactory {
    constructor() {
        this._evaluator = null;
        this.initObj();
    }
    initObj() {
        this._evaluator = new InjectParamsEvaluator_1.InjectParamsEvaluator();
    }
    create(file, bean) {
        this._evaluator.evaluate(file, bean);
    }
}
exports.InjectionPointsFactory = InjectionPointsFactory;
