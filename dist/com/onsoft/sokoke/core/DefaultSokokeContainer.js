"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DefaultSokokeContainer {
    constructor() {
        this._domainContainer = null;
        this.initObj();
    }
    initObj() {
    }
    getDomainContainer() {
        return this._domainContainer;
    }
    setDomainContainer(container) {
        let message = "domain container initialized:";
        this._domainContainer = container;
    }
    process(callback) {
        let message = "Sokoke process start";
        callback(null);
    }
}
exports.DefaultSokokeContainer = DefaultSokokeContainer;
;
