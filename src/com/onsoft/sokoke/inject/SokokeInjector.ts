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

import {SingletonErrorFactory} from "../utils/SingletonErrorFactory";
import {Sokoke} from "../inject/Sokoke";
import {InjectionPoint, Scope, Bean, ScopeType} from "jec-jdi";
import {SokokeMetadataRefs} from "../metadata/SokokeMetadataRefs";

/**
 * The <code>SokokeInjector</code> singleton provides operations for performing
 * dependency injection and lifecycle callbacks on an instance of a type.  
 */
export class SokokeInjector {
  
  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>SokokeInjector</code> instance.
   */
  constructor() {
    if(SokokeInjector._locked || SokokeInjector.INSTANCE) {
      new SingletonErrorFactory().throw(SokokeInjector);
    }
    SokokeInjector._locked = true;
  }

  //////////////////////////////////////////////////////////////////////////////
  // Singleton managment
  //////////////////////////////////////////////////////////////////////////////

  /**
   * The <code>SokokeInjector</code> singleton instance reference.
   */
  private static INSTANCE:SokokeInjector = null;

  /**
   * Prevents <code>SokokeInjector</code> illegal instanciations.
   */
  private static _locked:boolean = true;

  /**
   * Returns a reference to the <code>SokokeInjector</code> singleton.
   * 
   * @return {SokokeInjector} a reference to the
   *                          <code>SokokeInjector</code> singleton.
   */
  public static getInstance():SokokeInjector {
    if(SokokeInjector.INSTANCE === null) {
      SokokeInjector._locked = false;
      SokokeInjector.INSTANCE = new SokokeInjector();
    }
    return SokokeInjector.INSTANCE;
  }

  //////////////////////////////////////////////////////////////////////////////
  // Private properties
  //////////////////////////////////////////////////////////////////////////////

  /**
   * The list of <code>ScopeType</code> values used to initialize objects
   * instances.
   */
  public static readonly DEFAULT_SCOPE_TYPES:ScopeType[] = [
    ScopeType.APPLICATION, ScopeType.DEPENDENT
  ];

  //////////////////////////////////////////////////////////////////////////////
  // Public methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Injects dependencies into the target object, depending on the specified
   * scope types.
   * 
   * @param {any} target the object on which to inject dependencies.
   * @param {Array<ScopeType>} scopeTypes the list of scope that are used to
   *                                      resolve dependency injection.
   */
  public inject(target:any, scopeTypes:ScopeType[]):void {
    const sokoke:Sokoke = (Sokoke.getInstance() as Sokoke);
    const injectionPoints:Array<InjectionPoint> =
                     target[SokokeMetadataRefs.SOKOKE_INJECTION_POINT_METADATA];
    let len:number = -1;
    let injectionPoint:InjectionPoint = null;
    let value:any = null;
    let bean:Bean = null;
    let scopeType:ScopeType = null;
    let scope:Scope = null;
    if(injectionPoints) {
      len = injectionPoints.length;
      while(len--) {
        injectionPoint = injectionPoints[len];
        bean = injectionPoint.getBean();
        if(bean) {
          scope = bean.getScope();
          scopeType = scope ? scope.getType() : ScopeType.DEPENDENT;
          if(scopeTypes.indexOf(scopeType)) {
            value = sokoke.getInjectableReference(bean);
            Reflect.defineProperty(
              target, injectionPoint.getElement().getName(), { value: value }
            );
          }
        }
      }
    }
  }
  
  /*
   * 
   */
  public dispose(target:any, scopeTypes:ScopeType[]):void {}
}