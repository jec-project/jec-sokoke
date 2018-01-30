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

import {SingletonErrorFactory} from "./SingletonErrorFactory";

/**
 * The <code>HashCodeBuilder</code> singleton allows to build Sokoke non-secure  
 * hash code values from strings.
 */
export class HashCodeBuilder {
  
  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>HashCodeBuilder</code> instance.
   */
  constructor() {
    if(HashCodeBuilder._locked || HashCodeBuilder.INSTANCE) {
      new SingletonErrorFactory().throw(HashCodeBuilder);
    }
    HashCodeBuilder._locked = true;
  }

  //////////////////////////////////////////////////////////////////////////////
  // Singleton managment
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Prevents <code>HashCodeBuilder</code> illegal instanciations.
   */
  private static _locked:boolean = true;

  /**
   * The <code>HashCodeBuilder</code> singleton instance reference.
   */
  private static INSTANCE:HashCodeBuilder = null;

  /**
   * Returns a reference to the <code>HashCodeBuilder</code> singleton.
   *
   * @return {HashCodeBuilder} a reference to the <code>HashCodeBuilder</code>
   *                         singleton.
   */
  public static getInstance():HashCodeBuilder {
    if(HashCodeBuilder.INSTANCE === null) {
      HashCodeBuilder._locked = false;
      HashCodeBuilder.INSTANCE = new HashCodeBuilder();
    }
    return HashCodeBuilder.INSTANCE;
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Returns a numerical, 32bit integer, hash code for the specified string
   * values.
   * 
   * @param {string[]} values the string values for which to create hash code.
   * @return {number} a numerical, 32bit integer, hash code.
   */
  public build(...values:string[]):number {
    let value:string = values.join();
    let hash:number = 0;
    let char:number = null;
    let len:number = value.length;
    while(len--) {
      char = value.charCodeAt(len);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
  }
}