"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jec_commons_1 = require("jec-commons");
const jec_jdi_1 = require("jec-jdi");
const SokokeLocaleManager_1 = require("../i18n/SokokeLocaleManager");
const path = require("path");
const JdiContainerFactory_1 = require("../builders/JdiContainerFactory");
const BeanManagerBuilder_1 = require("../builders/BeanManagerBuilder");
const HashCodeBuilder_1 = require("../utils/HashCodeBuilder");
class Sokoke {
    constructor() {
        this._container = null;
        this._localeCongig = null;
        this._currContext = null;
        this._contextList = null;
        let msg = null;
        let i18n = null;
        if (Sokoke._locked || Sokoke.INSTANCE) {
            i18n = SokokeLocaleManager_1.SokokeLocaleManager.getInstance();
            if (i18n.isInitialized()) {
                msg = i18n.get("errors.singleton", "Sokoke");
            }
            else {
                msg = "You cannot create a Sokoke instance; " +
                    "use getInstance() instead.";
            }
            throw new jec_commons_1.SingletonError(msg);
        }
        this.initObj();
        Sokoke._locked = true;
    }
    static getInstance() {
        if (Sokoke.INSTANCE === null) {
            Sokoke._locked = false;
            Sokoke.INSTANCE = new Sokoke();
        }
        return Sokoke.INSTANCE;
    }
    initObj() {
        let factory = new JdiContainerFactory_1.JdiContainerFactory();
        this._container = factory.create();
        let sokokeLocalesPath = path.join(process.cwd(), "node_modules/jec-sokoke/public/locales/");
        this._localeCongig = { directory: sokokeLocalesPath };
        this._contextList = new Set();
    }
    getBeanList(context, injectionPoint) {
        let beans = null;
        let beanList = null;
        let manager = this._container.getBeanManager();
        let name = context.name;
        let type = context.type;
        let msg = name;
        if (name) {
            beans = manager.getBeansByName(name);
        }
        if (type && !beans || beans.size === 0) {
            beans = manager.getBeansByType(type);
        }
        if (!beans || beans.size === 0) {
            beans = manager.getBeansByInjectionPoint(injectionPoint);
        }
        if (beans.size === 0) {
            msg = name ? "errors.unsatisfied.name" : "errors.unsatisfied.type";
            msg = SokokeLocaleManager_1.SokokeLocaleManager.getInstance().get(msg, name || type, injectionPoint.getQualifiedClassName());
            throw new jec_jdi_1.UnsatisfiedDependencyError(msg);
        }
        else {
            beanList = Array.from(beans);
        }
        return beanList;
    }
    getContainer() {
        return this._container;
    }
    getBeanManager() {
        return this._container.getBeanManager();
    }
    addContext(context) {
        let beanManager = BeanManagerBuilder_1.BeanManagerBuilder.getInstance()
            .build(context);
        this._contextList.add(context);
        this._container.setBeanManager(beanManager);
    }
    setCurrentContext(context) {
        if (this._currContext !== context) {
            this._currContext = context;
            this._container.contextChange(context);
            SokokeLocaleManager_1.SokokeLocaleManager.getInstance().init(context.getLocale().toString(), this._localeCongig);
        }
    }
    getCurrentContext() {
        return this._currContext;
    }
    getContextByPath(path) {
        const it = this._contextList.entries();
        let domainPath = path;
        let context = null;
        let result = null;
        for (let entry of it) {
            context = entry[0];
            domainPath = context.getDomainPath();
            if (path.indexOf(domainPath) === 0) {
                result = context;
                break;
            }
        }
        return result;
    }
    resolveInjectionPoint(classPath, member) {
        let hash = HashCodeBuilder_1.HashCodeBuilder.getInstance().build(classPath, member);
        let injectPoint = null;
        let beanManager = this._container.getBeanManager();
        return beanManager.getInjectionPoint(hash);
    }
    getInjectableReference(context, injectionPoint) {
        let beanList = this.getBeanList(context, injectionPoint);
        let bean = beanList[0];
        let result = this._container.getBeanManager().getReference(bean);
        return result;
    }
}
Sokoke._locked = true;
Sokoke.INSTANCE = null;
exports.Sokoke = Sokoke;
