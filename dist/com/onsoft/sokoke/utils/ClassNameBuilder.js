"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SokokeLocaleManager_1 = require("../i18n/SokokeLocaleManager");
const jec_commons_1 = require("jec-commons");
const path = require("path");
class ClassNameBuilder {
    constructor() {
        this._domainPathLength = -1;
        this._domainPath = null;
        this.DOT = ".";
        this.PATTERN = /\/|\\/g;
        let msg = null;
        let i18n = null;
        if (ClassNameBuilder._locked || ClassNameBuilder.INSTANCE) {
            i18n = SokokeLocaleManager_1.SokokeLocaleManager.getInstance();
            if (i18n.isInitialized()) {
                msg = i18n.get("errors.singleton", "ClassNameBuilder");
            }
            else {
                msg = "You cannot create a ClassNameBuilder instance; " +
                    "use getInstance() instead.";
            }
            throw new jec_commons_1.SingletonError(msg);
        }
        ClassNameBuilder._locked = true;
    }
    static getInstance() {
        if (ClassNameBuilder.INSTANCE === null) {
            ClassNameBuilder._locked = false;
            ClassNameBuilder.INSTANCE = new ClassNameBuilder();
        }
        return ClassNameBuilder.INSTANCE;
    }
    setDomainPath(domainPath) {
        this._domainPath = domainPath;
        this._domainPathLength = path.join(domainPath, "src").length + 1;
    }
    getDomainPath() {
        return this._domainPath;
    }
    build(classPath) {
        let className = classPath.substring(this._domainPathLength, classPath.length - 3)
            .replace(this.PATTERN, this.DOT);
        return className;
    }
}
ClassNameBuilder._locked = true;
ClassNameBuilder.INSTANCE = null;
exports.ClassNameBuilder = ClassNameBuilder;
