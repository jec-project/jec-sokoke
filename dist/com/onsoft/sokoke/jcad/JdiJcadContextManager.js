"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jec_commons_1 = require("jec-commons");
const jec_jdi_1 = require("jec-jdi");
const JdiConnector_1 = require("./connectors/JdiConnector");
const InjectableDecorator_1 = require("./decorators/InjectableDecorator");
const InjectParameterDecorator_1 = require("./decorators/InjectParameterDecorator");
const InjectPropertyDecorator_1 = require("./decorators/InjectPropertyDecorator");
class JdiJcadContextManager {
    constructor() {
        this._jcadContext = null;
    }
    initContext(jcadReference, decoratorClass) {
        let ctxManager = jec_commons_1.JcadContextManager.getInstance();
        let connManager = jec_commons_1.DecoratorConnectorManager.getInstance();
        let decorator = new decoratorClass();
        let connector = new JdiConnector_1.JdiConnector(jcadReference, decorator);
        ctxManager.addContext(jcadReference, this._jcadContext);
        connManager.addConnector(connector, this._jcadContext);
    }
    removeContext(jcadReference) {
        let ctxManager = jec_commons_1.JcadContextManager.getInstance();
        let connManager = jec_commons_1.DecoratorConnectorManager.getInstance();
        connManager.removeConnector(jcadReference, this._jcadContext);
        ctxManager.removeContext(jcadReference);
    }
    createContext(jcadContext) {
        this._jcadContext = jcadContext,
            this.initContext(jec_jdi_1.JdiConnectorRefs.INJECT_PARAMETER_CONNECTOR_REF, InjectParameterDecorator_1.InjectParameterDecorator);
        this.initContext(jec_jdi_1.JdiConnectorRefs.INJECT_PROPERTY_CONNECTOR_REF, InjectPropertyDecorator_1.InjectPropertyDecorator);
        this.initContext(jec_jdi_1.JdiConnectorRefs.INJECTABLE_CONNECTOR_REF, InjectableDecorator_1.InjectableDecorator);
    }
    deleteContext() {
        this.removeContext(jec_jdi_1.JdiConnectorRefs.INJECT_PARAMETER_CONNECTOR_REF);
        this.removeContext(jec_jdi_1.JdiConnectorRefs.INJECT_PROPERTY_CONNECTOR_REF);
        this.removeContext(jec_jdi_1.JdiConnectorRefs.INJECTABLE_CONNECTOR_REF);
        this._jcadContext = null;
    }
}
exports.JdiJcadContextManager = JdiJcadContextManager;
