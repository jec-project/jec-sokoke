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
 * The <code>SokokeContext</code> interface provides a JDI context for each 
 * domain container in the Sokoke framework.
 */
export interface SokokeContext {

  //////////////////////////////////////////////////////////////////////////////
  // Public methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Returns the path to the local directory where the domain associated with
   * this context is deployed.
   * 
   * @return {string} the path to the domain local directory.
   */
  getDomainPath():string;
  
  /**
   * Returns the <code>Locale</code> object associated with this context.
   * 
   * @return {Locale} the <code>Locale</code> object associated with this
   *                  context.
   */
  getLocale():Locale;
}
