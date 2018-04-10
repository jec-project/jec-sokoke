"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SokokeBean {
    constructor(name, scope, beanClass, types, className) {
        this._name = null;
        this._scope = null;
        this._beanClass = null;
        this._types = null;
        this._className = null;
        this._injectionPoints = null;
        this.initObj(name, scope, beanClass, types, className);
    }
    initObj(name, scope, beanClass, types, className) {
        this._name = name;
        this._scope = scope;
        this._beanClass = beanClass;
        this._types = types;
        this._className = className;
        this._injectionPoints = new Array();
    }
    getScope() {
        return this._scope;
    }
    getName() {
        return this._name;
    }
    getBeanClass() {
        return this._beanClass;
    }
    getTypes() {
        return this._types;
    }
    getQualifiedClassName() {
        return this._className;
    }
    getInjectionPoints() {
        return this._injectionPoints;
    }
    addInjectionPoint(injectionPoint) {
        this._injectionPoints.push(injectionPoint);
    }
    toString() {
        return `[bean: ${this._name || this._className}]`;
    }
}
exports.SokokeBean = SokokeBean;
