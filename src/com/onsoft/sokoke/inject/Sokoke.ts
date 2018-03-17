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

import {LogLevel} from "jec-commons";
import {JDI, JdiContainer, BeanManager, InjectionPoint, Bean,
        UnsatisfiedDependencyError} from "jec-jdi";
import {SokokeLocaleManager} from "../i18n/SokokeLocaleManager";
import {SokokeContainer} from "./SokokeContainer";
import * as path from "path";
import {JdiContainerFactory} from "../builders/JdiContainerFactory";
import {SokokeContext} from "../core/SokokeContext";
import {BeanManagerBuilder} from "../builders/BeanManagerBuilder";
import {HashCodeBuilder} from "../utils/HashCodeBuilder";
import {SokokeBeanManager} from "./SokokeBeanManager";
import {SokokeLoggerProxy} from "../logging/SokokeLoggerProxy";
import {SingletonErrorFactory} from "../utils/SingletonErrorFactory";

/**
 * The <code>Sokoke</code> singleton is the main entry point of Sokoke
 * containers.
 */
export class Sokoke implements JDI {

  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>Sokoke</code> instance.
   */
  constructor() {
    if(Sokoke._locked || Sokoke.INSTANCE) {
      new SingletonErrorFactory().throw(Sokoke);
    }
    this.initObj();
    Sokoke._locked = true;
  }

  //////////////////////////////////////////////////////////////////////////////
  // Singleton managment
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Prevents <code>Sokoke</code> illegal instanciations.
   */
  private static _locked:boolean = true;

  /**
   * The <code>Sokoke</code> singleton instance reference.
   */
  private static INSTANCE:JDI = null;

  /**
   * Returns a reference to the <code>Sokoke</code> singleton.
   *
   * @return {Sokoke} a reference to the <code>Sokoke</code> singleton.
   */
  public static getInstance():JDI {
    if(Sokoke.INSTANCE === null) {
      Sokoke._locked = false;
      Sokoke.INSTANCE = new Sokoke();
    }
    return Sokoke.INSTANCE;
  }

  //////////////////////////////////////////////////////////////////////////////
  // Private properties
  //////////////////////////////////////////////////////////////////////////////

  /**
   * The <code>SokokeContainer</code> instance managed by this Sokoke object.
   */
  private _container:SokokeContainer = null;

  /**
   * The configuration object for this Sokoke object.
   */
  private _localeCongig:any = null;

  /**
   * The current <code>SokokeContext</code> object.
   */
  private _currContext:SokokeContext = null;

  /**
   * The list that is used to store Sokoke contexts.
   */
  private _contextList:Set<SokokeContext> = null;

  //////////////////////////////////////////////////////////////////////////////
  // Private methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Initializes this object.
   */
  private initObj():void {
    const factory:JdiContainerFactory = new JdiContainerFactory();
    this._container = (factory.create() as SokokeContainer);
    const sokokeLocalesPath:string = path.join(
      process.cwd(), "node_modules/jec-sokoke/public/locales/"
    );
    this._localeCongig = { directory: sokokeLocalesPath };
    this._contextList = new Set<SokokeContext>();
  }

  /**
   * Returns a list of beans for a certain injection point.
   * 
   * @param {InjectionPoint} injectionPoint the injection point used to resolve  
   *                                        the bean list.
   * @return {Array<Bean>} a list of beans for the injection point.
   */
  private getBeanList(injectionPoint:InjectionPoint):Array<Bean> {
    const manager:BeanManager = this._container.getBeanManager();
    const name:string = injectionPoint.getRef();
    const type:any = injectionPoint.getType();
    let beans:Set<Bean> = null;
    let beanList:Array<Bean> = null;
    let msg:string = name;
    if(name) {
      beans = manager.getBeansByName(name);
    }
    if(type && !beans || beans.size === 0) {
      beans = manager.getBeansByType(type);
    }
    if(!beans || beans.size === 0) {
      beans = manager.getBeansByInjectionPoint(injectionPoint);
    }
    if(beans.size === 0) {
      msg = name ? "errors.unsatisfied.name" : "errors.unsatisfied.type";
      msg = SokokeLocaleManager.getInstance().get(
        msg, name || type, injectionPoint.getQualifiedClassName()
      );
      throw new UnsatisfiedDependencyError(msg);
    } else {
      beanList = Array.from(beans);
    }
    return beanList;
  }

