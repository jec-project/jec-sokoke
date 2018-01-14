"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SokokeInjectionPoint {
    constructor(bean, type, element) {
        this._bean = null;
        this._type = null;
        this._element = null;
        this.initObj(bean, type, element);
    }
    initObj(bean, type, element) {
        this._bean = bean;
        this._type = type;
        this._element = element;
    }
    getBean() {
        return this._bean;
    }
    getType() {
        return this._type;
    }
    getElement() {
        return this._element;
    }
}
exports.SokokeInjectionPoint = SokokeInjectionPoint;
