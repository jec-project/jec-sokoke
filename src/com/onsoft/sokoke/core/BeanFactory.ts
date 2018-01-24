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

import {Scope, Bean} from "jec-jdi";
import {InjectableParamsEvaluator} from "../utils/reflection/InjectableParamsEvaluator";
import {FileProperties, LogLevel} from "jec-commons";
import {SokokeLoggerProxy} from "../logging/SokokeLoggerProxy";
import {SokokeLocaleManager} from "../i18n/SokokeLocaleManager";

/**
 * The <code>BeanFactory</code> is responsible to create <code>Bean</code>
 * objects during the autowiring process.
 */
export class BeanFactory {
  
  ////////////////////////////////////////////////////////////////////////////
  // Constructor function
  ////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>BeanFactory</code> instance.
   */
  constructor() {
    this.initObj();
  }

  ////////////////////////////////////////////////////////////////////////////
  // Private properties
  ////////////////////////////////////////////////////////////////////////////

  /**
   * The <code>InjectableParamsEvaluator</code> object associated with this
   * <code>BeanFactory</code> instance.
   */
  private _evaluator:InjectableParamsEvaluator = null;

  ////////////////////////////////////////////////////////////////////////////
  // Private methods
  ////////////////////////////////////////////////////////////////////////////

  /**
   * Initializes this object.
   */
  private initObj():void {
    this._evaluator = new InjectableParamsEvaluator();
  }

  ////////////////////////////////////////////////////////////////////////////
  // Public methods
  ////////////////////////////////////////////////////////////////////////////

  /**
   * 
   * 
   * @param {FileProperties} file 
   */
  public create(file:FileProperties):Bean {
    let bean:Bean = this._evaluator.evaluate(file);
    SokokeLoggerProxy.getInstance().log(
      SokokeLocaleManager.getInstance().get("bean.evaluated", bean.toString()),
      LogLevel.DEBUG
    );
    return bean;
  }
}