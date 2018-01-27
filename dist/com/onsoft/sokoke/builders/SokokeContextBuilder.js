"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SokokeLocaleManager_1 = require("../i18n/SokokeLocaleManager");
const jec_commons_1 = require("jec-commons");
const SokokeContextImpl_1 = require("../core/SokokeContextImpl");
class SokokeContextBuilder {
    constructor() {
        let msg = null;
        let i18n = null;
        if (SokokeContextBuilder._locked || SokokeContextBuilder.INSTANCE) {
            i18n = SokokeLocaleManager_1.SokokeLocaleManager.getInstance();
            if (i18n.isInitialized()) {
                msg = i18n.get("errors.singleton", "SokokeContextBuilder");
            }
            else {
                msg = "You cannot create a SokokeContextBuilder instance; " +
                    "use getInstance() instead.";
            }
            throw new jec_commons_1.SingletonError(msg);
        }
        SokokeContextBuilder._locked = true;
    }
    static getInstance() {
        if (SokokeContextBuilder.INSTANCE === null) {
            SokokeContextBuilder._locked = false;
            SokokeContextBuilder.INSTANCE = new SokokeContextBuilder();
        }
        return SokokeContextBuilder.INSTANCE;
    }
    build(domainPath, locale) {
        let context = new SokokeContextImpl_1.SokokeContextImpl(domainPath, locale);
        return context;
    }
}
SokokeContextBuilder._locked = true;
SokokeContextBuilder.INSTANCE = null;
exports.SokokeContextBuilder = SokokeContextBuilder;
