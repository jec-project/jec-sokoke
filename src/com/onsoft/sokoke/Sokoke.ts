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

import {DomainContainer} from "jec-glasscat-core";
import {SokokeError} from "./exceptions/SokokeError";

/**
 * The main Sokoke execution entry point, which will execute a full Sokoke
 * execution session.
 */
export interface Sokoke {

  //////////////////////////////////////////////////////////////////////////////
  // Public methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Sets the domain contained associated with this <code>Sokoke</code>
   * object.
   * 
   * @param {DomainContainer} container the domain associated with this
   *                                    <code>Sokoke</code> object.
   */
  setDomainContainer(container:DomainContainer):void;

  /**
   * Starts the Sokoke main process.
   * 
   * @param {Function} callback the callback method called an the end of the
   *                            process. This function takes a
   *                            <code>SokokeError</code> object as parameter
   *                            which represents an error message if the
   *                            process failed.
   */
  process(callback:(err:SokokeError)=>void):void;
};
