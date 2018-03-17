"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Sokoke_1 = require("./Sokoke");
class SokokeInjectionPoint {
    constructor(bean, type, element, className, beanRef, qualifiers) {
        this._bean = null;
        this._type = null;
        this._element = null;
        this._className = null;
        this._beanRef = null;
        this._qualifiers = null;
        this.initObj(bean, type, element, className, beanRef, qualifiers);
    }
    initObj(bean, type, element, className, beanRef, qualifiers) {
        this._bean = bean;
        this._type = type;
        this._element = element;
        this._className = className;
        this._beanRef = beanRef;
        this._qualifiers = qualifiers;
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
    getRef() {
        return this._beanRef;
    }
    getQualifiers() {
        return this._qualifiers;
    }
    toString() {
        const sokoke = Sokoke_1.Sokoke.getInstance();
        const domainPath = sokoke.getCurrentContext().getDomainPath();
        const classPath = this._className.substr(domainPath.length);
        return `[injection point: class='${classPath}', element='${this._element.getName()}']`;
    }
}
exports.SokokeInjectionPoint = SokokeInjectionPoint;
