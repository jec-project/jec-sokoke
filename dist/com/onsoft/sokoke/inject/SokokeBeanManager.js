"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jec_jdi_1 = require("jec-jdi");
const HashCodeBuilder_1 = require("../utils/HashCodeBuilder");
const SokokeLocaleManager_1 = require("../i18n/SokokeLocaleManager");
class SokokeBeanManager {
    constructor(context) {
        this._context = null;
        this._injectionPointMap = null;
        this._beanList = null;
        this._applicationManagedBeanList = null;
        this.initObj(context);
    }
    initObj(context) {
        this._context = context;
        this._injectionPointMap = new Map();
        this._beanList = new Array();
        this._applicationManagedBeanList = new Map();
    }
    addBean(bean) {
        let scope = null;
        if (this._beanList.indexOf(bean) !== -1) {
            throw new jec_jdi_1.JdiError(SokokeLocaleManager_1.SokokeLocaleManager.getInstance().get("error.beanOverride", String(bean)));
        }
        this._beanList.push(bean);
    }
    getBeans() {
        let result = new Set();
        let len = this._beanList.length;
        while (len--) {
            result.add(this._beanList[len]);
        }
        return result;
    }
    getBeansByName(name) {
        let result = new Set();
        let len = this._beanList.length;
        let bean = null;
        while (len--) {
            bean = this._beanList[len];
            if (bean.getName() === name)
                result.add(bean);
        }
        return result;
    }
    getBeansByType(type) {
        let result = new Set();
        let len = this._beanList.length;
        let bean = null;
        while (len--) {
            bean = this._beanList[len];
            if (bean.getTypes().has(type))
                result.add(bean);
        }
        return result;
    }
    getBeansByInjectionPoint(injectionPoint) {
        let result = null;
        let bean = injectionPoint.getBean();
        if (bean) {
            result = new Set();
            result.add(bean);
        }
        else {
            result = this.getBeansByType(injectionPoint.getType());
        }
        return result;
    }
    addInjectionPoint(injectionPoint) {
        let key = HashCodeBuilder_1.HashCodeBuilder.getInstance()
            .build(injectionPoint.getQualifiedClassName(), injectionPoint.getElement().getName());
        this._injectionPointMap.set(key, injectionPoint);
    }
    getReference(bean) {
        let result = null;
        let scope = bean.getScope();
        let len;
        let Constructor = null;
        if (!scope) {
            Constructor = bean.getBeanClass();
            result = new Constructor();
        }
        else {
            if (scope instanceof jec_jdi_1.ApplicationScoped) {
            }
        }
        return result;
    }
    getContext() {
        return this._context;
    }
    getInjectionPoint(ref) {
        return this._injectionPointMap.get(ref);
    }
}
exports.SokokeBeanManager = SokokeBeanManager;
