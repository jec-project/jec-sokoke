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

import {ClassLoaderContext, LogLevel} from "jec-commons";
import {InjectionPoint, InjectionTarget, DecoratedType, Bean} from "jec-jdi";
import {Sokoke} from "../inject/Sokoke";
import {SokokeContext} from "../core/SokokeContext";
import {SokokeLoggerProxy} from "../logging/SokokeLoggerProxy";
import {SingletonErrorFactory} from "../utils/SingletonErrorFactory";
import {SokokeLocaleManager} from "../i18n/SokokeLocaleManager";
import {SokokeInjectionPoint} from "./SokokeInjectionPoint";
import {SokokeMetadataInjector} from "../metadata/SokokeMetadataInjector";

/**
 * The <code>SokokeInjectionPointResolver</code> singleton provides operations 
 * for resolving injection points depencing on the current class loader context.
 */
export class SokokeInjectionPointResolver {
  
  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>SokokeInjectionPointResolver</code> instance.
   */
  constructor() {
    if(SokokeInjectionPointResolver._locked ||
       SokokeInjectionPointResolver.INSTANCE) {
      new SingletonErrorFactory().throw(SokokeInjectionPointResolver);
    }
    SokokeInjectionPointResolver._locked = true;
  }

  //////////////////////////////////////////////////////////////////////////////
  // Singleton managment
  //////////////////////////////////////////////////////////////////////////////

  /**
   * The <code>SokokeInjectionPointResolver</code> singleton instance reference.
   */
  private static INSTANCE:SokokeInjectionPointResolver = null;

  /**
   * Prevents <code>SokokeInjectionPointResolver</code> illegal instanciations.
   */
  private static _locked:boolean = true;

  /**
   * Returns a reference to the <code>SokokeInjectionPointResolver</code>
   * singleton.
   * 
   * @return {SokokeInjectionPointResolver} a reference to the
   *                                   <code>SokokeInjectionPointResolver</code>
   *                                        singleton.
   */
  public static getInstance():SokokeInjectionPointResolver {
    if(SokokeInjectionPointResolver.INSTANCE === null) {
      SokokeInjectionPointResolver._locked = false;
      SokokeInjectionPointResolver.INSTANCE = new SokokeInjectionPointResolver();
    }
    return SokokeInjectionPointResolver.INSTANCE;
  }
  
  //////////////////////////////////////////////////////////////////////////////
  // Private methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Resolves the injection point for the specified member, according to the
   * current class loader context.
   * 
   * @param {string} key the member for which to resolve the injection point.
   */
  private resovelInjectionPoint(key:string):InjectionPoint {
    const classPath:string = ClassLoaderContext.getInstance().getPath();
    const sokoke:Sokoke = (Sokoke.getInstance() as Sokoke);
    const context:SokokeContext = sokoke.getContextByPath(classPath);
    sokoke.setCurrentContext(context);
    return sokoke.resolveInjectionPoint(classPath, key);
  }

  /**
   * A visitor function that performs dependency metadata injection upon the 
   * given object for the specified field.
   * 
   * @param {any} target the object for which to perform metadata dependency
   *                     injection.
   * @param {string} key the field on which to perform metadata dependency
   *                     injection.
   */
  private injectFieldMetadata(target:any, key:string):void {
    const sokoke:Sokoke = (Sokoke.getInstance() as Sokoke);
    const injectionPoint:SokokeInjectionPoint = 
                      (this.resovelInjectionPoint(key) as SokokeInjectionPoint);
    const bean:Bean = sokoke.getBean(injectionPoint);
    const injection:any = sokoke.getInjectableReference(bean);
    injectionPoint.setBean(bean);
    SokokeMetadataInjector.getInstance()
                          .injectInjectionPoint(target, injectionPoint);
    if(sokoke.isDebugMode()) {
      SokokeLoggerProxy.getInstance().log(
        SokokeLocaleManager.getInstance().get(
          "bean.injected.field",
          target.constructor.name,
          key,
          injection.constructor.name
        ),
        LogLevel.DEBUG
      );
    }
  }

  /**
   * A visitor function that performs metadata dependency injection upon the 
   * given object for the specified parameter.
   * 
   * @param {any} target the object for which to perform metadata dependency
   *                     injection.
   * @param {string} key the parameter on which to perform metadata dependency
   *                     injection.
   * @param {number} index the parameter index.
   */
  private injectParamMetadata(target:any, key:string, index:number):void {
    console.log("InjectParameterDecorator")
    console.log(target.constructor.name, key, index)
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Resolves and performs metadata dependency injection for the specified
   * context.
   * 
   * @param {InjectionTarget} context the context for which to performs metadata
   *                                  dependency injection.
   */
  public resolve(context:InjectionTarget):void {
    const decoratedType:DecoratedType = context.decoratedType;
    if(decoratedType === DecoratedType.FIELD) {
      this.injectFieldMetadata(context.target, String(context.key));
    } else if(decoratedType === DecoratedType.PARAMETER) {
      this.injectParamMetadata(
        context.target, String(context.key), context.parameterIndex
      );
    } else {
      //TODO
    }
  }
}