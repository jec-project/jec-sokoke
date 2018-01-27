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
import {InjectParams, BeanManager} from "jec-jdi";
import {HashCodeBuilder} from "../../utils/HashCodeBuilder";
import {Sokoke} from "../../inject/Sokoke";
import {SokokeContext} from "../../inject/SokokeContext";

/**
 * The <code>InjectPropertyDecorator</code> class defines the   
 * <code>Decorator</code> implementation for the JDI <code>@Inject</code>
 * decorator when it is used to inject bean through a class member.
 */
export class InjectPropertyDecorator implements Decorator {
  
  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>InjectPropertyDecorator</code> instance.
   */
  constructor() {}

  //////////////////////////////////////////////////////////////////////////////
  // public methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * @inheritDoc
   */
  public decorate(target:any, key:string, params:InjectParams):any {
    let beanManager:BeanManager = null;
    let classPath:string = ClassLoaderContext.getInstance().getPath();
    let hash:number = HashCodeBuilder.getInstance().build(classPath, key);
    let sokoke:Sokoke = (Sokoke.getInstance() as Sokoke);
    let context:SokokeContext = sokoke.getContextByPath(classPath);
    sokoke.setCurrentContext(context);
    beanManager = sokoke.getBeanManager();
    console.log("InjectPropertyDecorator")
    console.log(target.constructor)
    console.log(key)
    console.log(params)
    console.log(hash)
    console.log(context)
    console.log("---------------------------------")
    return target;
  }
}
