"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SokokeInjectionPointResolver_1 = require("../../inject/SokokeInjectionPointResolver");
const jec_jdi_1 = require("jec-jdi");
const InjectionTargetBuilder_1 = require("../../builders/InjectionTargetBuilder");
class InjectFieldDecorator {
    constructor() { }
    decorate(target, key, context) {
        const injectionTarget = InjectionTargetBuilder_1.InjectionTargetBuilder.getInstance().build(target, key, jec_jdi_1.DecoratedType.FIELD);
        SokokeInjectionPointResolver_1.SokokeInjectionPointResolver.getInstance().resolve(injectionTarget);
        return target;
    }
}
exports.InjectFieldDecorator = InjectFieldDecorator;
