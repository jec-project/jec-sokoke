"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SokokeLocaleManager_1 = require("../i18n/SokokeLocaleManager");
const jec_commons_1 = require("jec-commons");
const SokokeBean_1 = require("../inject/SokokeBean");
class BeanBuilder {
    constructor() {
        this._scope = null;
        this._name = null;
        this._beanClass = null;
        this._types = null;
        let msg = null;
        let i18n = null;
        if (BeanBuilder._locked || BeanBuilder.INSTANCE) {
            i18n = SokokeLocaleManager_1.SokokeLocaleManager.getInstance();
            if (i18n.isInitialized()) {
                msg = i18n.get("errors.singleton", "BeanBuilder");
            }
            else {
                msg = "You cannot create a BeanBuilder instance; " +
                    "use getInstance() instead.";
            }
            throw new jec_commons_1.SingletonError(msg);
        }
        BeanBuilder._locked = true;
    }
    static getInstance() {
        if (BeanBuilder.INSTANCE === null) {
            BeanBuilder._locked = false;
            BeanBuilder.INSTANCE = new BeanBuilder();
        }
        return BeanBuilder.INSTANCE;
    }
    scope(scope) {
        this._scope = scope;
        return this;
    }
    name(name) {
        this._name = name;
        return this;
    }
    beanClass(beanClass) {
        this._beanClass = beanClass;
        return this;
    }
    types(types) {
        this._types = types;
        return this;
    }
    clear() {
        this._scope = null;
        this._name = null;
        this._beanClass = null;
        this._types = null;
        return this;
    }
    build() {
        let bean = new SokokeBean_1.SokokeBean(this._name, this._scope, this._beanClass, this._types);
        return bean;
    }
}
BeanBuilder._locked = true;
BeanBuilder.INSTANCE = null;
exports.BeanBuilder = BeanBuilder;
