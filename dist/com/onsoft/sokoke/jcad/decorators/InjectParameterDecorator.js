"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jec_jdi_1 = require("jec-jdi");
const InjectionTargetBuilder_1 = require("../../builders/InjectionTargetBuilder");
const SokokeInjectionPointResolver_1 = require("../../inject/SokokeInjectionPointResolver");
class InjectParameterDecorator {
    constructor() { }
    decorate(target, propertyKey, parameterIndex, context) {
        const injectionTarget = InjectionTargetBuilder_1.InjectionTargetBuilder.getInstance().build(target, propertyKey, jec_jdi_1.DecoratedType.PARAMETER, parameterIndex);
        SokokeInjectionPointResolver_1.SokokeInjectionPointResolver.getInstance().resolve(injectionTarget);
        return target;
    }
}
exports.InjectParameterDecorator = InjectParameterDecorator;
