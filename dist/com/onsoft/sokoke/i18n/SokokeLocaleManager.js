"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jec_commons_node_1 = require("jec-commons-node");
const jec_commons_1 = require("jec-commons");
class SokokeLocaleManager {
    constructor() {
        let msg = null;
        let isInstanciated = SokokeLocaleManager.INSTANCE !== null;
        if (SokokeLocaleManager._locked || isInstanciated) {
            if (isInstanciated && SokokeLocaleManager.INSTANCE.isInitialized()) {
                msg = SokokeLocaleManager.getInstance().get("errors.singleton", "SokokeLocaleManager");
            }
            else {
                msg = "You cannot create a SokokeLocaleManager instance; " +
                    "use getInstance() instead.";
            }
            throw new jec_commons_1.SingletonError(msg);
        }
        SokokeLocaleManager._locked = true;
    }
    static getInstance() {
        if (SokokeLocaleManager.INSTANCE === null) {
            SokokeLocaleManager._locked = false;
            SokokeLocaleManager.INSTANCE = new jec_commons_node_1.LocaleManagerBase();
        }
        return SokokeLocaleManager.INSTANCE;
    }
}
SokokeLocaleManager._locked = true;
SokokeLocaleManager.INSTANCE = null;
exports.SokokeLocaleManager = SokokeLocaleManager;
