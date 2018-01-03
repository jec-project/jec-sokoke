//  DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS HEADER.
//
//   Copyright 2016-2017 Pascal ECHEMANN.
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

import {SokokeLoggerProxy} from "../logging/SokokeLoggerProxy";
import {LoggerProxy, FilePreProcessor, FileProperties, DecoratorProperties} from "jec-commons";
import {SokokeLocaleManager} from "../i18n/SokokeLocaleManager";
import {SokokeError} from "../exceptions/SokokeError";

/**
 * The <code>SokokeAutowireProcessor</code> class allows to find all Sokoke  
 * resources of an <code>EjpContainer</code> instance.
 */
export class SokokeAutowireProcessor implements FilePreProcessor {
  
  ////////////////////////////////////////////////////////////////////////////
  // Constructor function
  ////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>SokokeAutowireProcessor</code> instance.
   */
  constructor() {
    this.initObj();
  }

  ////////////////////////////////////////////////////////////////////////////
  // Private properties
  ////////////////////////////////////////////////////////////////////////////

  /**
   * The mask used to detect the <code>jec-jdi</code> imports in a file.
   */
  private static readonly JDI_MASK:string = "jec-jdi";

  /**
   * The mask used to detect the <code>@Injectable</code> decorator in a file.
   * 
   */
  private static readonly INJECTABLE_MASK:string = "Injectable";

  ////////////////////////////////////////////////////////////////////////////
  // Private methods
  ////////////////////////////////////////////////////////////////////////////
  
  /**
   * Initialize this object.
   */
  private initObj():void {
    SokokeLocaleManager.getInstance();
  }

  /**
   * Starts beans resolution process.
   */
  private resolveInjectionPoints():void {
    let logger:LoggerProxy = SokokeLoggerProxy.getInstance();
    logger.log(
      "resolveInjectionPoints"
    );
  }

  ////////////////////////////////////////////////////////////////////////////
  // Public methods
  ////////////////////////////////////////////////////////////////////////////

  /**
   * @inheritDoc
   */
  public processStart(watcher:any, sourcePath:string):void {
    SokokeLoggerProxy.getInstance().log(
      "Sokoke processStart"
    );
  }

  /**
   * @inheritDoc
   */
  public process(file:FileProperties, watcher:any):void {
    let decorators:DecoratorProperties[] = file.decorators;
    let len:number = decorators.length;
    let decorator:DecoratorProperties = null;
    let classPath:string = null;
    let decoratorName:string = null;
    let logger:LoggerProxy = SokokeLoggerProxy.getInstance();
    let fileName:string = file.name;
    while(len--) {
      decorator = decorators[len];
      classPath = decorator.classPath;
      decoratorName = decorator.name;
      if(classPath === SokokeAutowireProcessor.JDI_MASK &&
         decoratorName === SokokeAutowireProcessor.INJECTABLE_MASK) {
        console.log(`------------------>
decoratorName=${decoratorName}
<------------------`)
        logger.log(
          "autowired bean detected: source file='" + fileName + "'"
        );
      }
    }
  }

  /**
   * @inheritDoc
   */
  public processComplete(watcher:any, sourcePath:string) {
    SokokeLoggerProxy.getInstance().log(
      "Sokoke processComplete"
    );
  }
}