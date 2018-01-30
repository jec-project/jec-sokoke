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

import {InjectionTarget, DecoratedType} from "jec-jdi";
import {SingletonErrorFactory} from "../utils/SingletonErrorFactory";

/**
 * The <code>InjectionTargetBuilder</code> singleton allows to build new 
 * <code>InjectionTarget</code> objects from the specified parameters.
 */
export class InjectionTargetBuilder {
  
  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>InjectionTargetBuilder</code> instance.
   */
  constructor() {
    if(InjectionTargetBuilder._locked || InjectionTargetBuilder.INSTANCE) {
      new SingletonErrorFactory().throw(InjectionTargetBuilder);
    }
    InjectionTargetBuilder._locked = true;
  }

  //////////////////////////////////////////////////////////////////////////////
  // Singleton managment
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Prevents <code>InjectionTargetBuilder</code> illegal instanciations.
   */
  private static _locked:boolean = true;

  /**
   * The <code>InjectionTargetBuilder</code> singleton instance reference.
   */
  private static INSTANCE:InjectionTargetBuilder = null;

  /**
   * Returns a reference to the <code>InjectionTargetBuilder</code> singleton.
   *
   * @return {InjectionTargetBuilder} a reference to the 
   *                                  <code>InjectionTargetBuilder</code>
   *                                  singleton.
   */
  public static getInstance():InjectionTargetBuilder {
    if(InjectionTargetBuilder.INSTANCE === null) {
      InjectionTargetBuilder._locked = false;
      InjectionTargetBuilder.INSTANCE = new InjectionTargetBuilder();
    }
    return InjectionTargetBuilder.INSTANCE;
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Returns a new <code>InjectionTarget</code> object, built from the specified
   * parameters.
   * 
   * @param {any} target the target associated whith the new
   *                     <code>InjectionTarget</code> object.
   * @param {string|Symbol} key the name of the target member associated whith 
   *                            the new <code>InjectionTarget</code> object.
   * @param {DecoratedType} decoratedType the type of decorator used to perform
   *                                      the current dependency injection.
   * @param {number} parameterIndex the index position of the parameter if
   *                                <code>decoratedType</code> is
   *                                <code>DecoratedType.PARAMETER</code>.
   */
  public build(target:any, key:string|Symbol, decoratedType:DecoratedType,
                                   parameterIndex:number = -1):InjectionTarget {
    let context:InjectionTarget = {
      target: target,
      key: key,
      parameterIndex: parameterIndex,
      decoratedType: decoratedType
    };
    return context;
  }
}