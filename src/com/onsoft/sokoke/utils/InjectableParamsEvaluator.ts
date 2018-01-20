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

import {Bean, Scope, InjectableParams, ScopeType} from "jec-jdi";
import {BeanBuilder} from "../builders/BeanBuilder";
import {FileProperties, UrlStringsEnum} from "jec-commons";
import {ScopeStrategy} from "../utils/ScopeStrategy";
import * as path from "path";
import {InjectableParamsString} from "./InjectableParamsString";
import {InjectableParamsRegExp} from "./InjectableParamsRegExp";

/**
 * The <code>InjectableParamsEvaluator</code> class allows to evaluate a bean
 * archive and to create the corresponding <code>Bean</code> object.  
 */
export class InjectableParamsEvaluator {
  
  ////////////////////////////////////////////////////////////////////////////
  // Constructor function
  ////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>InjectableParamsEvaluator</code> instance.
   */
  constructor() { }

  ////////////////////////////////////////////////////////////////////////////
  // Private methods
  ////////////////////////////////////////////////////////////////////////////

  /**
   * Returns the class for the current bean archive.
   * 
   * @param {FileProperties} file the reference to the file that represents the
   *                              current bean archive.
   */
  private getBeanClass(file:FileProperties):any {
    let fileName:string = file.name + UrlStringsEnum.DOT + file.extension;
    let filePath:string = path.join(file.path, fileName);
    let beanClass:any = require(filePath);
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
    let types:Set<any> = new Set<any>();
    types.add(beanClass);
    if(beanType) types.add(beanType);
    return types;
  }

  /**
   * Sanitizes the string value from the specified string representation.
   * 
   * @param {string} value the value to sanitize.
   * @return {string} the sanitized string value.
   */
  private sanitizesString(value:string):string {
    let len:number = value.length - 1;
    let result:string = value.lastIndexOf(InjectableParamsString.COMA) === len ?
                        value.substr(1, len - 2) : value.substr(1, len - 1);
    return result;
  }

  /**
   * A visitor function that sanitizes the name of the evaluated bean.
   * 
   * @param {InjectableParams} params the injectable parameters for the
   *                                  evaluated bean.
   * @param {string} value the value to sanitize.
   */
  private sanitizeName(params:InjectableParams, value:string):void {
    params.name = this.sanitizesString(value);
  }

  /**
   * A visitor function that sanitizes the type of the evaluated bean archive.
   * 
   * @param {InjectableParams} params the injectable parameters for the
   *                                  evaluated bean archive.
   * @param {string} value the value to sanitize.
   * @param {FileProperties} file the reference to the loaded bean archive.
   */
  private sanitizeType(params:InjectableParams, value:string,
                                                     file:FileProperties):void {
    let len:number = value.length - 1;
    let rawType:string =
                        value.lastIndexOf(InjectableParamsString.COMA) === len ?
                        value.substr(0, len) : value;
    let importRefs:Array<string> = rawType.split(InjectableParamsString.DOT);
    let importRefPath:string = 
     InjectableParamsRegExp.getTypeMatcher(importRefs[0]).exec(file.content)[1];
    let importPath:string = path.resolve(file.path, importRefPath);
    let type:Symbol = require(importPath)[importRefs[1]];
    params.type = type;
  }
  
  /**
   * A visitor function that sanitizes the scope of the evaluated bean archive.
   * 
   * @param {InjectableParams} params the injectable parameters for the
   *                                  evaluated bean archive.
   * @param {string} value the value to sanitize.
   */
  private sanitizeScope(params:InjectableParams, value:string):void {
    if(value.indexOf(InjectableParamsString.SCOPETYPE_APPLICATION) !== -1) {
      params.scope = ScopeType.APPLICATION;
    } else if(value.indexOf(InjectableParamsString.SCOPETYPE_SESSION) !== -1) {
      params.scope = ScopeType.SESSION;
    } else if(value.indexOf(InjectableParamsString.SCOPETYPE_REQUEST) !== -1) {
      params.scope = ScopeType.REQUEST;
    } else if(value.indexOf(InjectableParamsString.SCOPETYPE_DEPENDENT) !==-1 ||
              value.indexOf(InjectableParamsString.NULL) !== -1) {
      params.scope = null;
    } else {
      params.scope = this.sanitizesString(value);
    }
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
    let params:InjectableParams = { };
    let found:RegExpMatchArray = null;
    while(
      (found = InjectableParamsRegExp.PARAMS_MATCHER.exec(rawParams))
      !== null
    ) {
      switch(found[1]) {
        case InjectableParamsString.NAME:
          this.sanitizeName(params, found[2]);
          break;
        case InjectableParamsString.TYPE:
          this.sanitizeType(params, found[2], file);
          break;
        case InjectableParamsString.SCOPE:
          this.sanitizeScope(params, found[2]);
          break;
        // TODO: create extractions for the following parameters
        case InjectableParamsString.RETENTION:
          console.log("retention detected", found[2]);
          break;
        case InjectableParamsString.QUALIFIER:
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
    let found:RegExpMatchArray =
                   InjectableParamsRegExp.INJECTABLE_MATCHER.exec(file.content);
    let rawParams:string = found[1];
    let params:InjectableParams = this.extractParams(rawParams, file);
    return params;
  }

  ////////////////////////////////////////////////////////////////////////////
  // Public methods
  ////////////////////////////////////////////////////////////////////////////

  /**
   * Evaluates the file that represents a valid bean archive and returns the
   * corresponding <code>Bean</code> object.
   * 
   * @param {FileProperties} file a file that represents a valid bean archive.
   * @return {Bean} the <code>Bean</code> object extracted from the specified
   *                file.
   */
  public evaluate(file:FileProperties):Bean {
    let params:InjectableParams = this.resolveInjectableParams(file);
    let scope:Scope = ScopeStrategy.getInstance().resolve(params.scope);
    let beanClass:any = this.getBeanClass(file);
    let bean:Bean = BeanBuilder.getInstance()
                               .clear()
                               .name(params.name)
                               .scope(scope)
                               .types(this.buildTypes(beanClass, params.type))
                               .beanClass(beanClass)
                               .build();
    return bean;
  }
}