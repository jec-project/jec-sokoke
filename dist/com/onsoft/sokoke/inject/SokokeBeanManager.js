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
        this._applicationManagedBeanList = new Array();
    }
    addBean(bean) {
        let scope = null;
        if (this._beanList.indexOf(bean) !== -1) {
            throw new jec_jdi_1.JdiError(SokokeLocaleManager_1.SokokeLocaleManager.getInstance().get("error.beanOverride", String(bean)));
        }
        scope = bean.getScope();
        if (!scope)
            this._beanList.push(bean);
        else {
            if (scope instanceof jec_jdi_1.ApplicationScoped) {
                this._applicationManagedBeanList.push(bean);
            }
        }
    }
    getBeans() {
        const result = new Set();
        let len = this._beanList.length;
        while (len--) {
            result.add(this._beanList[len]);
        }
        len = this._applicationManagedBeanList.length;
        while (len--) {
            result.add(this._applicationManagedBeanList[len]);
        }
        return result;
    }
    getBeansByName(name) {
        const result = new Set();
        let len = this._beanList.length;
        let bean = null;
        while (len--) {
            bean = this._beanList[len];
            if (bean.getName() === name)
                result.add(bean);
        }
        len = this._applicationManagedBeanList.length;
        while (len--) {
            bean = this._applicationManagedBeanList[len];
            if (bean.getName() === name)
                result.add(bean);
        }
        return result;
    }
    getBeansByType(type) {
        const result = new Set();
        let len = this._beanList.length;
        let bean = null;
        while (len--) {
            bean = this._beanList[len];
            if (bean.getTypes().has(type))
                result.add(bean);
        }
        len = this._applicationManagedBeanList.length;
        while (len--) {
            bean = this._applicationManagedBeanList[len];
            if (bean.getTypes().has(type))
                result.add(bean);
        }
        return result;
    }
    getBeansByInjectionPoint(injectionPoint) {
        const bean = injectionPoint.getBean();
        let result = null;
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
        const key = HashCodeBuilder_1.HashCodeBuilder.getInstance()
            .build(injectionPoint.getQualifiedClassName(), injectionPoint.getElement().getName());
        this._injectionPointMap.set(key, injectionPoint);
    }
    getReference(bean) {
        const scope = bean.getScope();
        let result = null;
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
