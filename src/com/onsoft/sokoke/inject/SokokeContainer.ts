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
import {BeanManager, JdiContainer} from "jec-jdi";
import {GlobalGuidGenerator} from "jec-commons";
import {SokokeBeanManager} from "./SokokeBeanManager";
import {SokokeContext} from "../core/SokokeContext";

/**
 * The <code>JdiContainer</code> class is the Sokoke framework 
 * implementation of the <code>JdiContainer</code> interface.
 */
export class SokokeContainer implements JdiContainer {
  
  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>SokokeContainer</code> instance.
   */
  constructor() {
    this.initObj();
  }

  //////////////////////////////////////////////////////////////////////////////
  // Private properties
  //////////////////////////////////////////////////////////////////////////////

  /**
   * The unique identifier for this container.
   */
  private _id:string = null;

  /**
   * A map of <code>BeanManager</code> objects managed by this container.
   */
  private _beanManagerMap:Map<string, BeanManager> = null;

  /**
   * The reference to the current domain path, as specified by the current
   * context.
   */
  private _currentDomainPath:string = null;

  //////////////////////////////////////////////////////////////////////////////
  // Private methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Initializes this object.
   */
  private initObj():void {
    this._id = GlobalGuidGenerator.getInstance().generate();
    this._beanManagerMap = new Map<string, BeanManager>();
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public JdiContainer methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * @inheritDoc
   */
  public getId():string {
    return this._id;
  }

  /**
   * @inheritDoc
   */
  public getBeanManager():BeanManager {
    return this._beanManagerMap.get(this._currentDomainPath);
  }
  
  /**
   * @inheritDoc
   */
  public setBeanManager(beanManager:BeanManager):void {
    const key:string = (beanManager as SokokeBeanManager).getContext()
                                                         .getDomainPath();
    this._beanManagerMap.set(key, beanManager);
  }
  
  //////////////////////////////////////////////////////////////////////////////
  // Public SokokeContainer methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Notifies the container that the current context changed.
   * 
   * @param {SokokeContext} context the reference to the current context.
   */
  public contextChange(context:SokokeContext):void {
    this._currentDomainPath = context.getDomainPath();
  }
}