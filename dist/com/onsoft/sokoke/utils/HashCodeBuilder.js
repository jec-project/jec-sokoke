"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SokokeLocaleManager_1 = require("../i18n/SokokeLocaleManager");
const jec_commons_1 = require("jec-commons");
class HashCodeBuilder {
    constructor() {
        let msg = null;
        let i18n = null;
        if (HashCodeBuilder._locked || HashCodeBuilder.INSTANCE) {
            i18n = SokokeLocaleManager_1.SokokeLocaleManager.getInstance();
            if (i18n.isInitialized()) {
                msg = i18n.get("errors.singleton", "HashCodeBuilder");
            }
            else {
                msg = "You cannot create a HashCodeBuilder instance; " +
                    "use getInstance() instead.";
            }
            throw new jec_commons_1.SingletonError(msg);
        }
        HashCodeBuilder._locked = true;
    }
    static getInstance() {
        if (HashCodeBuilder.INSTANCE === null) {
            HashCodeBuilder._locked = false;
            HashCodeBuilder.INSTANCE = new HashCodeBuilder();
        }
        return HashCodeBuilder.INSTANCE;
    }
    build(...values) {
        let value = values.join();
        let hash = 0;
        let char = null;
        let len = value.length;
        while (len--) {
            char = value.charCodeAt(len);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        return hash;
    }
}
HashCodeBuilder._locked = true;
HashCodeBuilder.INSTANCE = null;
exports.HashCodeBuilder = HashCodeBuilder;
