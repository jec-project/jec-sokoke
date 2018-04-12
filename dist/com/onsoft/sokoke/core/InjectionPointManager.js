"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HashCodeBuilder_1 = require("../utils/HashCodeBuilder");
class InjectionPointManager {
    constructor() {
        this._injectionPoints = null;
        this._injectionPointMap = null;
        this.initObj();
    }
    initObj() {
        this._injectionPoints = new Array();
        this._injectionPointMap = new Map();
    }
    addInjectionPoint(injectionPoint) {
        const key = HashCodeBuilder_1.HashCodeBuilder.getInstance()
            .build(injectionPoint.getQualifiedClassName(), injectionPoint.getElement().getName());
        this._injectionPointMap.set(key, injectionPoint);
        this._injectionPoints.push(injectionPoint);
    }
    getInjectionPoint(ref) {
        return this._injectionPointMap.get(ref);
    }
    getInjectionPoints() {
        return this._injectionPoints;
    }
}
exports.InjectionPointManager = InjectionPointManager;
