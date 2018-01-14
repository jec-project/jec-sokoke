"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SokokeLoggerProxy_1 = require("../logging/SokokeLoggerProxy");
const SokokeLocaleManager_1 = require("../i18n/SokokeLocaleManager");
const path = require("path");
const Sokoke_1 = require("../inject/Sokoke");
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
        let locale = watcher.getContainer().getLocale();
        let localeString = locale.toString();
        let sokokeLocalesPath = path.join(process.cwd(), "node_modules/jec-sokoke/public/locales/");
        let cfg = {
            directory: sokokeLocalesPath
        };
        SokokeLocaleManager_1.SokokeLocaleManager.getInstance().init(localeString, cfg);
        SokokeLoggerProxy_1.SokokeLoggerProxy.getInstance().log(SokokeLocaleManager_1.SokokeLocaleManager.getInstance().get("process.start"));
        Sokoke_1.Sokoke.getInstance();
    }
    process(file, watcher) {
        let decorators = file.decorators;
        let len = decorators.length;
        let decorator = null;
        let classPath = null;
        let decoratorName = null;
        let logger = SokokeLoggerProxy_1.SokokeLoggerProxy.getInstance();
        let i18n = SokokeLocaleManager_1.SokokeLocaleManager.getInstance();
        let fileName = file.name;
        while (len--) {
            decorator = decorators[len];
            classPath = decorator.classPath;
            decoratorName = decorator.name;
            if (classPath === SokokeAutowireProcessor.JDI_MASK &&
                decoratorName === SokokeAutowireProcessor.INJECTABLE_MASK) {
                logger.log(i18n.get("bean.detected", fileName));
            }
        }
    }
    processComplete(watcher, sourcePath) {
        SokokeLoggerProxy_1.SokokeLoggerProxy.getInstance().log(SokokeLocaleManager_1.SokokeLocaleManager.getInstance().get("process.complete"));
    }
}
SokokeAutowireProcessor.JDI_MASK = "jec-jdi";
SokokeAutowireProcessor.INJECTABLE_MASK = "Injectable";
exports.SokokeAutowireProcessor = SokokeAutowireProcessor;
