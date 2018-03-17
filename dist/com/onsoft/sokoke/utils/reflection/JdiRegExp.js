"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class JdiRegExp {
    static getTypeMatcher(impRef) {
        const pattern = `(?:const ${impRef} = require\\(\\\")(.*)(?:\\\"\\);)`;
        const matcher = new RegExp(pattern);
        return matcher;
    }
}
JdiRegExp.INJECTABLE_MATCHER = /(?:jec_jdi_\d+\.Injectable\(\{{1})((\s*?.*?)*?)(?:\}{1}\))/gm;
JdiRegExp.INJECT_MATCHER = /(?:jec_jdi_\d+\.Inject\(\{{1})((\s*?.*?)*?)(?:\}{1}\))/gm;
JdiRegExp.PARAMS_MATCHER = /(name|type|scope|retention|qualifier)(?:\s*:\s*)(.*)/gm;
exports.JdiRegExp = JdiRegExp;
