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

import {SokokeLocaleManager} from "../i18n/SokokeLocaleManager";
import {Scope, Bean} from "jec-jdi";
import {SingletonError} from "jec-commons";
import {LocaleManager} from "jec-commons-node";
import {SokokeBean} from "../inject/SokokeBean";

/**
 * The <code>BeanBuilder</code> singleton allows to build new <code>Bean</code>
 * objects from the specified parameters.
 */
export class BeanBuilder {
  
  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>BeanBuilder</code> instance.
   */
  constructor() {
    let msg:string = null;
    let i18n:LocaleManager = null;
    if(BeanBuilder._locked || BeanBuilder.INSTANCE) {
      i18n = SokokeLocaleManager.getInstance();
      if(i18n.isInitialized()) {
        msg = i18n.get("errors.singleton", "BeanBuilder");
      } else {
        msg = "You cannot create a BeanBuilder instance; " +
              "use getInstance() instead.";
      }
      throw new SingletonError(msg);
    }
    BeanBuilder._locked = true;
  }

  //////////////////////////////////////////////////////////////////////////////
  // Singleton managment
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Prevents <code>BeanBuilder</code> illegal instanciations.
   */
  private static _locked:boolean = true;

  /**
   * The <code>BeanBuilder</code> singleton instance reference.
   */
  private static INSTANCE:BeanBuilder = null;

  /**
   * Returns a reference to the <code>BeanBuilder</code> singleton.
   *
   * @return {BeanBuilder} a reference to the <code>BeanBuilder</code>
   *                       singleton.
   */
  public static getInstance():BeanBuilder {
    if(BeanBuilder.INSTANCE === null) {
      BeanBuilder._locked = false;
      BeanBuilder.INSTANCE = new BeanBuilder();
    }
    return BeanBuilder.INSTANCE;
  }

  //////////////////////////////////////////////////////////////////////////////
  // Private properties
  //////////////////////////////////////////////////////////////////////////////

  /**
   * The <code>Scope</code> object associated with the new <code>Bean</code>
   * object.
   */
  private _scope:Scope = null;

  /**
   * The name of the the new <code>Bean</code> object.
   */
  private _name:string = null;

  /**
   * The bean class of the the new <code>Bean</code> object.
   */
  private _beanClass:any = null;

  /**
   * The bean types of the the new <code>Bean</code> object.
   */
  private _types:Set<any> = null;

  /**
   * The class name of the the new <code>Bean</code> object.
   */
  private _className:string = null;

  //////////////////////////////////////////////////////////////////////////////
  // Public methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Sets the <code>Scope</code> object associated with the new
   * <code>Bean</code> object.
   * 
   * @param {Scope} scope the <code>Scope</code> object associated with the new
   *                    <code>Bean</code> object.
   * @return {BeanBuilder} the reference to this <code>BeanBuilder</code>
   *                       object.
   */
  public scope(scope:Scope):BeanBuilder {
    this._scope = scope;
    return this;
  }

  /**
   * Sets the name of the new <code>Bean</code> object.
   * 
   * @param {string} name the name of the new <code>Bean</code> object.
   * @return {BeanBuilder} the reference to this <code>BeanBuilder</code>
   *                       object.
   */
  public name(name:string):BeanBuilder {
    this._name = name;
    return this;
  }

  /**
   * Sets the bean class of the new <code>Bean</code> object.
   * 
   * @param {any} beanClass the bean class of the new <code>Bean</code> object.
   * @return {BeanBuilder} the reference to this <code>BeanBuilder</code>
   *                       object.
   */
  public beanClass(beanClass:any):BeanBuilder {
    this._beanClass = beanClass;
    return this;
  }
  
  /**
   * Sets the bean types of the new <code>Bean</code> object.
   * 
   * @param {Set<any>} types the bean types of the new <code>Bean</code> object.
   * @return {BeanBuilder} the reference to this <code>BeanBuilder</code>
   *                       object.
   */
  public types(types:Set<any>):BeanBuilder {
    this._types = types;
    return this;
  }

  /**
   * Sets the class name of the new <code>Bean</code> object.
   * 
   * @param {string} className the class name of the new <code>Bean</code>
   *                           object.
   * @return {BeanBuilder} the reference to this <code>BeanBuilder</code>
   *                       object.
   */
  public className(className:string):BeanBuilder {
    this._className = className;
    return this;
  }

  /**
   * Resets the builder to its initial, empty state.
   * 
   * @return {BeanBuilder} the reference to this <code>BeanBuilder</code>
   *                       object.
   */
  public clear():BeanBuilder {
    this._scope = null;
    this._name = null;
    this._beanClass = null;
    this._types = null;
    this._className = null;
    return this;
  }

  /**
   * Returns a new <code>Bean</code> object, built from the specified
   * properties.
   * 
   * @return {Bean} the new <code>Bean</code> object, built from the specified
   *                properties.
   */
  public build():Bean {
    let bean:Bean = new SokokeBean(
      this._name, this._scope, this._beanClass, this._types, this._className
    );
    return bean;
  }
}