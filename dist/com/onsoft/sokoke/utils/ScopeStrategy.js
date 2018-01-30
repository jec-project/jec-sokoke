"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jec_jdi_1 = require("jec-jdi");
const SingletonErrorFactory_1 = require("./SingletonErrorFactory");
class ScopeStrategy {
    constructor() {
        if (ScopeStrategy._locked || ScopeStrategy.INSTANCE) {
            new SingletonErrorFactory_1.SingletonErrorFactory().throw(ScopeStrategy);
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
