"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SokokeContainer_1 = require("../inject/SokokeContainer");
class JdiContainerFactory {
    constructor() { }
    create() {
        let container = new SokokeContainer_1.SokokeContainer();
        return container;
    }
}
exports.JdiContainerFactory = JdiContainerFactory;
