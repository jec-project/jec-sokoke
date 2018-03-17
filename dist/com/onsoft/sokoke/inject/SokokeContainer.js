"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jec_commons_1 = require("jec-commons");
class SokokeContainer {
    constructor() {
        this._id = null;
        this._beanManagerMap = null;
        this._currentDomainPath = null;
        this.initObj();
    }
    initObj() {
        this._id = jec_commons_1.GlobalGuidGenerator.getInstance().generate();
        this._beanManagerMap = new Map();
    }
    getId() {
        return this._id;
    }
    getBeanManager() {
        return this._beanManagerMap.get(this._currentDomainPath);
    }
    setBeanManager(beanManager) {
        const key = beanManager.getContext()
            .getDomainPath();
        this._beanManagerMap.set(key, beanManager);
    }
    contextChange(context) {
        this._currentDomainPath = context.getDomainPath();
    }
}
exports.SokokeContainer = SokokeContainer;
