"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jec_commons_1 = require("jec-commons");
const SokokeLocaleManager_1 = require("../i18n/SokokeLocaleManager");
class Sokoke {
    constructor() {
        this._container = null;
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
    }
    getContainer() {
        return this._container;
    }
    getBeanManager() {
        throw new Error("Method not implemented.");
    }
}
Sokoke._locked = true;
Sokoke.INSTANCE = null;
exports.Sokoke = Sokoke;