  /**
   * Returns the beast bean, for a certain injection point, found in the
   * specified list of beans.
   * 
   * @return {Array<Bean>} a list of beans for the injection point.
   * @param {InjectionPoint} injectionPoint the context used to resolve beans in
   *                                        the bean specified list.
   * @return {Bean} the beast bean for the specified injection point.
   */
  private resolveBean(beanList:Bean[],  injectionPoint:InjectionPoint):Bean {
    let bean:Bean = null;
    let len:number = beanList.length;
    if(len === 0) bean = beanList[0];
    else {
      bean = beanList[0];
    }
    return bean;
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public JDI methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * @inheritDoc
   */
  public getContainer():JdiContainer {
    return this._container;
  }
  
  /**
   * @inheritDoc
   */
  public getBeanManager():BeanManager {
    return this._container.getBeanManager();
  }
  
  //////////////////////////////////////////////////////////////////////////////
  // Public Sokoke methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Adds the specified context to this SPI manager.
   * 
   * @param {SokokeContext} context the new context to add to this SPI manager.
   */
  public addContext(context:SokokeContext):void {
    const beanManager:BeanManager = BeanManagerBuilder.getInstance()
                                                      .build(context);
    this._contextList.add(context);
    this._container.setBeanManager(beanManager);
  }
  
  /**
   * Sets the current Sokoke context.
   * 
   * @param {SokokeContext} context the current Sokoke context.
   */
  public setCurrentContext(context:SokokeContext):void {
    if(this._currContext !== context) {
      this._currContext = context;
      (this._container as SokokeContainer).contextChange(context);
      SokokeLocaleManager.getInstance().init(
        context.getLocale().toString(),
        this._localeCongig
      );
    }
  }
  
  /**
   * Gets the current Sokoke context.
   * 
   * @return {SokokeContext} the current Sokoke context.
   */
  public getCurrentContext():SokokeContext {
    return this._currContext;
  } 

  /**
   * Gets the a Sokoke context depending on the specified file path.
   * 
   * @param {string} path the path for which to retrieve the Sokoke context.
   * @return {SokokeContext} the Sokoke context that is associated with the
   *                         specified file path.
   */
  public getContextByPath(path:string):SokokeContext {
    const it:IterableIterator<[SokokeContext, SokokeContext]> =
                                                    this._contextList.entries();
    let domainPath:string = path;
    let context:SokokeContext = null;
    let result:SokokeContext = null;
    for(let entry of it) {
      context = entry[0];
      domainPath = context.getDomainPath();
      if(path.indexOf(domainPath) === 0) {
        result = context;
        break;
      }
    }
    return result;
  }

  /**
   * Retruns the injection point for the specified class path and class member.
   * 
   * @param {string} classPath the path to the class for which to find an
   *                           injection point.
   * @param {string} member the class member on which the injection point is
   *                        declared.
   * @return {InjectionPoint} the injection point for the specified parameters.
   */
  public resolveInjectionPoint(classPath:string, member:string):InjectionPoint {
    const hash:number = HashCodeBuilder.getInstance().build(classPath, member);
    const beanManager:SokokeBeanManager = 
                        (this._container.getBeanManager() as SokokeBeanManager);
    return beanManager.getInjectionPoint(hash);
  }

  /**
   * Obtains an injectable reference for a certain injection point.
   * 
   * @param {InjectionPoint} injectionPoint the injection point used to resolve  
   *                                        the injectable reference.
   * @return {any} the reference to the object resolved from the specified
   *               injection point.
   */
  public getInjectableReference(injectionPoint:InjectionPoint):any {
    const beanList:Array<Bean> = this.getBeanList(injectionPoint);
    const bean:Bean = this.resolveBean(beanList, injectionPoint);
    return this._container.getBeanManager().getReference(bean);
  }

  /**
   * Returns a boolean that indicates whether the current log level is
   * <code>LogLevel.DEBUG</code> (<code>true</code>), or not
   * (<code>false</code>).
   * 
   * @return {boolean} <code>true</code> whether the current log level is
   *                   <code>LogLevel.DEBUG</code>; <code>false</code>
   *                   otherwise.
   */
  public isDebugMode():boolean {
    const debugMode:boolean = SokokeLoggerProxy.getInstance()
                                               .getLogger()
                                               .getLogLevel() <= LogLevel.DEBUG;
    return debugMode;
  }
}
