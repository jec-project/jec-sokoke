"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const InjectParamsRegExp_1 = require("./InjectParamsRegExp");
class InjectParamsEvaluator {
    constructor() { }
    resolveInjectParams(file) {
        let found = null;
        while ((found = InjectParamsRegExp_1.InjectParamsRegExp.DECORATE_MATCHER.exec(file.content))
            !== null) {
            console.log(found[0]);
        }
        return null;
    }
    evaluate(file) {
        let params = this.resolveInjectParams(file);
    }
}
exports.InjectParamsEvaluator = InjectParamsEvaluator;
