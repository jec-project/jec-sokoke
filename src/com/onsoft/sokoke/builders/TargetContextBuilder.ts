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

import {TargetContext, DecoratedType} from "jec-jdi";
import {SingletonErrorFactory} from "../utils/SingletonErrorFactory";

/**
 * The <code>TargetContextBuilder</code> singleton allows to build new 
 * <code>TargetContext</code> objects from the specified parameters.
 */
export class TargetContextBuilder {
  
  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>TargetContextBuilder</code> instance.
   */
  constructor() {
    if(TargetContextBuilder._locked || TargetContextBuilder.INSTANCE) {
      new SingletonErrorFactory().throw(TargetContextBuilder);
    }
    TargetContextBuilder._locked = true;
  }

  //////////////////////////////////////////////////////////////////////////////
  // Singleton managment
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Prevents <code>TargetContextBuilder</code> illegal instanciations.
   */
  private static _locked:boolean = true;

  /**
   * The <code>TargetContextBuilder</code> singleton instance reference.
   */
  private static INSTANCE:TargetContextBuilder = null;

  /**
   * Returns a reference to the <code>TargetContextBuilder</code> singleton.
   *
   * @return {TargetContextBuilder} a reference to the 
   *                             <code>TargetContextBuilder</code> singleton.
   */
  public static getInstance():TargetContextBuilder {
    if(TargetContextBuilder.INSTANCE === null) {
      TargetContextBuilder._locked = false;
      TargetContextBuilder.INSTANCE = new TargetContextBuilder();
    }
    return TargetContextBuilder.INSTANCE;
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Returns a new <code>TargetContext</code> object, built from the specified
   * parameters.
   * 
   * @param {any} target the target associated whith the new
   *                     <code>TargetContext</code> object.
   * @param {string|Symbol} key the name of the target member associated whith 
   *                            the new <code>TargetContext</code> object.
   * @param {DecoratedType} decoratedType the type of decorator used to perform
   *                                      the current dependency injection.
   * @param {number} parameterIndex the index position of the parameter if
   *                                <code>decoratedType</code> is
   *                                <code>DecoratedType.PARAMETER</code>.
   */
  public build(target:any, key:string|Symbol, decoratedType:DecoratedType,
                                     parameterIndex:number = -1):TargetContext {
    let context:TargetContext = {
      target: target,
      key: key,
      parameterIndex: parameterIndex,
      decoratedType: decoratedType
    };
    return context;
  }
}