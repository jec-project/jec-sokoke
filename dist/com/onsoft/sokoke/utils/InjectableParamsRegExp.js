"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class InjectableParamsRegExp {
    static getTypeMatcher(impRef) {
        let pattern = `(?:const ${impRef} = require\\(\\\")(.*)(?:\\\"\\);)`;
        let matcher = new RegExp(pattern);
        return matcher;
    }
}
InjectableParamsRegExp.INJECTABLE_MATCHER = /(?:jec_jdi_\d+\.Injectable\(\{{1})((\s*?.*?)*?)(?:\}{1}\))/gm;
InjectableParamsRegExp.PARAMS_MATCHER = /(name|type|scope|retention|qualifier)(?:\s*:\s*)(.*)/gm;
exports.InjectableParamsRegExp = InjectableParamsRegExp;
