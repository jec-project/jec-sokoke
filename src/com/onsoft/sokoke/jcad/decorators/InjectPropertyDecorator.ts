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

import {Decorator, Member, Field} from "jec-commons";
import {InjectParams, InjectionPoint, Bean} from "jec-jdi";
import {InjectionPointBuilder} from "../../builders/InjectionPointBuilder";

/**
 * The <code>InjectPropertyDecorator</code> class defines the   
 * <code>Decorator</code> implementation for the JDI <code>@Inject</code>
 * decorator when it is used to inject bean through a class member.
 */
export class InjectPropertyDecorator implements Decorator {
  
  ////////////////////////////////////////////////////////////////////////////
  // Constructor function
  ////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>InjectPropertyDecorator</code> instance.
   */
  constructor() {}

  ////////////////////////////////////////////////////////////////////////////
  // public methods
  ////////////////////////////////////////////////////////////////////////////

  /**
   * @inheritDoc
   */
  public decorate(target:any, key:string, params:InjectParams):any {
    console.log("InjectPropertyDecorator")
    console.log(target)
    console.log(key)
    console.log(params)
    let bean:Bean = null;
    let element:Member = new Field(key, target.constructor);
    let injectPoint:InjectionPoint = InjectionPointBuilder.getInstance()
                                                          .clear()
                                                          .bean(bean)
                                                          .type(params.type)
                                                          .element(element)
                                                          .build();
    console.log(injectPoint)
    console.log("---------------------------------")
    return target;
  }
}
