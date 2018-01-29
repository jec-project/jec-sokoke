"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jec_jdi_1 = require("jec-jdi");
const jec_commons_1 = require("jec-commons");
const path = require("path");
const InjectionString_1 = require("./InjectionString");
const JdiRegExp_1 = require("./JdiRegExp");
const SokokeLocaleManager_1 = require("../../i18n/SokokeLocaleManager");
class InjectionSanitizer {
    constructor() {
        let msg = null;
        let i18n = null;
        if (InjectionSanitizer._locked || InjectionSanitizer.INSTANCE) {
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
        InjectionSanitizer._locked = true;
    }
    static getInstance() {
        if (InjectionSanitizer.INSTANCE === null) {
            InjectionSanitizer._locked = false;
            InjectionSanitizer.INSTANCE = new InjectionSanitizer();
        }
        return InjectionSanitizer.INSTANCE;
    }
    sanitizesString(value) {
        let result = value.trimRight();
        let len = result.length - 1;
        result = result.lastIndexOf(InjectionString_1.InjectionString.COMA) === len ?
            result.substr(1, len - 2) : result.substr(1, len - 1);
        return result;
    }
    sanitizeName(params, value) {
        params.name = this.sanitizesString(value);
    }
    sanitizeType(params, value, file) {
        let len = value.length - 1;
        let rawType = value.lastIndexOf(InjectionString_1.InjectionString.COMA) === len ?
            value.substr(0, len) : value;
        let importRef = rawType.substr(0, rawType.lastIndexOf(InjectionString_1.InjectionString.DOT));
        let importRefPath = JdiRegExp_1.JdiRegExp.getTypeMatcher(importRef).exec(file.content)[1];
        let importPath = path.resolve(file.path, importRefPath);
        let type = jec_commons_1.GlobalClassLoader.getInstance().loadClass(importPath);
        params.type = type;
    }
    sanitizeScope(params, value) {
        if (value.indexOf(InjectionString_1.InjectionString.SCOPETYPE_APPLICATION) !== -1) {
            params.scope = jec_jdi_1.ScopeType.APPLICATION;
        }
        else if (value.indexOf(InjectionString_1.InjectionString.SCOPETYPE_SESSION) !== -1) {
            params.scope = jec_jdi_1.ScopeType.SESSION;
        }
        else if (value.indexOf(InjectionString_1.InjectionString.SCOPETYPE_REQUEST) !== -1) {
            params.scope = jec_jdi_1.ScopeType.REQUEST;
        }
        else if (value.indexOf(InjectionString_1.InjectionString.SCOPETYPE_DEPENDENT) !== -1 ||
            value.indexOf(InjectionString_1.InjectionString.NULL) !== -1) {
            params.scope = null;
        }
        else {
            params.scope = this.sanitizesString(value);
        }
    }
}
InjectionSanitizer.INSTANCE = null;
InjectionSanitizer._locked = true;
exports.InjectionSanitizer = InjectionSanitizer;
