"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SokokeInjectionPoint {
    constructor(bean, type, element, className) {
        this._bean = null;
        this._type = null;
        this._element = null;
        this._className = null;
        this.initObj(bean, type, element, className);
    }
    initObj(bean, type, element, className) {
        this._bean = bean;
        this._type = type;
        this._element = element;
        this._className = className;
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
    getQualifiedClassName() {
        return this._className;
    }
}
exports.SokokeInjectionPoint = SokokeInjectionPoint;
