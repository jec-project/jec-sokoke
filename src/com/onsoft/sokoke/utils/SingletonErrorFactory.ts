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

import {SokokeLocaleManager} from "../i18n/SokokeLocaleManager";
import {Scope, ScopeType, ApplicationScoped, RequestScoped, SessionScoped} from "jec-jdi";
import {SingletonError} from "jec-commons";
import {LocaleManager} from "jec-commons-node";

/**
 * The <code>SingletonErrorFactory</code> utils allows to create and throw
 * <code>SingletonError</code> exceptions depending on the specified context
 * class.
 */
export class SingletonErrorFactory {
  
  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>SingletonErrorFactory</code> instance.
   */
  constructor() {}

  //////////////////////////////////////////////////////////////////////////////
  // Public methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Throws a <code>SingletonError</code> exception for the specified context
   * class.
   * 
   * @param {string} contextClass the reference to the class for which to throw
   *                              the exception.
   */
  public throw(contextClass:any):void {
    let msg:string = null;
    let classRef:string = contextClass.constructor.name;
    let i18n:LocaleManager = SokokeLocaleManager.getInstance();
    if(i18n.isInitialized()) {
      msg = i18n.get("errors.singleton", classRef);
    } else {
      msg = 
         `You cannot create a ${classRef} instance; use getInstance() instead.`;
    }
    throw new SingletonError(msg);
  }
}