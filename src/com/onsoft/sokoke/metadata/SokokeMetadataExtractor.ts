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
 * The <code>SokokeMetadataExtractor</code> singleton allows to inject metadata 
 * into a bean.  
 */
export class SokokeMetadataExtractor {
  
  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>SokokeMetadataExtractor</code> instance.
   */
  constructor() {
    if(SokokeMetadataExtractor._locked || SokokeMetadataExtractor.INSTANCE) {
      new SingletonErrorFactory().throw(SokokeMetadataExtractor);
    }
    SokokeMetadataExtractor._locked = true;
  }

  //////////////////////////////////////////////////////////////////////////////
  // Singleton managment
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Prevents <code>SokokeMetadataExtractor</code> illegal instanciations.
   */
  private static _locked:boolean = true;

  /**
   * The <code>SokokeMetadataExtractor</code> singleton instance reference.
   */
  private static INSTANCE:SokokeMetadataExtractor = null;

  /**
   * Returns a reference to the <code>SokokeMetadataExtractor</code> singleton.
   *
   * @return {SokokeMetadataExtractor} a reference to the 
   *                                  <code>SokokeMetadataExtractor</code>
   *                                  singleton.
   */
  public static getInstance():SokokeMetadataExtractor {
    if(SokokeMetadataExtractor.INSTANCE === null) {
      SokokeMetadataExtractor._locked = false;
      SokokeMetadataExtractor.INSTANCE = new SokokeMetadataExtractor();
    }
    return SokokeMetadataExtractor.INSTANCE;
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Extracts Sokoke metadata from the specified bean.
   * 
   * @param {any} bean the bean from which to extract Sokoke metadata.
   */
  public extract(bean:any):any {
    return bean[SokokeMetadataRefs.SOKOKE_CONTEXT_METADATA];
  }
}