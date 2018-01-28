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

import {Decorator, ClassLoaderContext} from "jec-commons";
import {InjectParams, InjectionPoint} from "jec-jdi";
import {Sokoke} from "../../inject/Sokoke";
import {SokokeContext} from "../../inject/SokokeContext";

/**
 * The <code>InjectFieldDecorator</code> class defines the   
 * <code>Decorator</code> implementation for the JDI <code>@Inject</code>
 * decorator when it is used to inject bean through a field member.
 */
export class InjectFieldDecorator implements Decorator {
  
  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>InjectFieldDecorator</code> instance.
   */
  constructor() {}

  //////////////////////////////////////////////////////////////////////////////
  // public methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * @inheritDoc
   */
  public decorate(target:any, key:string, params:InjectParams):any {
    let classPath:string = ClassLoaderContext.getInstance().getPath();
    let sokoke:Sokoke = (Sokoke.getInstance() as Sokoke);
    let context:SokokeContext = sokoke.getContextByPath(classPath);
    let injectPoint:InjectionPoint = null;
    let injection:any = null;
    sokoke.setCurrentContext(context);
    injectPoint = sokoke.resolveInjectionPoint(classPath, key);
    injection = sokoke.getInjectableReference(params, injectPoint);
    Object.defineProperty(target, key, { value: injection });
    /*console.log("InjectFieldDecorator")
    console.log(injection)
    console.log("---------------------------------")*/
    return target;
  }
}
