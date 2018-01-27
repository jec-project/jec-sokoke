"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SokokeLocaleManager_1 = require("../i18n/SokokeLocaleManager");
const jec_commons_1 = require("jec-commons");
const SokokeBeanManager_1 = require("../inject/SokokeBeanManager");
class BeanManagerBuilder {
    constructor() {
        let msg = null;
        let i18n = null;
        if (BeanManagerBuilder._locked || BeanManagerBuilder.INSTANCE) {
            i18n = SokokeLocaleManager_1.SokokeLocaleManager.getInstance();
            if (i18n.isInitialized()) {
                msg = i18n.get("errors.singleton", "BeanManagerBuilder");
            }
            else {
                msg = "You cannot create a BeanManagerBuilder instance; " +
                    "use getInstance() instead.";
            }
            throw new jec_commons_1.SingletonError(msg);
        }
        BeanManagerBuilder._locked = true;
    }
    static getInstance() {
        if (BeanManagerBuilder.INSTANCE === null) {
            BeanManagerBuilder._locked = false;
            BeanManagerBuilder.INSTANCE = new BeanManagerBuilder();
        }
        return BeanManagerBuilder.INSTANCE;
    }
    build(context) {
        let beanManager = new SokokeBeanManager_1.SokokeBeanManager(context);
        return beanManager;
    }
}
BeanManagerBuilder._locked = true;
BeanManagerBuilder.INSTANCE = null;
exports.BeanManagerBuilder = BeanManagerBuilder;
