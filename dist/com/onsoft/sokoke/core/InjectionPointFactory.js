"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const InjectParamsEvaluator_1 = require("../utils/reflection/InjectParamsEvaluator");
class InjectionPointFactory {
    constructor() {
        this._evaluator = null;
        this.initObj();
    }
    initObj() {
        this._evaluator = new InjectParamsEvaluator_1.InjectParamsEvaluator();
    }
    addFileContext(file) {
        this._evaluator.evaluate(file);
    }
}
exports.InjectionPointFactory = InjectionPointFactory;
