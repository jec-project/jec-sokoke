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
import {BeanManager} from "jec-jdi";
import {SingletonError} from "jec-commons";
import {LocaleManager} from "jec-commons-node";
import {SokokeBeanManager} from "../inject/SokokeBeanManager";
import {SokokeContext} from "../inject/SokokeContext";

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
    let msg:string = null;
    let i18n:LocaleManager = null;
    if(BeanManagerBuilder._locked || BeanManagerBuilder.INSTANCE) {
      i18n = SokokeLocaleManager.getInstance();
      if(i18n.isInitialized()) {
        msg = i18n.get("errors.singleton", "BeanManagerBuilder");
      } else {
        msg = "You cannot create a BeanManagerBuilder instance; " +
              "use getInstance() instead.";
      }
      throw new SingletonError(msg);
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
    let beanManager:BeanManager = new SokokeBeanManager(context);
    return beanManager;
  }
}