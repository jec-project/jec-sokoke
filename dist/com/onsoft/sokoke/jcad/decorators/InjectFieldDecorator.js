"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SokokeInjector_1 = require("../../core/SokokeInjector");
const jec_jdi_1 = require("jec-jdi");
const InjectionTargetBuilder_1 = require("../../builders/InjectionTargetBuilder");
class InjectFieldDecorator {
    constructor() { }
    decorate(target, key, params) {
        let context = InjectionTargetBuilder_1.InjectionTargetBuilder.getInstance().build(target, key, jec_jdi_1.DecoratedType.FIELD);
        SokokeInjector_1.SokokeInjector.getInstance().inject(context);
        return target;
    }
}
exports.InjectFieldDecorator = InjectFieldDecorator;
