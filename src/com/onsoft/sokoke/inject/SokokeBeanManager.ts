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
import {BeanManager, InjectionPoint, Bean, Scope, ApplicationScoped,
        JdiError} from "jec-jdi";
import {SokokeError} from "../exceptions/SokokeError";
import {SokokeContext} from "../core/SokokeContext";
import {SokokeLocaleManager} from "../i18n/SokokeLocaleManager";
import {LogLevel} from "jec-commons";
import {InjectionPointManager} from "../core/InjectionPointManager";
import {BeanStore} from "../core/BeanStore";

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
   * Stores references to all <code>Bean</code> objects.
   */
  private _beanList:Array<Bean> = null;

  /**
   * Stores references to all <code>ApplicationScoped</code> objects.
   */
  private _applicationManagedBeanList:Array<Bean> = null;

  /**
   * The reference to the <code>InjectionPointManager</code> instance for this
   * bean manager.
   */
  private _injectionPointManager:InjectionPointManager = null;

  /**
   * The reference to the <code>BeanStore</code> instance for this bean manager.
   */
  private _beanStore:BeanStore = null;

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
    this._beanList = new Array<Bean>();
    this._applicationManagedBeanList = new Array<Bean>();
    this._injectionPointManager = new InjectionPointManager();
    this._beanStore = new BeanStore();
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public BeanManager methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * @inheritDoc
   */
  public addBean(bean:Bean):void {
    let scope:Scope = null;
    if(this._beanList.indexOf(bean) !== -1) {
      throw new JdiError(
        SokokeLocaleManager.getInstance().get(
          "error.beanOverride", String(bean)
        )
      );
    }
    scope = bean.getScope();
    if(!scope) this._beanList.push(bean);
    else {
      if(scope instanceof ApplicationScoped) {
        this._applicationManagedBeanList.push(bean);
      }
    }
    this._beanStore.registerBean(bean);
  }

  /**
   * @inheritDoc
   */
  public getBeans():Set<Bean> {
    const result:Set<Bean> = new Set<Bean>();
    let len:number = this._beanList.length;
    while(len--) {
      result.add(this._beanList[len]);
    }
    len = this._applicationManagedBeanList.length;
    while(len--) {
      result.add(this._applicationManagedBeanList[len]);
    }
    return result;
  }

  /**
   * @inheritDoc
   */
  public getBeansByName(name:string):Set<Bean> {
    const result:Set<Bean> = new Set<Bean>();
    let len:number = this._beanList.length;
    let bean:Bean = null;
    while(len--) {
      bean = this._beanList[len];
      if(bean.getName() === name) result.add(bean);
    }
    len = this._applicationManagedBeanList.length;
    while(len--) {
      bean = this._applicationManagedBeanList[len];
      if(bean.getName() === name) result.add(bean);
    }
    return result;
  }

  /**
   * @inheritDoc
   */
  public getBeansByType(type:any):Set<Bean> {
    const result:Set<Bean> = new Set<Bean>();
    let len:number = this._beanList.length;
    let bean:Bean = null;
    while(len--) {
      bean = this._beanList[len];
      if(bean.getTypes().has(type)) result.add(bean);
    }
    len = this._applicationManagedBeanList.length;
    while(len--) {
      bean = this._applicationManagedBeanList[len];
      if(bean.getTypes().has(type)) result.add(bean);
    }
    return result;
  }

  /**
   * @inheritDoc
   */
  public getBeansByInjectionPoint(injectionPoint:InjectionPoint):Set<Bean> {
    const bean:Bean = injectionPoint.getBean();
    let result:Set<Bean> = null;
    if(bean) {
      result = new Set<Bean>();
      result.add(bean);
    } else {
      result = this.getBeansByType(injectionPoint.getType());
    }
    return result;
  }

  /**
   * @inheritDoc
   */
  public addInjectionPoint(injectionPoint:InjectionPoint):void {
    this._injectionPointManager.addInjectionPoint(injectionPoint);
  }

  /**
   * @inheritDoc
   */
  public getReference(bean:Bean):any {
    return this._beanStore.getBeanInstance(bean);
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
    return this._injectionPointManager.getInjectionPoint(ref);
  }
  
  /**
   * Gets all injection points for the current context.
   * 
   * @return {Array<InjectionPoint>} all injection points for the current
   *                                 context.
   */
  public getInjectionPoints():Array<InjectionPoint> {
    return this._injectionPointManager.getInjectionPoints();
  }
}