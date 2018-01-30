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

import {Bean, InjectionPoint} from "jec-jdi";
import {SingletonErrorFactory} from "../SingletonErrorFactory";

/**
 * A singleton that prevents circular injections whithin a bean file.
 */
export class BeanInjectionValidator {

  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>BeanInjectionValidator</code> instance.
   */
  constructor() {
    if(BeanInjectionValidator._locked || BeanInjectionValidator.INSTANCE) {
      new SingletonErrorFactory().throw(BeanInjectionValidator);
    }
    BeanInjectionValidator._locked = true;
  }

  //////////////////////////////////////////////////////////////////////////////
  // Singleton managment
  //////////////////////////////////////////////////////////////////////////////

  /**
   * The <code>BeanInjectionValidator</code> singleton instance reference.
   */
  private static INSTANCE:BeanInjectionValidator = null;

  /**
   * Prevents <code>BeanInjectionValidator</code> illegal instanciations.
   */
  private static _locked:boolean = true;

  /**
   * Returns a reference to the <code>BeanInjectionValidator</code> singleton.
   * 
   * @return {BeanInjectionValidator} a reference to the
   *                                  <code>BeanInjectionValidator</code>
   *                                  singleton.
   */
  public static getInstance():BeanInjectionValidator{
    if(BeanInjectionValidator.INSTANCE === null) {
      BeanInjectionValidator._locked = false;
      BeanInjectionValidator.INSTANCE = new BeanInjectionValidator();
    }
    return BeanInjectionValidator.INSTANCE;
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * A visitor function that validates dependency injection for the specified
   * bean object.
   * 
   * @param {Bean} bean the bean object for which to perform validation.
   * @param {Array<InjectionPoint>} injectionPoints the list of injection points
   *                                                associated whith the bean
   *                                                object to validate.
   */
  public validate(bean:Bean, injectionPoints:Array<InjectionPoint>):void {
    if(bean) {

    }
  }
};
