"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SokokeBean {
    constructor(name, scope) {
        this._name = null;
        this._scope = null;
        this.initObj(name, scope);
    }
    initObj(name, scope) {
        this._name = name;
        this._scope = scope;
    }
    getScope() {
        return this._scope;
    }
    getName() {
        return this._name;
    }
}
exports.SokokeBean = SokokeBean;
