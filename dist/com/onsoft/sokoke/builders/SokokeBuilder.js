"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DefaultSokokeContainer_1 = require("../core/DefaultSokokeContainer");
class SokokeBuilder {
    constructor() { }
    build(container) {
        let sandcat = new DefaultSokokeContainer_1.DefaultSokokeContainer();
        sandcat.setDomainContainer(container);
        return sandcat;
    }
}
exports.SokokeBuilder = SokokeBuilder;
;
