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

import {LocaleManagerBase, LocaleManager} from "jec-commons-node";
import {SingletonErrorFactory} from "../utils/SingletonErrorFactory";

/**
 * The <code>SokokeLocaleManager</code> singleton allows to manage the  
 * internationalization context for a Sokoke container.
 */
export class SokokeLocaleManager {

  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>SokokeLocaleManager</code> instance.
   */
  constructor() {
    let isInstanciated:boolean = SokokeLocaleManager.INSTANCE !== null;
    if(SokokeLocaleManager._locked || isInstanciated) {
      new SingletonErrorFactory().throw(SokokeLocaleManager);
    }
    SokokeLocaleManager._locked = true;
  }

  //////////////////////////////////////////////////////////////////////////////
  // Singleton managment
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Prevents <code>LocaleManager</code> illegal instanciations.
   */
  private static _locked:boolean = true;

  /**
   * The <code>LocaleManager</code> singleton instance reference.
   */
  private static INSTANCE:LocaleManager = null;

  /**
   * Returns a reference to the <code>LocaleManager</code> singleton.
   *
   * @return {LocaleManager} a reference to the <code>LocaleManager</code>
   *                         singleton.
   */
  public static getInstance():LocaleManager {
    if(SokokeLocaleManager.INSTANCE === null) {
      SokokeLocaleManager._locked = false;
      SokokeLocaleManager.INSTANCE = new LocaleManagerBase();
    }
    return SokokeLocaleManager.INSTANCE;
  }
}
