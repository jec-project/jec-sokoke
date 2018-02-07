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

import {InjectParamsEvaluator} from "../utils/reflection/InjectParamsEvaluator";
import {FileProperties, LogLevel} from "jec-commons";
import {Bean, InjectionPoint, BeanManager} from "jec-jdi";
import {Sokoke} from "../inject/Sokoke";
import {SokokeLocaleManager} from "../i18n/SokokeLocaleManager";
import {SokokeLoggerProxy} from "../logging/SokokeLoggerProxy";

/**
 * The <code>BeanMethodInvoker</code> provides the API for working with methods
 * used to process dependency injection.
 */
export class BeanMethodInvoker {
  
  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>BeanMethodInvoker</code> instance.
   */
  constructor() {
    this.initObj();
  }

  //////////////////////////////////////////////////////////////////////////////
  // Private properties
  //////////////////////////////////////////////////////////////////////////////

  //////////////////////////////////////////////////////////////////////////////
  // Private methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Initializes this object.
   */
  private initObj():void {
    
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * 
   * @param {any} target 
   */
  public initInstance(target:any):void {
    
  }
}