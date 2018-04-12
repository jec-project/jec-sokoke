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

import {Scope, Bean} from "jec-jdi";
import {SokokeBean} from "../inject/SokokeBean";

/**
 * The <code>BeanStore</code> is responsible to storing all managed objects
 * instances depending on <code>Bean</code> scopes.
 */
export class BeanStore {
  
  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>BeanStore</code> instance.
   */
  constructor() {
    this.initObj();
  }

  //////////////////////////////////////////////////////////////////////////////
  // Private properties
  //////////////////////////////////////////////////////////////////////////////

  /**
   * The map that stores all registered bean instances.
   */
  private _beanInstancesMap:Map<number, any> = null;

  //////////////////////////////////////////////////////////////////////////////
  // Private methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Initializes this object.
   */
  private initObj():void {
    this._beanInstancesMap = new Map<number, any>();
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Registers the specified bean into the store, depending on the bean scope. 
   * 
   * @param {Bean} bean the bean to register whithin this store.
   */
  public registerBean(bean:Bean):void {
    const scope:Scope = bean.getScope();
    let Constructor:any = null;
    let instance:any = null;
    if(scope) {
      Constructor = bean.getBeanClass();
      instance = new Constructor();
      this._beanInstancesMap.set((bean as SokokeBean).getHash(), instance);
    }
  }

  /**
   * Returns the registered instance for the specified bean.
   * 
   * @param {Bean} bean the bean for which to return the registered instance.
   * @return {any} the registered instance declared for the specified bean.
   */
  public getBeanInstance(bean:Bean):any {
    const scope:Scope = bean.getScope();
    let instance:any = null;
    let len:number;
    let Constructor:any = null;
    let hash:number = (bean as SokokeBean).getHash();
    if(!scope) {
      Constructor = bean.getBeanClass();
      instance = new Constructor();
    } else {
        instance = this._beanInstancesMap.get(hash);
    }
    return instance;
  }
}