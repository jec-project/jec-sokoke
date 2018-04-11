"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SingletonErrorFactory_1 = require("../utils/SingletonErrorFactory");
const SokokeMetadataRefs_1 = require("./SokokeMetadataRefs");
class SokokeMetadataExtractor {
    constructor() {
        if (SokokeMetadataExtractor._locked || SokokeMetadataExtractor.INSTANCE) {
            new SingletonErrorFactory_1.SingletonErrorFactory().throw(SokokeMetadataExtractor);
        }
        SokokeMetadataExtractor._locked = true;
    }
    static getInstance() {
        if (SokokeMetadataExtractor.INSTANCE === null) {
            SokokeMetadataExtractor._locked = false;
            SokokeMetadataExtractor.INSTANCE = new SokokeMetadataExtractor();
        }
        return SokokeMetadataExtractor.INSTANCE;
    }
    extractContext(bean) {
        return bean[SokokeMetadataRefs_1.SokokeMetadataRefs.SOKOKE_CONTEXT_METADATA];
    }
}
SokokeMetadataExtractor._locked = true;
SokokeMetadataExtractor.INSTANCE = null;
exports.SokokeMetadataExtractor = SokokeMetadataExtractor;
