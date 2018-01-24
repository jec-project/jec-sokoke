"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class InjectParamsRegExp {
}
InjectParamsRegExp.INJECT_MATCHER = /(?:jec_jdi_\d+\.Inject\(\{{1})((\s*?.*?)*?)(?:\}{1}\))/gm;
exports.InjectParamsRegExp = InjectParamsRegExp;
