/*!
 * JEC Sokoke Node Module
 * Copyright(c) 2017 Pascal ECHEMANN
 * Apache 2.0 Licensed
 * This is a part of the JEC Projects: <https://github.com/pechemann/JEC>
 */

"use strict";

/*!
 * Module dependencies.
 * Please maintain package and alphabetical order!
 */

 //--> com/onsoft/builders
export {BeanBuilder} from "./sokoke/builders/BeanBuilder";
export {InjectionPointBuilder} from "./sokoke/builders/InjectionPointBuilder";
//--> com/onsoft/core
export {BeanFactory} from "./sokoke/core/BeanFactory";
export {SokokeAutowireProcessor} from "./sokoke/core/SokokeAutowireProcessor";
//--> com/onsoft/exceptions
export {SokokeError} from "./sokoke/exceptions/SokokeError";
//--> com/onsoft/i18n
export {SokokeLocaleManager} from "./sokoke/i18n/SokokeLocaleManager";
//--> com/onsoft/inject
export {Sokoke} from "./sokoke/inject/Sokoke";
export {SokokeBean} from "./sokoke/inject/SokokeBean";
export {SokokeBeanManager} from "./sokoke/inject/SokokeBeanManager";
export {SokokeContainer} from "./sokoke/inject/SokokeContainer";
export {SokokeInjectionPoint} from "./sokoke/inject/SokokeInjectionPoint";
//--> com/onsoft/jcad/connectors
export {JdiConnector} from "./sokoke/jcad/connectors/JdiConnector";
//--> com/onsoft/jcad/decorators
export {InjectableDecorator} from "./sokoke/jcad/decorators/InjectableDecorator";
export {InjectParameterDecorator} from "./sokoke/jcad/decorators/InjectParameterDecorator";
export {InjectPropertyDecorator} from "./sokoke/jcad/decorators/InjectPropertyDecorator";
//--> com/onsoft/jcad
export {JdiContextManager} from "./sokoke/jcad/JdiContextManager";
//--> com/onsoft/logging
export {SokokeLoggerProxy} from "./sokoke/logging/SokokeLoggerProxy";
//--> com/onsoft/utils
export {InjectableParamsEvaluator} from "./sokoke/utils/InjectableParamsEvaluator";
export {InjectableParamsString} from "./sokoke/utils/InjectableParamsString";
export {ScopeStrategy} from "./sokoke/utils/ScopeStrategy";

