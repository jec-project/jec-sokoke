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
import {InjectParams, InjectionPoint, InjectionTarget, DecoratedType} from "jec-jdi";
import {Sokoke} from "../inject/Sokoke";
import {SokokeContext} from "../inject/SokokeContext";
import {SokokeLoggerProxy} from "../logging/SokokeLoggerProxy";
import {SingletonErrorFactory} from "../utils/SingletonErrorFactory";
import {SokokeLocaleManager} from "../i18n/SokokeLocaleManager";
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
  // Private methods
  //////////////////////////////////////////////////////////////////////////////

  private resovelInjection(key:string):any {
    let classPath:string = ClassLoaderContext.getInstance().getPath();
    let sokoke:Sokoke = (Sokoke.getInstance() as Sokoke);
    let context:SokokeContext = sokoke.getContextByPath(classPath);
    let injectPoint:InjectionPoint = null;
    let injection:any = null;
    sokoke.setCurrentContext(context);
    injectPoint = sokoke.resolveInjectionPoint(classPath, key);
    injection = sokoke.getInjectableReference(injectPoint);
    return injection;
  }

  /**
   * A visitor function that performs dependency injection upon the given
   * object for the specified field.
   * 
   * @param {any} target the object for which to perform dependency injection.
   * @param {string} key the field on which to perform dependency injection.
   */
  private injectField(target:any, key:string):void {
    let injection:any = this.resovelInjection(key);
    let sokoke:Sokoke = (Sokoke.getInstance() as Sokoke);
    Object.defineProperty(target, key, { value: injection });
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
   * A visitor function that performs dependency injection upon the given
   * object for the specified parameter.
   * 
   * @param {any} target the object for which to perform dependency injection.
   * @param {string} key the parameter on which to perform dependency injection.
   * @param {number} index the parameter index.
   */
  private injectParam(target:any, key:string, index:number):void {
    console.log("InjectParameterDecorator")
    console.log(target.constructor.name, key, index)
    /*let injection:any = this.resovelInjection(key);
    //let sokoke:Sokoke = (Sokoke.getInstance() as Sokoke);
    let descriptor:PropertyDescriptor = 
                                   Object.getOwnPropertyDescriptor(target, key);
    let originalMethod:Function = descriptor.value;
    descriptor.value = function():void {
      let args:any[] = new Array<any>();
      let len:number = arguments.length;
      while(len--) {
          args[len] = arguments[len];
      }
      args[index] = injection;
      originalMethod.apply(this, args);
      console.log(args)
    };*/
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * @inheritDoc
   */
  public inject(context:InjectionTarget):void {
    let decoratedType:DecoratedType = context.decoratedType;
    if(decoratedType === DecoratedType.FIELD) {
      this.injectField(context.target, String(context.key));
    } else if(decoratedType === DecoratedType.PARAMETER) {
      this.injectParam(
        context.target, String(context.key), context.parameterIndex
      );
    } else {
      
    }
    
  }
  
  /**
   * @inheritDoc
   */
  public dispose(context:InjectionTarget):void {

  }
}