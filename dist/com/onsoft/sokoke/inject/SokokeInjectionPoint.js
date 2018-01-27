"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Sokoke_1 = require("./Sokoke");
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
    toString() {
        let sokoke = Sokoke_1.Sokoke.getInstance();
        let domainPath = sokoke.getCurrentContext().getDomainPath();
        let classPath = this._className.substr(domainPath.length);
        return `[injection point: class='${classPath}', element='${this._element.getName()}']`;
    }
}
exports.SokokeInjectionPoint = SokokeInjectionPoint;
