"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const InjectParamsEvaluator_1 = require("../utils/reflection/InjectParamsEvaluator");
const HashCodeBuilder_1 = require("../utils/HashCodeBuilder");
class InjectionPointsFactory {
    constructor() {
        this._evaluator = null;
        this._beanManager = null;
        this.initObj();
    }
    initObj() {
        this._evaluator = new InjectParamsEvaluator_1.InjectParamsEvaluator();
    }
    create(file, bean) {
        let injectPoints = this._evaluator.evaluate(file, bean);
        let len = injectPoints.length;
        let injectPoint = null;
        while (len--) {
            injectPoint = injectPoints[len];
            console.log(injectPoint);
            console.log(HashCodeBuilder_1.HashCodeBuilder.getInstance()
                .build(injectPoint.getQualifiedClassName(), injectPoint.getElement().getName()));
        }
    }
}
exports.InjectionPointsFactory = InjectionPointsFactory;
