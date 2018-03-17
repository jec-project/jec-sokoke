"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SokokeLocaleManager_1 = require("../i18n/SokokeLocaleManager");
const jec_commons_1 = require("jec-commons");
class SingletonErrorFactory {
    constructor() { }
    throw(contextClass) {
        const classRef = contextClass.constructor.name;
        const i18n = SokokeLocaleManager_1.SokokeLocaleManager.getInstance();
        let msg = null;
        if (i18n.isInitialized()) {
            msg = i18n.get("errors.singleton", classRef);
        }
        else {
            msg =
                `You cannot create a ${classRef} instance; use getInstance() instead.`;
        }
        throw new jec_commons_1.SingletonError(msg);
    }
}
exports.SingletonErrorFactory = SingletonErrorFactory;
