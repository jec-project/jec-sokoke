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

import {Scope, ScopeType, ApplicationScoped, RequestScoped, SessionScoped} from "jec-jdi";
import {SingletonErrorFactory} from "./SingletonErrorFactory";

/**
 * The <code>ScopeStrategy</code> singleton allows to build new  
 * <code>Scope</code> objects, depending on the specified context for a bean.
 */
export class ScopeStrategy {
  
  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>ScopeStrategy</code> instance.
   */
  constructor() {
    if(ScopeStrategy._locked || ScopeStrategy.INSTANCE) {
      new SingletonErrorFactory().throw(ScopeStrategy);
    }
    ScopeStrategy._locked = true;
  }

  //////////////////////////////////////////////////////////////////////////////
  // Singleton managment
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Prevents <code>ScopeStrategy</code> illegal instanciations.
   */
  private static _locked:boolean = true;

  /**
   * The <code>ScopeStrategy</code> singleton instance reference.
   */
  private static INSTANCE:ScopeStrategy = null;

  /**
   * Returns a reference to the <code>ScopeStrategy</code> singleton.
   *
   * @return {ScopeStrategy} a reference to the <code>ScopeStrategy</code>
   *                         singleton.
   */
  public static getInstance():ScopeStrategy {
    if(ScopeStrategy.INSTANCE === null) {
      ScopeStrategy._locked = false;
      ScopeStrategy.INSTANCE = new ScopeStrategy();
    }
    return ScopeStrategy.INSTANCE;
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Returns a new <code>Scope</code> object, depending on the specified
   * <code>scope</code> parameter.
   * 
   * @param {ScopeType} scope the <code>ScopeType</code value used to create a 
   *                          new <code>Scope</code> object.
   * @return {Scope} a new <code>Scope</code> object, depending on the specified
   *                 <code>scope</code> parameter.
   */
  public resolve(scope:ScopeType):Scope {
    let resolved:Scope = null;
    switch(scope) {
      case ScopeType.APPLICATION :
        resolved = new ApplicationScoped();
        break;
      case ScopeType.REQUEST :
        resolved = new RequestScoped();
        break;
      case ScopeType.SESSION :
        resolved = new SessionScoped();
        break;
      // Custom scope process will be placed here...
      //
      // Default scope:
      case ScopeType.DEPENDENT :
      case null || undefined :
      default :
    }
    return resolved;
  }
}