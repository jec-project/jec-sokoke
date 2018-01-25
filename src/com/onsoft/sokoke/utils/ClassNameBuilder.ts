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

import {SokokeLocaleManager} from "../i18n/SokokeLocaleManager";
import {SingletonError} from "jec-commons";
import {LocaleManager} from "jec-commons-node";
import * as path from "path";

/**
 * The <code>ClassNameBuilder</code> singleton allows to build JDI class names.
 */
export class ClassNameBuilder {
  
  ////////////////////////////////////////////////////////////////////////////
  // Constructor function
  ////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>ClassNameBuilder</code> instance.
   */
  constructor() {
    let msg:string = null;
    let i18n:LocaleManager = null;
    if(ClassNameBuilder._locked || ClassNameBuilder.INSTANCE) {
      i18n = SokokeLocaleManager.getInstance();
      if(i18n.isInitialized()) {
        msg = i18n.get("errors.singleton", "ClassNameBuilder");
      } else {
        msg = "You cannot create a ClassNameBuilder instance; " +
              "use getInstance() instead.";
      }
      throw new SingletonError(msg);
    }
    ClassNameBuilder._locked = true;
  }

  //////////////////////////////////////////////////////////////////////////////
  // Singleton managment
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Prevents <code>ClassNameBuilder</code> illegal instanciations.
   */
  private static _locked:boolean = true;

  /**
   * The <code>ClassNameBuilder</code> singleton instance reference.
   */
  private static INSTANCE:ClassNameBuilder = null;

  /**
   * Returns a reference to the <code>ClassNameBuilder</code> singleton.
   *
   * @return {ClassNameBuilder} a reference to the <code>ClassNameBuilder</code>
   *                            singleton.
   */
  public static getInstance():ClassNameBuilder {
    if(ClassNameBuilder.INSTANCE === null) {
      ClassNameBuilder._locked = false;
      ClassNameBuilder.INSTANCE = new ClassNameBuilder();
    }
    return ClassNameBuilder.INSTANCE;
  }

  ////////////////////////////////////////////////////////////////////////////
  // Private properties
  ////////////////////////////////////////////////////////////////////////////

  /**
   * The amount of characters used to extract the qualified class name.
   */
  private _domainPathLength:number = -1;

  /**
   * The path to the domain that invokes the current Sokoke container.
   */
  private _domainPath:string = null;

  /**
   * A reference to the dot (<code>.</code>) character.
   */
  private readonly DOT:string = ".";

  /**
   * The pattern used to remove slash and backslash characters.
   */
  private readonly PATTERN:RegExp = /\/|\\/g;

  ////////////////////////////////////////////////////////////////////////////
  // Public methods
  ////////////////////////////////////////////////////////////////////////////

  /**
   * Sets the path to the domain invokes the current Sokoke container.
   * 
   * @param {string} domainPath the path to the domain invokes the current
   *                            Sokoke container.
   */
  public setDomainPath(domainPath:string):void {
    this._domainPath = domainPath;
    this._domainPathLength = path.join(domainPath, "src").length + 1;
  }

  /**
   * Returns the path to the domain invokes the current Sokoke container.
   * 
   * @return {string} the path to the domain invokes the current Sokoke
   *                  container.
   */
  public getDomainPath():string {
    return this._domainPath;
  }

  /**
   * Returns a valid JDI class name, built from the specified class path.
   * 
   * @param {string} classPath the path to the class for which to build a valid
   *                           JDI class name.
   * @return {string} a valid JDI class name.
   */
  public build(classPath:string):string {
    let className:string = 
               classPath.substring(this._domainPathLength, classPath.length - 3)
                        .replace(this.PATTERN, this.DOT);
    return className;
  }
}