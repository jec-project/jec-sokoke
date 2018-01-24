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

import {Scope, InjectableParams, ScopeType, InjectParams} from "jec-jdi";
import {FileProperties, LoggerProxy, SingletonError, GlobalClassLoader} from "jec-commons";
import * as path from "path";
import {InjectionString} from "./InjectionString";
import {JdiRegExp} from "./JdiRegExp";
import {LocaleManager} from "jec-commons-node";
import {SokokeLocaleManager} from "../../i18n/SokokeLocaleManager";

/**
 * The <code>InjectionSanitizer</code> singleton allows to evaluate objects
 * used to define injections in a bean file.  
 */
export class InjectionSanitizer {
  
  ////////////////////////////////////////////////////////////////////////////
  // Constructor function
  ////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>InjectionSanitizer</code> instance.
   */
  constructor() {
    let msg:string = null;
    let i18n:LocaleManager = null;
    if(InjectionSanitizer._locked || InjectionSanitizer.INSTANCE) {
      i18n = SokokeLocaleManager.getInstance();
      if(i18n.isInitialized()) {
        msg = i18n.get("errors.singleton", "Sokoke");
      } else {
        msg = "You cannot create a Sokoke instance; " +
              "use getInstance() instead.";
      }
      throw new SingletonError(msg);
    }
    InjectionSanitizer._locked = true;
  }

  //////////////////////////////////////////////////////////////////////////////
  // Singleton managment
  //////////////////////////////////////////////////////////////////////////////

  /**
   * The <code>InjectionSanitizer</code> singleton instance reference.
   */
  private static INSTANCE:InjectionSanitizer = null;

  /**
   * Prevents <code>InjectionSanitizer</code> illegal instanciations.
   */
  private static _locked:boolean = true;

  /**
   * Returns a reference to the <code>InjectionSanitizer</code> singleton.
   * 
   * @return {InjectionSanitizer} a reference to the
   *                              <code>InjectionSanitizer</code> singleton.
   */
  public static getInstance():InjectionSanitizer{
    if(InjectionSanitizer.INSTANCE === null) {
      InjectionSanitizer._locked = false;
      InjectionSanitizer.INSTANCE = new InjectionSanitizer();
    }
    return InjectionSanitizer.INSTANCE;
  }
  
  ////////////////////////////////////////////////////////////////////////////
  // Private methods
  ////////////////////////////////////////////////////////////////////////////

  /**
   * Sanitizes the string value from the specified string representation.
   * 
   * @param {string} value the value to sanitize.
   * @return {string} the sanitized string value.
   */
  private sanitizesString(value:string):string {
    let len:number = value.length - 1;
    let result:string = value.lastIndexOf(InjectionString.COMA) === len ?
                        value.substr(1, len - 2) : value.substr(1, len - 1);
    return result;
  }

  ////////////////////////////////////////////////////////////////////////////
  // Public methods
  ////////////////////////////////////////////////////////////////////////////

  /**
   * A visitor function that sanitizes the name of the evaluated bean.
   * 
   * @param {InjectableParams|InjectParams} params the injectable parameters for 
   *                                               the evaluated bean.
   * @param {string} value the value to sanitize.
   */
  public sanitizeName(params:InjectableParams|InjectParams, value:string):void {
    params.name = this.sanitizesString(value);
  }

  /**
   * A visitor function that sanitizes the type of the evaluated bean file.
   * 
   * @param {InjectableParams|InjectParams} params the injectable parameters for 
   *                                               the evaluated bean file.
   * @param {string} value the value to sanitize.
   * @param {FileProperties} file the reference to the loaded bean file.
   */
  public sanitizeType(params:InjectableParams|InjectParams, value:string,
                                                     file:FileProperties):void {
    let len:number = value.length - 1;
    let rawType:string = value.lastIndexOf(InjectionString.COMA) === len ?
                         value.substr(0, len) : value;
    let importRef:string =
                    rawType.substr(0, rawType.lastIndexOf(InjectionString.DOT)); 
    let importRefPath:string = 
                      JdiRegExp.getTypeMatcher(importRef).exec(file.content)[1];
    let importPath:string = path.resolve(file.path, importRefPath);
    let type:Symbol = GlobalClassLoader.getInstance().loadClass(importPath);
    params.type = type;
  }
  
  /**
   * A visitor function that sanitizes the scope of the evaluated bean file.
   * 
   * @param {InjectableParams} params the injectable parameters for the
   *                                  evaluated bean file.
   * @param {string} value the value to sanitize.
   */
  public sanitizeScope(params:InjectableParams, value:string):void {
    if(value.indexOf(InjectionString.SCOPETYPE_APPLICATION) !== -1) {
      params.scope = ScopeType.APPLICATION;
    } else if(value.indexOf(InjectionString.SCOPETYPE_SESSION) !== -1) {
      params.scope = ScopeType.SESSION;
    } else if(value.indexOf(InjectionString.SCOPETYPE_REQUEST) !== -1) {
      params.scope = ScopeType.REQUEST;
    } else if(value.indexOf(InjectionString.SCOPETYPE_DEPENDENT) !== -1 ||
              value.indexOf(InjectionString.NULL) !== -1) {
      params.scope = null;
    } else {
      params.scope = this.sanitizesString(value);
    }
  }
}