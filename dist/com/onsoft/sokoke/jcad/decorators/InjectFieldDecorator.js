"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SokokeInjector_1 = require("../../core/SokokeInjector");
const jec_jdi_1 = require("jec-jdi");
const TargetContextBuilder_1 = require("../../builders/TargetContextBuilder");
class InjectFieldDecorator {
    constructor() { }
    decorate(target, key, params) {
        let context = TargetContextBuilder_1.TargetContextBuilder.getInstance().build(target, key, jec_jdi_1.DecoratedType.FIELD);
        SokokeInjector_1.SokokeInjector.getInstance().inject(context);
        return target;
    }
}
exports.InjectFieldDecorator = InjectFieldDecorator;
