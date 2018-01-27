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

import {SokokeLoggerProxy} from "../logging/SokokeLoggerProxy";
import {BeanManager, InjectionPoint, Bean} from "jec-jdi";
import {SokokeError} from "../exceptions/SokokeError";
import {SokokeContext} from "./SokokeContext";
import {HashCodeBuilder} from "../utils/HashCodeBuilder";

/**
 * The <code>SokokeBeanManager</code> class is the Sokoke framework 
 * implementation of the <code>BeanManager</code> interface.
 */
export class SokokeBeanManager implements BeanManager {
  
  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>SokokeBeanManager</code> instance.
   * 
   * @param {SokokeContext} context the context associated with this
   *                                <code>SokokeContext</code> object.
   */
  constructor(context:SokokeContext) {
    this.initObj(context);
  }

  //////////////////////////////////////////////////////////////////////////////
  // Private properties
  //////////////////////////////////////////////////////////////////////////////

  /**
   * The context associated with this <code>SokokeContext</code> object.
   */
  private _context:SokokeContext = null;

  /**
   * Stores references to all injection points.
   */
  private _injectionPointMap:Map<number, InjectionPoint> = null;

  //////////////////////////////////////////////////////////////////////////////
  // Private methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Initializes this object.
   * 
   * @param {SokokeContext} context the context associated with this
   *                                <code>SokokeContext</code> object.
   */
  private initObj(context:SokokeContext):void {
    this._context = context;
    this._injectionPointMap = new Map<number, InjectionPoint>();
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public BeanManager methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * @inheritDoc
   */
  public addBean(bean:Bean):void {
    //TODO
  }

  /**
   * @inheritDoc
   */
  public getBeans(injectionPoint:InjectionPoint):Set<Bean> {
    let result:Set<Bean> = new Set<Bean>();
    //TODO
    return result;
  }

  /**
   * @inheritDoc
   */
  public addInjectionPoint(injectionPoint:InjectionPoint):void {
    let key:number = HashCodeBuilder.getInstance()
                                    .build(
                                      injectionPoint.getQualifiedClassName(),
                                      injectionPoint.getElement().getName()
                                    );
    this._injectionPointMap.set(key, injectionPoint);
  }
  
  //////////////////////////////////////////////////////////////////////////////
  // Public SokokeBeanManager methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Gets the context associated with this <code>SokokeContext</code> object.
   * 
   * @return {SokokeContext} the context associated with this
   *                         <code>SokokeContext</code> object.
   */
  public getContext():SokokeContext {
    return this._context;
  }

  /**
   * Gets the injection point with the specified reference.
   * 
   * @param {number} ref the reference of the injection point to retrieve.
   * @return {InjectionPoint} the injection point with the specified reference.
   */
  public getInjectionPoint(ref:number):InjectionPoint {
    return this._injectionPointMap.get(ref);
  }
}