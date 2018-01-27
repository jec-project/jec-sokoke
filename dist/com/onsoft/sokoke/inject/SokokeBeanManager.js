"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HashCodeBuilder_1 = require("../utils/HashCodeBuilder");
class SokokeBeanManager {
    constructor(context) {
        this._context = null;
        this._injectionPointMap = null;
        this.initObj(context);
    }
    initObj(context) {
        this._context = context;
        this._injectionPointMap = new Map();
    }
    addBean(bean) {
    }
    getBeans(injectionPoint) {
        let result = new Set();
        return result;
    }
    addInjectionPoint(injectionPoint) {
        let key = HashCodeBuilder_1.HashCodeBuilder.getInstance()
            .build(injectionPoint.getQualifiedClassName(), injectionPoint.getElement().getName());
        this._injectionPointMap.set(key, injectionPoint);
    }
    getContext() {
        return this._context;
    }
    getInjectionPoint(ref) {
        return this._injectionPointMap.get(ref);
    }
}
exports.SokokeBeanManager = SokokeBeanManager;
