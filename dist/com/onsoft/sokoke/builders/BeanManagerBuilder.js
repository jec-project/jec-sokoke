"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SokokeBeanManager_1 = require("../inject/SokokeBeanManager");
const SingletonErrorFactory_1 = require("../utils/SingletonErrorFactory");
class BeanManagerBuilder {
    constructor() {
        if (BeanManagerBuilder._locked || BeanManagerBuilder.INSTANCE) {
            new SingletonErrorFactory_1.SingletonErrorFactory().throw(BeanManagerBuilder);
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
