"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SokokeBeanManager {
    constructor(context) {
        this._context = null;
        this.initObj(context);
    }
    initObj(context) {
        this._context = context;
    }
    addBean(bean) {
    }
    getBeans(injectionPoint) {
        let result = new Set();
        return result;
    }
    getContext() {
        return this._context;
    }
}
exports.SokokeBeanManager = SokokeBeanManager;
