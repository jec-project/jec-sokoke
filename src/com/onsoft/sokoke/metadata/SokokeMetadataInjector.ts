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

import {SokokeContext} from "../core/SokokeContext";
import {SingletonErrorFactory} from "../utils/SingletonErrorFactory";
import {SokokeMetadataRefs} from "./SokokeMetadataRefs";

/**
 * The <code>SokokeMetadataInjector</code> singleton allows to inject metadata 
 * into a bean.  
 */
export class SokokeMetadataInjector {
  
  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>SokokeMetadataInjector</code> instance.
   */
  constructor() {
    if(SokokeMetadataInjector._locked || SokokeMetadataInjector.INSTANCE) {
      new SingletonErrorFactory().throw(SokokeMetadataInjector);
    }
    SokokeMetadataInjector._locked = true;
  }

  //////////////////////////////////////////////////////////////////////////////
  // Singleton managment
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Prevents <code>SokokeMetadataInjector</code> illegal instanciations.
   */
  private static _locked:boolean = true;

  /**
   * The <code>SokokeMetadataInjector</code> singleton instance reference.
   */
  private static INSTANCE:SokokeMetadataInjector = null;

  /**
   * Returns a reference to the <code>SokokeMetadataInjector</code> singleton.
   *
   * @return {SokokeMetadataInjector} a reference to the 
   *                                  <code>SokokeMetadataInjector</code>
   *                                  singleton.
   */
  public static getInstance():SokokeMetadataInjector {
    if(SokokeMetadataInjector.INSTANCE === null) {
      SokokeMetadataInjector._locked = false;
      SokokeMetadataInjector.INSTANCE = new SokokeMetadataInjector();
    }
    return SokokeMetadataInjector.INSTANCE;
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Injects Sokoke metadata into the specified bean.
   * 
   * @param {any} bean the bean into which to inject Sokoke metadata.
   * @param {SokokeContext} context the current Sokoke context.
   */
  public inject(bean:any, context:SokokeContext):void {
    Object.defineProperty(
      bean,
      SokokeMetadataRefs.SOKOKE_METADATA,
      {
        value: context,
        writable: false,
        configurable: false,
        enumerable: false
      }
    );
  }
}