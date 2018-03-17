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

import {Bean, Scope, InjectableParams} from "jec-jdi";
import {BeanBuilder} from "../../builders/BeanBuilder";
import {FileProperties, GlobalClassLoader} from "jec-commons";
import {ScopeStrategy} from "../../utils/ScopeStrategy";
import * as path from "path";
import {JdiRegExp} from "./JdiRegExp";
import {InjectionSanitizer} from "./InjectionSanitizer";
import {InjectionString} from "./InjectionString";
import {ClassPathBuilder} from "../../utils/ClassPathBuilder";

/**
 * The <code>InjectableParamsEvaluator</code> class allows to evaluate a bean
 * archive and to create the corresponding <code>Bean</code> object.  
 */
export class InjectableParamsEvaluator {
  
  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>InjectableParamsEvaluator</code> instance.
   */
  constructor() { }

  //////////////////////////////////////////////////////////////////////////////
  // Private methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Returns the class for the current bean archive.
   * 
   * @param {FileProperties} filePath the path to the file that represents the
   *                                  current bean archive.
   * @return {any} the class for the current bean archive.
   */
  private getBeanClass(filePath:string):any {
    const beanClass:any = GlobalClassLoader.getInstance().loadClass(filePath);
    return beanClass;
  }

  /**
   * Builds and returns the set of types for the current bean archive.
   * 
   * @param {any} beanClass the class for the current bean archive.
   * @param {any} beanType the type of the current bean archive.
   * @return {Set<any>} the set of types for the current bean archive.
   */
  private buildTypes(beanClass:any, beanType:any):Set<any> {
    const types:Set<any> = new Set<any>();
    types.add(beanClass);
    if(beanType) types.add(beanType);
    return types;
  }

  /**
   * Extract all parameters of the <code>@Injectable</code> decorator for the
   * current bean archive and returns the corresponding
   * <code>InjectableParams</code> object.
   * 
   * @param rawParams the string that represents all parameters of the
   *                  <code>@Injectable</code> decorator for the current bean
   *                  archive.
   * @param {FileProperties} file the reference to the loaded bean archive.
   * @return {InjectableParams} the <code>InjectableParams</code> object that
   *                            contains all parameters for the current bean
   *                            archive.
   */
  private extractParams(rawParams:string, file:FileProperties):InjectableParams{
    const params:InjectableParams = { };
    let found:RegExpMatchArray = null;
    JdiRegExp.PARAMS_MATCHER.lastIndex = 0;
    while((found = JdiRegExp.PARAMS_MATCHER.exec(rawParams)) !== null) {
      switch(found[1]) {
        case InjectionString.NAME:
          InjectionSanitizer.getInstance().sanitizeName(params, found[2]);
          break;
        case InjectionString.TYPE:
          InjectionSanitizer.getInstance().sanitizeType(params, found[2], file);
          break;
        case InjectionString.SCOPE:
          InjectionSanitizer.getInstance().sanitizeScope(params, found[2]);
          break;
        // TODO: create extractions for the following parameters
        case InjectionString.RETENTION:
          console.log("retention detected", found[2]);
          break;
        case InjectionString.QUALIFIER:
          console.log("qualifier detected", found[2]);
          break;
      }
    }
    return params;
  }
  
  /**
   * Parses and sanitizes all parameters of the <code>@Injectable</code> 
   * decorator for the current bean archive and returns the corresponding
   * <code>InjectableParams</code> object.
   * 
   * @param {FileProperties} file the reference to the loaded bean archive.
   * @return {InjectableParams} the <code>InjectableParams</code> object that
   *                            contains all parameters for the current bean
   *                            archive.
   */
  private resolveInjectableParams(file:FileProperties):InjectableParams {
    JdiRegExp.INJECTABLE_MATCHER.lastIndex = 0;
    const found:RegExpMatchArray = 
                                JdiRegExp.INJECTABLE_MATCHER.exec(file.content);
    const rawParams:string = found[1];
    const params:InjectableParams = this.extractParams(rawParams, file);
    return params;
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Evaluates the file that represents a valid bean archive and returns the
   * corresponding <code>Bean</code> object.
   * 
   * @param {FileProperties} file a file that represents a valid bean archive.
   * @return {Bean} the <code>Bean</code> object extracted from the specified
   *                file.
   */
  public evaluate(file:FileProperties):Bean {
    const params:InjectableParams = this.resolveInjectableParams(file);
    const scope:Scope = ScopeStrategy.getInstance().resolve(params.scope);
    const classPath:string = ClassPathBuilder.getInstance().build(file);
    const beanClass:any = this.getBeanClass(classPath);
    const bean:Bean = BeanBuilder.getInstance()
                                 .clear()
                                 .name(params.name)
                                 .scope(scope)
                                 .types(this.buildTypes(beanClass, params.type))
                                 .beanClass(beanClass)
                                 .className(classPath)
                                 .build();
    return bean;
  }
}