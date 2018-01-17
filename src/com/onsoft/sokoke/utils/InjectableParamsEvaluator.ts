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

import {Bean, Scope} from "jec-jdi";
import {BeanBuilder} from "../builders/BeanBuilder";
import {FileProperties, UrlStringsEnum} from "jec-commons";
import {ScopeStrategy} from "../utils/ScopeStrategy";
import * as path from "path";

/**
 * The <code>InjectableParamsEvaluator</code> class.  
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

  private getBeanClass(file:FileProperties):any {
    let fileName:string = file.name + UrlStringsEnum.DOT + file.extension;
    let filePath:string = path.join(file.path, fileName);
    let beanClass:any = require(filePath);
    console.log(beanClass);
    return beanClass;
  }

  private resolveInjectableParams(content:string):any {
    let params:any = {};
    return params;
  }

  ////////////////////////////////////////////////////////////////////////////
  // Public methods
  ////////////////////////////////////////////////////////////////////////////

  /**
   * TODO
   * 
   * @param {string} params 
   */
  public evaluate(file:FileProperties):void {
    let params:any = this.resolveInjectableParams(file.content);
    let scope:Scope = ScopeStrategy.getInstance().resolve(params.scope);
    let name:string = null;
    let beanClass:any = this.getBeanClass(file);
    let bean:Bean = BeanBuilder.getInstance()
                               .clear()
                               .name(name)
                               .scope(scope)
                               .beanClass(beanClass)
                               .build();
    console.log(bean)
  }
}