"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jec_commons_1 = require("jec-commons");
const SokokeLoggerProxy_1 = require("../../logging/SokokeLoggerProxy");
const SokokeLocaleManager_1 = require("../../i18n/SokokeLocaleManager");
class InjectableDecorator {
    constructor() { }
    decorate(target, params) {
        SokokeLoggerProxy_1.SokokeLoggerProxy.getInstance().log(SokokeLocaleManager_1.SokokeLocaleManager.getInstance().get("bean.instantiated", target.name, params.scope), jec_commons_1.LogLevel.DEBUG);
        return target;
    }
}
exports.InjectableDecorator = InjectableDecorator;
