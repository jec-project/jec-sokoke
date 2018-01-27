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

import {Decorator} from "jec-commons";
import {InjectParams} from "jec-jdi";

/**
 * The <code>InjectParameterDecorator</code> class defines the   
 * <code>Decorator</code> implementation for the JDI <code>@Inject</code>
 * decorator when it is used to inject bean through a method parameter.
 */
export class InjectParameterDecorator implements Decorator {
  
  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>InjectParameterDecorator</code> instance.
   */
  constructor() {}

  //////////////////////////////////////////////////////////////////////////////
  // public methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * @inheritDoc
   */
  public decorate(target:any, propertyKey:string|symbol,
                               parameterIndex:number, params:InjectParams):any {
    console.log("InjectParameterDecorator")
    console.log(target)
    console.log(propertyKey)
    console.log(parameterIndex)
    console.log(params)
    console.log("---------------------------------")
    return target;
  }
}
