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

import {InjectionPoint, Bean} from "jec-jdi";
import {HashCodeBuilder} from "../utils/HashCodeBuilder";
import {SokokeBean} from "../inject/SokokeBean";

/**
 * The <code>InjectionPointManager</code> class allows to manage 
 * <code>InjectionPoint</code> objects in the Sokoke framework.
 */
export class InjectionPointManager {
  
  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>InjectionPointManager</code> instance.
   */
  constructor() {
    this.initObj();
  }

  //////////////////////////////////////////////////////////////////////////////
  // Private properties
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Stores references to all injection points.
   */
  private _injectionPoints:Array<InjectionPoint> = null;

  /**
   * Stores references to all injection points, by using hash references, for 
   * the current context.
   */
  private _injectionPointMap:Map<number, InjectionPoint> = null;

  //////////////////////////////////////////////////////////////////////////////
  // Private methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Initializes this object.
   */
  private initObj():void {
    this._injectionPoints = new Array<InjectionPoint>();
    this._injectionPointMap = new Map<number, InjectionPoint>();
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * @inheritDoc
   */
  public addInjectionPoint(injectionPoint:InjectionPoint):void {
    const key:number = HashCodeBuilder.getInstance()
                                      .build(
                                        injectionPoint.getQualifiedClassName(),
                                        injectionPoint.getElement().getName()
                                      );
    this._injectionPointMap.set(key, injectionPoint);
    this._injectionPoints.push(injectionPoint);
  }

  /**
   * Gets the injection point with the specified hash reference.
   * 
   * @param {number} ref the hash reference of the injection point to retrieve.
   * @return {InjectionPoint} the injection point with the specified reference.
   */
  public getInjectionPoint(ref:number):InjectionPoint {
    return this._injectionPointMap.get(ref);
  }
  
  /**
   * Gets all injection registered points.
   * 
   * @return {Array<InjectionPoint>} all injection registered points.
   */
  public getInjectionPoints():Array<InjectionPoint> {
    return this._injectionPoints;
  }
}