"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SingletonErrorFactory_1 = require("../SingletonErrorFactory");
class BeanInjectionValidator {
    constructor() {
        if (BeanInjectionValidator._locked || BeanInjectionValidator.INSTANCE) {
            new SingletonErrorFactory_1.SingletonErrorFactory().throw(BeanInjectionValidator);
        }
        BeanInjectionValidator._locked = true;
    }
    static getInstance() {
        if (BeanInjectionValidator.INSTANCE === null) {
            BeanInjectionValidator._locked = false;
            BeanInjectionValidator.INSTANCE = new BeanInjectionValidator();
        }
        return BeanInjectionValidator.INSTANCE;
    }
    validate(bean, injectionPoints) {
        if (bean) {
        }
    }
}
BeanInjectionValidator.INSTANCE = null;
BeanInjectionValidator._locked = true;
exports.BeanInjectionValidator = BeanInjectionValidator;
;
