"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SingletonErrorFactory_1 = require("./SingletonErrorFactory");
const path = require("path");
class ClassPathBuilder {
    constructor() {
        this.DOT = ".";
        if (ClassPathBuilder._locked || ClassPathBuilder.INSTANCE) {
            new SingletonErrorFactory_1.SingletonErrorFactory().throw(ClassPathBuilder);
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
        const fileName = file.name + this.DOT + file.extension;
        const filePath = path.join(file.path, fileName);
        return filePath;
    }
}
ClassPathBuilder._locked = true;
ClassPathBuilder.INSTANCE = null;
exports.ClassPathBuilder = ClassPathBuilder;
