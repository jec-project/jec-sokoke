"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SokokeBean {
    constructor(name, scope, beanClass, types) {
        this._name = null;
        this._scope = null;
        this._beanClass = null;
        this._types = null;
        this.initObj(name, scope, beanClass, types);
    }
    initObj(name, scope, beanClass, types) {
        this._name = name;
        this._scope = scope;
        this._beanClass = beanClass;
        this._types = types;
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
    toString() {
        return `[bean: ${this._name || this._beanClass.name}]`;
    }
}
exports.SokokeBean = SokokeBean;
