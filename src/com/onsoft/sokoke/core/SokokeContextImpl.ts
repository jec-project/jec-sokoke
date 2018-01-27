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

import {Locale} from "jec-commons";

/**
 * The <code>SokokeContextImpl</code> class is the default implementation of the
 * <code>SokokeContext</code> interface.
 */
export class SokokeContextImpl {

  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>SokokeContextImpl</code> instance.
   * 
   * @param {string} domainPath the path to the domain associated with this
   *                            context.
   * @param {Locale} locale the locale associated with this context.
   */
  constructor(domainPath:string, locale:Locale) {
    this.initObj(domainPath, locale);
  }

  //////////////////////////////////////////////////////////////////////////////
  // Private properties
  //////////////////////////////////////////////////////////////////////////////

  /**
   * The path to the domain associated with this context.
   */
  private _domainPath:string = null;

  /**
   * The locale associated with this context.
   */
  private _locale:Locale = null;

  //////////////////////////////////////////////////////////////////////////////
  // Private methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Initializes this object.
   * 
   * @param {string} domainPath the path to the domain associated with this
   *                            context.
   * @param {Locale} locale the locale associated with this context.
   */
  private initObj(domainPath:string, locale:Locale):void {
    this._domainPath = domainPath;
    this._locale = locale;
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * @inheritDoc
   */
  public getDomainPath():string {
    return this._domainPath;
  }
  
  /**
   * @inheritDoc
   */
  public getLocale():Locale {
    return this._locale;
  }
}
