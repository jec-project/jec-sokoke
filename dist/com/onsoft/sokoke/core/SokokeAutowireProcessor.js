"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SokokeLoggerProxy_1 = require("../logging/SokokeLoggerProxy");
const jec_commons_1 = require("jec-commons");
const SokokeLocaleManager_1 = require("../i18n/SokokeLocaleManager");
const path = require("path");
const Sokoke_1 = require("../inject/Sokoke");
const BeanFactory_1 = require("./BeanFactory");
const InjectionPointFactory_1 = require("../core/InjectionPointFactory");
class SokokeAutowireProcessor {
    constructor() {
        this._beanFactory = null;
        this._injectPointFactory = null;
        this.initObj();
    }
    initObj() {
        SokokeLocaleManager_1.SokokeLocaleManager.getInstance();
        this._beanFactory = new BeanFactory_1.BeanFactory();
        this._injectPointFactory = new InjectionPointFactory_1.InjectionPointFactory();
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
        let hasInjectionPoint = false;
        while (len--) {
            decorator = decorators[len];
            classPath = decorator.classPath;
            decoratorName = decorator.name;
            if (classPath === SokokeAutowireProcessor.JDI_MASK) {
                if (decoratorName === SokokeAutowireProcessor.INJECTABLE_MASK) {
                    logger.log(i18n.get("bean.detected", fileName), jec_commons_1.LogLevel.DEBUG);
                    this._beanFactory.addBeanArchive(file);
                }
                else if (decoratorName === SokokeAutowireProcessor.INJECT_MASK) {
                    hasInjectionPoint = true;
                }
            }
        }
        if (hasInjectionPoint) {
            logger.log(i18n.get("injection.detected", fileName), jec_commons_1.LogLevel.DEBUG);
        }
    }
    processComplete(watcher, sourcePath) {
        SokokeLoggerProxy_1.SokokeLoggerProxy.getInstance().log(SokokeLocaleManager_1.SokokeLocaleManager.getInstance().get("process.complete"));
    }
}
SokokeAutowireProcessor.JDI_MASK = "jec-jdi";
SokokeAutowireProcessor.INJECTABLE_MASK = "Injectable";
SokokeAutowireProcessor.INJECT_MASK = "Inject";
exports.SokokeAutowireProcessor = SokokeAutowireProcessor;
