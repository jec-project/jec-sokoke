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

import {LocaleManager} from "jec-commons-node";
import {SingletonError} from "jec-commons";
import {JDI, JdiContainer, BeanManager} from "jec-jdi";
import {SokokeLocaleManager} from "../i18n/SokokeLocaleManager";

/**
 * The <code>Sokoke</code> singleton is the main entry point of Sokoke
 * containers.
 */
export class Sokoke implements JDI {

  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>Sokoke</code> instance.
   */
  constructor() {
    let msg:string = null;
    let i18n:LocaleManager = null;
    if(Sokoke._locked || Sokoke.INSTANCE) {
      i18n = SokokeLocaleManager.getInstance();
      if(i18n.isInitialized()) {
        msg = i18n.get("errors.singleton", "Sokoke");
      } else {
        msg = "You cannot create a Sokoke instance; " +
              "use getInstance() instead.";
      }
      throw new SingletonError(msg);
    }
    this.initObj();
    Sokoke._locked = true;
  }

  //////////////////////////////////////////////////////////////////////////////
  // Singleton managment
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Prevents <code>Sokoke</code> illegal instanciations.
   */
  private static _locked:boolean = true;

  /**
   * The <code>Sokoke</code> singleton instance reference.
   */
  private static INSTANCE:JDI = null;

  /**
   * Returns a reference to the <code>Sokoke</code> singleton.
   *
   * @return {Sokoke} a reference to the <code>Sokoke</code> singleton.
   */
  public static getInstance():JDI {
    if(Sokoke.INSTANCE === null) {
      Sokoke._locked = false;
      Sokoke.INSTANCE = new Sokoke();
    }
    return Sokoke.INSTANCE;
  }

  //////////////////////////////////////////////////////////////////////////////
  // Private properties
  //////////////////////////////////////////////////////////////////////////////

  /**
   * The <code>JdiContainer</code> instance managerd by this Sokoke object.
   */
  private _container:JdiContainer = null;

  //////////////////////////////////////////////////////////////////////////////
  // Private methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Initializes this object.
   */
  private initObj():void {
    //this._container = new JdiContainerBuilder().build();
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * @inheritDoc
   */
  public getContainer():JdiContainer {
    return this._container;
  }
  
  /**
   * @inheritDoc
   */
  public getBeanManager():BeanManager {
    throw new Error("Method not implemented.");
  }
}
