"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SokokeContextImpl {
    constructor(domainPath, locale) {
        this._domainPath = null;
        this._locale = null;
        this.initObj(domainPath, locale);
    }
    initObj(domainPath, locale) {
        this._domainPath = domainPath;
        this._locale = locale;
    }
    getDomainPath() {
        return this._domainPath;
    }
    getLocale() {
        return this._locale;
    }
    toString() {
        return `[SokokeContext: domain='${this._domainPath}']`;
    }
}
exports.SokokeContextImpl = SokokeContextImpl;
