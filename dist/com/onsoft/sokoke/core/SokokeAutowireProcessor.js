"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SokokeLoggerProxy_1 = require("../logging/SokokeLoggerProxy");
const SokokeLocaleManager_1 = require("../i18n/SokokeLocaleManager");
class SokokeAutowireProcessor {
    constructor() {
        this.initObj();
    }
    initObj() {
        SokokeLocaleManager_1.SokokeLocaleManager.getInstance();
    }
    resolveInjectionPoints() {
        let logger = SokokeLoggerProxy_1.SokokeLoggerProxy.getInstance();
        logger.log("resolveInjectionPoints");
    }
    processStart(watcher, sourcePath) {
        SokokeLoggerProxy_1.SokokeLoggerProxy.getInstance().log("Sokoke processStart");
    }
    process(file, watcher) {
        let decorators = file.decorators;
        let len = decorators.length;
        let decorator = null;
        let classPath = null;
        let decoratorName = null;
        let logger = SokokeLoggerProxy_1.SokokeLoggerProxy.getInstance();
        let fileName = file.name;
        while (len--) {
            decorator = decorators[len];
            classPath = decorator.classPath;
            decoratorName = decorator.name;
            if (classPath === SokokeAutowireProcessor.JDI_MASK &&
                decoratorName === SokokeAutowireProcessor.INJECTABLE_MASK) {
                console.log(`------------------>
decoratorName=${decoratorName}
<------------------`);
                logger.log("autowired bean detected: source file='" + fileName + "'");
            }
        }
    }
    processComplete(watcher, sourcePath) {
        SokokeLoggerProxy_1.SokokeLoggerProxy.getInstance().log("Sokoke processComplete");
    }
}
SokokeAutowireProcessor.JDI_MASK = "jec-jdi";
SokokeAutowireProcessor.INJECTABLE_MASK = "Injectable";
exports.SokokeAutowireProcessor = SokokeAutowireProcessor;
