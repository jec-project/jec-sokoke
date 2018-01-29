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

import {InjectParams, Bean, InjectionPoint} from "jec-jdi";
import {FileProperties, GlobalClassLoader, Member, Field} from "jec-commons";
import {JdiRegExp} from "./JdiRegExp";
import {InjectParamsString} from "./InjectParamsString";
import * as path from "path";
import {InjectionString} from "./InjectionString";
import {InjectionSanitizer} from "./InjectionSanitizer";
import {InjectionPointBuilder} from "../../builders/InjectionPointBuilder";
import {ClassPathBuilder} from "../../utils/ClassPathBuilder";

/**
 * The <code>InjectParamsEvaluator</code> class allows to evaluate a class
 * that contains injection points and to return the collection of
 * <code>InjectionPoint</code> objects for this class.  
 */
export class InjectParamsEvaluator {
  
  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>InjectParamsEvaluator</code> instance.
   */
  constructor() { }

  //////////////////////////////////////////////////////////////////////////////
  // Private methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Returns the <code>Field</code> object for the current injection point.
   * 
   * @param {string} decorator a string that represents the decorator for the
   *                           current injection point.
   * @param {any} beanClass the bean class associated whith the current
   *                        injection point.
   * @return {Field} the <code>Field</code> object for the current injection
   *                 point.
   */
  private extractField(decorator:string, beanClass:any):Member {
    let fieldName:string = decorator.substring(
      decorator.indexOf(InjectParamsString.PROTOTYPE) + 13,
      decorator.lastIndexOf(InjectParamsString.CLOSING_QUOTE)
    );
    let field:Member = new Field(fieldName, beanClass);
    return field;
  }

  /**
   * Extract all parameters of the <code>@Inject</code> decorator for the
   * current bean file and returns the corresponding <code>InjectParams</code>
   * object.
   * 
   * @param rawParams the string that represents all parameters of the
   *                  <code>@Inject</code> decorator for the current bean file.
   * @param {FileProperties} file the reference to the loaded bean file.
   * @return {InjectParams} the <code>InjectParams</code> object that contains 
   *                        all parameters for the current bean file.
   */
  private extractParams(rawParams:string, file:FileProperties):InjectParams{
    let params:InjectParams = { };
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
        // TODO: create extractions for qualifiers
        case InjectionString.QUALIFIER:
          console.log("qualifier detected", found[2]);
          break;
      }
    }
    return params;
  }
  
  /**
   * Parses and sanitizes all parameters of the <code>@Inject</code> decorator
   * for the current file and returns an array that contains the corresponding
   * <code>InjectParams</code> object.
   * 
   * @param {FileProperties} file the reference to the loaded file.
   * @return {Array<InjectParams>} the array of <code>InjectParams</code> 
   *                               objects for the current file.
   */
  private resolveInjectParams(file:FileProperties,
                                             rawDecorator:string):InjectParams {
    let found:RegExpMatchArray = null;
    let params:InjectParams = null;
    JdiRegExp.INJECT_MATCHER.lastIndex = 0;
    found = JdiRegExp.INJECT_MATCHER.exec(rawDecorator);
    params = this.extractParams(found[1], file);
    return params;
  }

  /**
   * Parses and sanitizes all parameters of the <code>@Inject</code> decorator
   * for the current file and returns an array that contains the corresponding
   * <code>InjectionPoint</code> object.
   * 
   * @param {FileProperties} file the reference to the loaded file.
   * @return {Array<InjectionPoint>} the array of <code>InjectionPoint</code> 
   *                                 objects for the current file.
   */
  private resolveInjections(file:FileProperties, 
                                              bean:Bean):Array<InjectionPoint> {
    let decorators:Array<string> = this.extractDecorators(file);
    let decorator:string = "";
    let len:number = decorators.length;
    let params:InjectParams = null;
    let element:Member = null;
    let injectPoint:InjectionPoint = null;
    let beanClass:any = null;
    let className:string = null;
    let result:Array<InjectionPoint> = new Array<InjectionPoint>();
    if(bean) {
      beanClass = bean.getBeanClass();
      className = bean.getQualifiedClassName();
    } else {
      className = ClassPathBuilder.getInstance().build(file);
    }
    while(len--){
      decorator = decorators[len];
      if(decorator.indexOf(InjectParamsString.INJECT) !== -1) {
        if(decorator.indexOf(InjectParamsString.PROTOTYPE) !== -1) {
          params = this.resolveInjectParams(file, decorator);
          element = this.extractField(decorator, beanClass);
          injectPoint = InjectionPointBuilder.getInstance()
                                             .clear()
                                             .bean(bean)
                                             .type(params.type)
                                             .element(element)
                                             .className(className)
                                             .ref(params.name)
                                             .qualifiers(params.qualifiers)
                                             .build();
           result.push(injectPoint);
        }
      }
    }
    return result;
  }

  /**
   * Extract all JavaScript decorators from the specified file and return an
   * array that contains string representations of these decorators.
   * 
   * @param {FileProperties} file the reference to the loaded file.
   * @return {Array<string>} an array that contains string representations of
   *                         the decorators for the specified file.
   */
  private extractDecorators(file:FileProperties):Array<string> {
    let result:Array<string> = new Array<string>();
    let content:string = file.content;
    let decorator:string = null;
    let startId:number = content.indexOf(InjectParamsString.DECORATE);
    let endId:number = -1;
    while(startId !== -1) {
      content = content.substring(startId);
      endId = content.indexOf(InjectParamsString.DECORATE_CLOSING) + 2;
      decorator = content.substring(0, endId);
      result.push(decorator);
      content = content.substring(endId + 1);
      startId = content.indexOf(InjectParamsString.DECORATE);
    }
    return result;
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Evaluates the specified file that contains injection points and return the .
   * corresponding array of <code>InjectionPoint</code> objects.
   * 
   * @param {FileProperties} file a file that contains injection points.
   * @param {Bean} bean a reference to the bean that injection points belongs
   *                    to; or <code>null</code> whether injection points does
   *                    not belong to a bean.
   * @return {Array<InjectionPoint>} an array of <code>InjectionPoint</code>
   *                                 objects for the current file.
   */
  public evaluate(file:FileProperties, bean:Bean):Array<InjectionPoint> {
    let injectPoints:Array<InjectionPoint> = this.resolveInjections(file, bean);
    return injectPoints;
  }
}