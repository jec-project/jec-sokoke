//  DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS HEADER.
//
//   Copyright 2016-2018 Pascal ECHEMANN.
//
//   Licensed under the Apache License, Version 2.0 (the "License");
//   you may not use this file except in compliance with the License.
//   You may obtain a copy of the License at
//
//       http://www.apache.org/licenses/LICENSE-2.0
//
//   Unless required by applicable law or agreed to in writing, software
//   distributed under the License is distributed on an "AS IS" BASIS,
//   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//   See the License for the specific language governing permissions and
//   limitations under the License.

import {JcadContext, Decorator, DecoratorConnector, JcadContextManager,
        DecoratorConnectorManager} from "jec-commons";
import {JdiConnectorRefs} from "jec-jdi";
import {JdiConnector} from "./connectors/JdiConnector";
import {InjectableDecorator} from "./decorators/InjectableDecorator";
import {InjectParameterDecorator} from "./decorators/InjectParameterDecorator";
import {InjectFieldDecorator} from "./decorators/InjectFieldDecorator";

/**
 * A helper class that is used to manage desciptor contexts for the JDI
 * specification.
 */
export class JdiContextManager {

  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>JdiContextManager</code> instance.
   */
  constructor() { }

  //////////////////////////////////////////////////////////////////////////////
  // Private properties
  //////////////////////////////////////////////////////////////////////////////

  /**
   * The reference to the <code>JcadContext</code> associated with this
   * manager.
   */
  private _jcadContext:JcadContext = null;

  //////////////////////////////////////////////////////////////////////////////
  // Private methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Initializes the context for the specified reference.
   * 
   * @param {JdiConnectorRefs} jcadReference the reference to the context to
   *                                         initialize.
   * @param {Class} decoratorClass the reference to the decorator class
   *                               associated whith the context to initialize.
   */
  private initContext(jcadReference:JdiConnectorRefs, decoratorClass:any):void {
    const ctxManager: JcadContextManager = JcadContextManager.getInstance();
    const connManager: DecoratorConnectorManager =
      DecoratorConnectorManager.getInstance();
    const decorator: Decorator = new decoratorClass();
    const connector: DecoratorConnector =
                                     new JdiConnector(jcadReference, decorator);
    ctxManager.addContext(jcadReference, this._jcadContext);
    connManager.addConnector(connector, this._jcadContext);
  }

  /**
   * Removes the context with the specified reference.
   * 
   * @param {JdiConnectorRefs} jcadReference the reference of the context to
   *                                         remove.
   */
  private removeContext(jcadReference:JdiConnectorRefs):void {
    const ctxManager: JcadContextManager = JcadContextManager.getInstance();
    const connManager: DecoratorConnectorManager =
      DecoratorConnectorManager.getInstance();
    connManager.removeConnector(jcadReference, this._jcadContext);
    ctxManager.removeContext(jcadReference);
  }

  //////////////////////////////////////////////////////////////////////////////
  // public methods
  //////////////////////////////////////////////////////////////////////////////

  /**
    * Initializes the JCAD context associated with this object.
    * 
    * @param {JcadContext} jcadContext the context of the current JEC container.
    */
  public createContext(jcadContext:JcadContext):void {
    this._jcadContext = jcadContext,
    this.initContext(
      JdiConnectorRefs.INJECT_PARAMETER_CONNECTOR_REF, InjectParameterDecorator
    );
    this.initContext(
      JdiConnectorRefs.INJECT_FIELD_CONNECTOR_REF, InjectFieldDecorator
    );
    this.initContext(
      JdiConnectorRefs.INJECTABLE_CONNECTOR_REF, InjectableDecorator
    );
  }

  /**
    * Finalizes the JCAD context associated with this object.
    */
  public deleteContext():void {
    this.removeContext(JdiConnectorRefs.INJECT_PARAMETER_CONNECTOR_REF);
    this.removeContext(JdiConnectorRefs.INJECT_FIELD_CONNECTOR_REF);
    this.removeContext(JdiConnectorRefs.INJECTABLE_CONNECTOR_REF);
    this._jcadContext = null;
  }
}