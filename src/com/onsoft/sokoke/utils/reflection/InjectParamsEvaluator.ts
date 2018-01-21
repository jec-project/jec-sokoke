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

import {InjectParams} from "jec-jdi";
import {FileProperties} from "jec-commons";
import {InjectParamsRegExp} from "./InjectParamsRegExp";

/**
 * The <code>InjectParamsEvaluator</code> class allows to evaluate a class
 * that contains injection points and to return the collection of
 * <code>InjectionPoint</code> objects for this class.  
 */
export class InjectParamsEvaluator {
  
  ////////////////////////////////////////////////////////////////////////////
  // Constructor function
  ////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>InjectParamsEvaluator</code> instance.
   */
  constructor() { }

  ////////////////////////////////////////////////////////////////////////////
  // Private methods
  ////////////////////////////////////////////////////////////////////////////

  /**
   * Parses and sanitizes all parameters of the <code>@Inject</code> decorator
   * for the current file and returns the an array that contains the
   * corresponding <code>InjectParams</code> object.
   * 
   * @param {FileProperties} file the reference to the loaded file.
   * @return {Array<InjectParams>} the array of <code>InjectParams</code> 
   *                               objects for the current file.
   */
  private resolveInjectParams(file:FileProperties):Array<InjectParams> {
    let found:RegExpMatchArray =
                         InjectParamsRegExp.DECORATE_MATCHER.exec(file.content);
    return null;
  }

  ////////////////////////////////////////////////////////////////////////////
  // Public methods
  ////////////////////////////////////////////////////////////////////////////

  /**
   * Evaluates the specified file that contains injection points.
   * 
   * @param {FileProperties} file a file that contains injection points.
   */
  public evaluate(file:FileProperties):void {
    let params:Array<InjectParams> = this.resolveInjectParams(file);
    
    /*
    let bean:Bean = null;
    let element:Member = new Field(key, target.constructor);
    let injectPoint:InjectionPoint = InjectionPointBuilder.getInstance()
                                                          .clear()
                                                          .bean(bean)
                                                          .type(params.type)
                                                          .element(element)
                                                          .build();
    console.log(injectPoint)
    */
    /*SokokeLoggerProxy.getInstance().log(
      SokokeLocaleManager.getInstance().get("injection.evaluated", ???),
      LogLevel.DEBUG
    );*/
  }
}