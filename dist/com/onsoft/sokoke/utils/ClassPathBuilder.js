"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SokokeLocaleManager_1 = require("../i18n/SokokeLocaleManager");
const jec_commons_1 = require("jec-commons");
const path = require("path");
class ClassPathBuilder {
    constructor() {
        this.DOT = ".";
        let msg = null;
        let i18n = null;
        if (ClassPathBuilder._locked || ClassPathBuilder.INSTANCE) {
            i18n = SokokeLocaleManager_1.SokokeLocaleManager.getInstance();
            if (i18n.isInitialized()) {
                msg = i18n.get("errors.singleton", "ClassPathBuilder");
            }
            else {
                msg = "You cannot create a ClassPathBuilder instance; " +
                    "use getInstance() instead.";
            }
            throw new jec_commons_1.SingletonError(msg);
        }
        ClassPathBuilder._locked = true;
    }
    static getInstance() {
        if (ClassPathBuilder.INSTANCE === null) {
            ClassPathBuilder._locked = false;
            ClassPathBuilder.INSTANCE = new ClassPathBuilder();
        }
        return ClassPathBuilder.INSTANCE;
    }
    build(file) {
        let fileName = file.name + this.DOT + file.extension;
        let filePath = path.join(file.path, fileName);
        return filePath;
    }
}
ClassPathBuilder._locked = true;
ClassPathBuilder.INSTANCE = null;
exports.ClassPathBuilder = ClassPathBuilder;
