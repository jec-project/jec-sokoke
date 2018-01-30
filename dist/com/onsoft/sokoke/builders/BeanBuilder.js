"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SokokeBean_1 = require("../inject/SokokeBean");
const SingletonErrorFactory_1 = require("../utils/SingletonErrorFactory");
class BeanBuilder {
    constructor() {
        this._scope = null;
        this._name = null;
        this._beanClass = null;
        this._types = null;
        this._className = null;
        if (BeanBuilder._locked || BeanBuilder.INSTANCE) {
            new SingletonErrorFactory_1.SingletonErrorFactory().throw(BeanBuilder);
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
    className(className) {
        this._className = className;
        return this;
    }
    clear() {
        this._scope = null;
        this._name = null;
        this._beanClass = null;
        this._types = null;
        this._className = null;
        return this;
    }
    build() {
        let bean = new SokokeBean_1.SokokeBean(this._name, this._scope, this._beanClass, this._types, this._className);
        return bean;
    }
}
BeanBuilder._locked = true;
BeanBuilder.INSTANCE = null;
exports.BeanBuilder = BeanBuilder;
