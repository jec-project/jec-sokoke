"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SokokeInjector_1 = require("../../inject/SokokeInjector");
const jec_jdi_1 = require("jec-jdi");
const InjectionTargetBuilder_1 = require("../../builders/InjectionTargetBuilder");
class InjectFieldDecorator {
    constructor() { }
    decorate(target, key, context) {
        let injectionTarget = InjectionTargetBuilder_1.InjectionTargetBuilder.getInstance().build(target, key, jec_jdi_1.DecoratedType.FIELD);
        SokokeInjector_1.SokokeInjector.getInstance().inject(injectionTarget);
        return target;
    }
}
exports.InjectFieldDecorator = InjectFieldDecorator;
