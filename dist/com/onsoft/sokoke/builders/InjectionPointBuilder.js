"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SokokeInjectionPoint_1 = require("../inject/SokokeInjectionPoint");
const SingletonErrorFactory_1 = require("../utils/SingletonErrorFactory");
class InjectionPointBuilder {
    constructor() {
        this._bean = null;
        this._type = null;
        this._element = null;
        this._className = null;
        this._beanRef = null;
        this._qualifiers = null;
        if (InjectionPointBuilder._locked || InjectionPointBuilder.INSTANCE) {
            new SingletonErrorFactory_1.SingletonErrorFactory().throw(InjectionPointBuilder);
        }
        InjectionPointBuilder._locked = true;
    }
    static getInstance() {
        if (InjectionPointBuilder.INSTANCE === null) {
            InjectionPointBuilder._locked = false;
            InjectionPointBuilder.INSTANCE = new InjectionPointBuilder();
        }
        return InjectionPointBuilder.INSTANCE;
    }
    bean(bean) {
        this._bean = bean;
        return this;
    }
    type(type) {
        this._type = type;
        return this;
    }
    element(element) {
        this._element = element;
        return this;
    }
    className(className) {
        this._className = className;
        return this;
    }
    ref(beanRef) {
        this._beanRef = beanRef;
        return this;
    }
    qualifiers(qualifiers) {
        this._qualifiers = qualifiers;
        return this;
    }
    clear() {
        this._bean = null;
        this._type = null;
        this._element = null;
        this._className = null;
        this._beanRef = null;
        this._qualifiers = null;
        return this;
    }
    build() {
        let injectionPoint = new SokokeInjectionPoint_1.SokokeInjectionPoint(this._bean, this._type, this._element, this._className, this._beanRef, this._qualifiers);
        return injectionPoint;
    }
}
InjectionPointBuilder._locked = true;
InjectionPointBuilder.INSTANCE = null;
exports.InjectionPointBuilder = InjectionPointBuilder;
