"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jec_commons_node_1 = require("jec-commons-node");
const SingletonErrorFactory_1 = require("../utils/SingletonErrorFactory");
class SokokeLocaleManager {
    constructor() {
        let isInstanciated = SokokeLocaleManager.INSTANCE !== null;
        if (SokokeLocaleManager._locked || isInstanciated) {
            new SingletonErrorFactory_1.SingletonErrorFactory().throw(SokokeLocaleManager);
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
