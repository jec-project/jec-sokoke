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

import {InjectParamsEvaluator} from "../utils/reflection/InjectParamsEvaluator";
import {FileProperties, LogLevel} from "jec-commons";
import {Bean, InjectionPoint, BeanManager} from "jec-jdi";
import {Sokoke} from "../inject/Sokoke";
import {SokokeLocaleManager} from "../i18n/SokokeLocaleManager";
import {SokokeLoggerProxy} from "../logging/SokokeLoggerProxy";

/**
 * The <code>InjectionPointsFactory</code> is responsible to create collections
 * of <code>InjectionPoint</code> objects during the autowiring process.
 */
export class InjectionPointsFactory {
  
  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>InjectionPointsFactory</code> instance.
   */
  constructor() {
    this.initObj();
  }

  //////////////////////////////////////////////////////////////////////////////
  // Private properties
  //////////////////////////////////////////////////////////////////////////////

  /**
   * The <code>InjectParamsEvaluator</code> object associated with this
   * <code>InjectionPointsFactory</code> instance.
   */
  private _evaluator:InjectParamsEvaluator = null;

  //////////////////////////////////////////////////////////////////////////////
  // Private methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Initializes this object.
   */
  private initObj():void {
    this._evaluator = new InjectParamsEvaluator();
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates all injection points for the specified file.
   * 
   * @param {FileProperties} file the file for which to create injection points.
   * @param {Bean} bean a reference to the bean that injection points belongs
   *                    to; or <code>null</code> whether injection points does
   *                    not belong to a bean.
   */
  public create(file:FileProperties, bean:Bean):void {
    let injectPoints:InjectionPoint[] = this._evaluator.evaluate(file, bean);
    let len:number = injectPoints.length;
    let injectPoint:InjectionPoint = null;
    let showTrace:boolean = SokokeLoggerProxy.getInstance()
                                             .getLogger()
                                             .getLogLevel() <= LogLevel.DEBUG;
    while(len--){
      injectPoint = injectPoints[len];
      if(showTrace) {
        SokokeLoggerProxy.getInstance().log(
          SokokeLocaleManager.getInstance().get(
            "injection.evaluated", String(injectPoint)
          ),
          LogLevel.DEBUG
        );
        Sokoke.getInstance().getBeanManager().addInjectionPoint(injectPoint);
      }
    }
  }
}