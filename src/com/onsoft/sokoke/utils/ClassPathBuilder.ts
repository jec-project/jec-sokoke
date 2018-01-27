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
import {SingletonError, FileProperties} from "jec-commons";
import {LocaleManager} from "jec-commons-node";
import * as path from "path";

/**
 * The <code>ClassPathBuilder</code> singleton allows to build class paths based
 * on <code>FileProperties</code> objects.
 */
export class ClassPathBuilder {
  
  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>ClassPathBuilder</code> instance.
   */
  constructor() {
    let msg:string = null;
    let i18n:LocaleManager = null;
    if(ClassPathBuilder._locked || ClassPathBuilder.INSTANCE) {
      i18n = SokokeLocaleManager.getInstance();
      if(i18n.isInitialized()) {
        msg = i18n.get("errors.singleton", "ClassPathBuilder");
      } else {
        msg = "You cannot create a ClassPathBuilder instance; " +
              "use getInstance() instead.";
      }
      throw new SingletonError(msg);
    }
    ClassPathBuilder._locked = true;
  }

  //////////////////////////////////////////////////////////////////////////////
  // Singleton managment
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Prevents <code>ClassPathBuilder</code> illegal instanciations.
   */
  private static _locked:boolean = true;

  /**
   * The <code>ClassPathBuilder</code> singleton instance reference.
   */
  private static INSTANCE:ClassPathBuilder = null;

  /**
   * Returns a reference to the <code>ClassPathBuilder</code> singleton.
   *
   * @return {ClassPathBuilder} a reference to the <code>ClassPathBuilder</code>
   *                            singleton.
   */
  public static getInstance():ClassPathBuilder {
    if(ClassPathBuilder.INSTANCE === null) {
      ClassPathBuilder._locked = false;
      ClassPathBuilder.INSTANCE = new ClassPathBuilder();
    }
    return ClassPathBuilder.INSTANCE;
  }

  //////////////////////////////////////////////////////////////////////////////
  // Private properties
  //////////////////////////////////////////////////////////////////////////////

  /**
   * A reference to the dot (<code>.</code>) character.
   */
  private readonly DOT:string = ".";

  //////////////////////////////////////////////////////////////////////////////
  // Public methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Returns the class path for the specified file.
   * 
   * @param {FileProperties} file the reference to the file for which to get the
   *                              class path.
   * @return {string} the class path for the current file.
   */
  public build(file:FileProperties):string {
    let fileName:string = file.name + this.DOT + file.extension;
    let filePath:string = path.join(file.path, fileName);
    return filePath;
  }
}