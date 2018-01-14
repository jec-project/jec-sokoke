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
import {BeanManager, JdiContainer} from "jec-jdi";

/**
 * The <code>JdiContainer</code> class is the Sokoke framework 
 * implementation of the <code>JdiContainer</code> interface.
 */
export class SokokeContainer implements JdiContainer {
  
  ////////////////////////////////////////////////////////////////////////////
  // Constructor function
  ////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>SokokeContainer</code> instance.
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
  public getId():string {
    throw new Error("Method not implemented.");
  }

  /**
   * @inheritDoc
   */
  public getBeanManager(key:string):BeanManager {
    throw new Error("Method not implemented.");
  }
  
  /**
   * @inheritDoc
   */
  public setBeanManager(beanManager:BeanManager, key:string):void {
    throw new Error("Method not implemented.");
  }
}