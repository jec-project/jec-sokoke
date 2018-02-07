"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jec_jdi_1 = require("jec-jdi");
const InjectionTargetBuilder_1 = require("../../builders/InjectionTargetBuilder");
const SokokeInjector_1 = require("../../inject/SokokeInjector");
class InjectParameterDecorator {
    constructor() { }
    decorate(target, propertyKey, parameterIndex, context) {
        let injectionTarget = InjectionTargetBuilder_1.InjectionTargetBuilder.getInstance().build(target, propertyKey, jec_jdi_1.DecoratedType.PARAMETER, parameterIndex);
        SokokeInjector_1.SokokeInjector.getInstance().inject(injectionTarget);
        return target;
    }
}
exports.InjectParameterDecorator = InjectParameterDecorator;
