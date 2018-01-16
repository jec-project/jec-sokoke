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

import {Scope, Bean} from "jec-jdi";

/**
 * The <code>SokokeBean</code> class is the implementation of the
 * <code>Bean</code> interface in the Sokoke framework.
 */
export class SokokeBean implements Bean {

  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>SokokeBean</code> instance.
   * 
   * @param {string} name the name of the bean, if it has one.
   * @param {Scope} scope the scope of the bean.
   */
  constructor(name:string, scope:Scope) {
    this.initObj(name, scope);
  }

  //////////////////////////////////////////////////////////////////////////////
  // Private properties
  //////////////////////////////////////////////////////////////////////////////

  /**
   * The name of this bean.
   */
  private _name:string = null;

  /**
   * The scope for this bean.
   */
  private _scope:Scope = null;

  //////////////////////////////////////////////////////////////////////////////
  // Private methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Initializes this object.
   * 
   * @param {string} name the name of the bean, if it has one.
   * @param {Scope} scope the scope of the bean.
   */
  private initObj(name:string, scope:Scope):void {
    this._name = name;
    this._scope = scope;
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * @inheritDoc
   */
  public getScope(): Scope {
    return this._scope;
  }

  /**
   * @inheritDoc
   */
  public getName(): string {
    return this._name;
  }
}
