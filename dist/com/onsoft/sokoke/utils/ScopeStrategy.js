"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SokokeLocaleManager_1 = require("../i18n/SokokeLocaleManager");
const jec_jdi_1 = require("jec-jdi");
const jec_commons_1 = require("jec-commons");
class ScopeStrategy {
    constructor() {
        let msg = null;
        let i18n = null;
        if (ScopeStrategy._locked || ScopeStrategy.INSTANCE) {
            i18n = SokokeLocaleManager_1.SokokeLocaleManager.getInstance();
            if (i18n.isInitialized()) {
                msg = i18n.get("errors.singleton", "ScopeStrategy");
            }
            else {
                msg = "You cannot create a ScopeStrategy instance; " +
                    "use getInstance() instead.";
            }
            throw new jec_commons_1.SingletonError(msg);
        }
        ScopeStrategy._locked = true;
    }
    static getInstance() {
        if (ScopeStrategy.INSTANCE === null) {
            ScopeStrategy._locked = false;
            ScopeStrategy.INSTANCE = new ScopeStrategy();
        }
        return ScopeStrategy.INSTANCE;
    }
    resolve(scope) {
        let resolved = null;
        switch (scope) {
            case jec_jdi_1.ScopeType.APPLICATION:
                resolved = new jec_jdi_1.ApplicationScoped();
                break;
            case jec_jdi_1.ScopeType.REQUEST:
                resolved = new jec_jdi_1.RequestScoped();
                break;
            case jec_jdi_1.ScopeType.SESSION:
                resolved = new jec_jdi_1.SessionScoped();
                break;
            case jec_jdi_1.ScopeType.DEPENDENT:
            case null || undefined:
            default:
        }
        return resolved;
    }
}
ScopeStrategy._locked = true;
ScopeStrategy.INSTANCE = null;
exports.ScopeStrategy = ScopeStrategy;
