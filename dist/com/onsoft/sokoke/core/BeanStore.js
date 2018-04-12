"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BeanStore {
    constructor() {
        this._beanInstancesMap = null;
        this.initObj();
    }
    initObj() {
        this._beanInstancesMap = new Map();
    }
    registerBean(bean) {
        const scope = bean.getScope();
        let Constructor = null;
        let instance = null;
        if (scope) {
            Constructor = bean.getBeanClass();
            instance = new Constructor();
            this._beanInstancesMap.set(bean.getHash(), instance);
        }
    }
    getBeanInstance(bean) {
        const scope = bean.getScope();
        let instance = null;
        let len;
        let Constructor = null;
        let hash = bean.getHash();
        if (!scope) {
            Constructor = bean.getBeanClass();
            instance = new Constructor();
        }
        else {
            instance = this._beanInstancesMap.get(hash);
        }
        return instance;
    }
}
exports.BeanStore = BeanStore;
