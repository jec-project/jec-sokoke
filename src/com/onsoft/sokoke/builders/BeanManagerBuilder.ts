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

import {BeanManager} from "jec-jdi";
import {SokokeBeanManager} from "../inject/SokokeBeanManager";
import {SokokeContext} from "../core/SokokeContext";
import {SingletonErrorFactory} from "../utils/SingletonErrorFactory";

/**
 * The <code>BeanManagerBuilder</code> singleton allows to build new
 * <code>BeanManager</code> objects from the specified parameters.
 */
export class BeanManagerBuilder {
  
  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>BeanManagerBuilder</code> instance.
   */
  constructor() {
    if(BeanManagerBuilder._locked || BeanManagerBuilder.INSTANCE) {
      new SingletonErrorFactory().throw(BeanManagerBuilder);
    }
    BeanManagerBuilder._locked = true;
  }

  //////////////////////////////////////////////////////////////////////////////
  // Singleton managment
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Prevents <code>BeanManagerBuilder</code> illegal instanciations.
   */
  private static _locked:boolean = true;

  /**
   * The <code>BeanManagerBuilder</code> singleton instance reference.
   */
  private static INSTANCE:BeanManagerBuilder = null;

  /**
   * Returns a reference to the <code>BeanManagerBuilder</code> singleton.
   *
   * @return {BeanManagerBuilder} a reference to the
   *                              <code>BeanManagerBuilder</code> singleton.
   */
  public static getInstance():BeanManagerBuilder {
    if(BeanManagerBuilder.INSTANCE === null) {
      BeanManagerBuilder._locked = false;
      BeanManagerBuilder.INSTANCE = new BeanManagerBuilder();
    }
    return BeanManagerBuilder.INSTANCE;
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates and returns a new <code>BeanManager</code> object.
   * 
   * @param {SokokeContext} context the context associated with the new
   *                                <code>SokokeContext</code> object.
   * @return {BeanManager} a new <code>BeanManager</code> object.
   */
  public build(context:SokokeContext):BeanManager {
    const beanManager:BeanManager = new SokokeBeanManager(context);
    return beanManager;
  }
}