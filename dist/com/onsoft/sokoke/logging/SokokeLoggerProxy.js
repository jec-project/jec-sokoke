"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jec_commons_1 = require("jec-commons");
class SokokeLoggerProxy extends jec_commons_1.AbstractLoggerProxy {
    constructor() {
        super("[SANDCAT]");
        if (SokokeLoggerProxy._locked || SokokeLoggerProxy.INSTANCE) {
            this.throwSingletonError("SokokeLoggerProxy");
        }
        SokokeLoggerProxy._locked = true;
    }
    static getInstance() {
        if (SokokeLoggerProxy.INSTANCE === null) {
            SokokeLoggerProxy._locked = false;
            SokokeLoggerProxy.INSTANCE = new SokokeLoggerProxy();
        }
        return SokokeLoggerProxy.INSTANCE;
    }
}
SokokeLoggerProxy.INSTANCE = null;
SokokeLoggerProxy._locked = true;
exports.SokokeLoggerProxy = SokokeLoggerProxy;
;
