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

import {SokokeLoggerProxy} from "../logging/SokokeLoggerProxy";
import {BeanManager, InjectionPoint, Bean} from "jec-jdi";
import {SokokeError} from "../exceptions/SokokeError";

/**
 * The <code>SokokeBeanManager</code> class is the Sokoke framework 
 * implementation of the <code>BeanManager</code> interface.
 */
export class SokokeBeanManager implements BeanManager {
  
  ////////////////////////////////////////////////////////////////////////////
  // Constructor function
  ////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>SokokeBeanManager</code> instance.
   */
  constructor() {
    this.initObj();
  }

  ////////////////////////////////////////////////////////////////////////////
  // Private methods
  ////////////////////////////////////////////////////////////////////////////

  /**
   * Initializes this object.
   */
  private initObj():void {

  }

  ////////////////////////////////////////////////////////////////////////////
  // Public methods
  ////////////////////////////////////////////////////////////////////////////

  /**
   * @inheritDoc
   */
  public addBean(bean:Bean):void {
    //TODO
  }

  /**
   * @inheritDoc
   */
  public getBeans(injectionPoint:InjectionPoint):Set<Bean> {
    let result:Set<Bean> = new Set<Bean>();
    //TODO
    return result;
  }
}