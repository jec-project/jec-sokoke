"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const InjectParamsEvaluator_1 = require("../utils/reflection/InjectParamsEvaluator");
const jec_commons_1 = require("jec-commons");
const Sokoke_1 = require("../inject/Sokoke");
const SokokeLocaleManager_1 = require("../i18n/SokokeLocaleManager");
const SokokeLoggerProxy_1 = require("../logging/SokokeLoggerProxy");
class InjectionPointsFactory {
    constructor() {
        this._evaluator = null;
        this.initObj();
    }
    initObj() {
        this._evaluator = new InjectParamsEvaluator_1.InjectParamsEvaluator();
    }
    create(file, bean) {
        let injectPoints = this._evaluator.evaluate(file, bean);
        let len = injectPoints.length;
        let injectPoint = null;
        let showTrace = Sokoke_1.Sokoke.getInstance().isDebugMode();
        while (len--) {
            injectPoint = injectPoints[len];
            if (showTrace) {
                SokokeLoggerProxy_1.SokokeLoggerProxy.getInstance().log(SokokeLocaleManager_1.SokokeLocaleManager.getInstance().get("injection.evaluated", String(injectPoint)), jec_commons_1.LogLevel.DEBUG);
            }
            Sokoke_1.Sokoke.getInstance().getBeanManager().addInjectionPoint(injectPoint);
        }
        return injectPoints;
    }
}
exports.InjectionPointsFactory = InjectionPointsFactory;
