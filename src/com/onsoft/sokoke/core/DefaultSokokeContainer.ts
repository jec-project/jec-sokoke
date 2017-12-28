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

import {Sokoke} from "../Sokoke";
import {DomainContainer} from "jec-glasscat-core";
import {SokokeError} from "../exceptions/SokokeError";

/**
 * The default implementation of the <code>Sokoke</code> interface.
 */
export class DefaultSokokeContainer implements Sokoke {

  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>DefaultSokokeContainer</code> instance.
   */
  constructor() {
    this.initObj();
  }

  //////////////////////////////////////////////////////////////////////////////
  // Private properties
  //////////////////////////////////////////////////////////////////////////////

  /**
   * The <code>DomainContainer</code> object associated with this Sokoke
   * container.
   */
  private _domainContainer:DomainContainer = null;

  //////////////////////////////////////////////////////////////////////////////
  // Private methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Initializes this object.
   */
  private initObj():void {
    
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Returns the <code>DomainContainer</code> object associated with this
   * Sokoke container.
   * 
   * @return {DomainContainer} the <code>DomainContainer</code> object 
   *                           associated with this Sokoke container.
   */
  public getDomainContainer():DomainContainer {
    return this._domainContainer;
  }

  /**
   * @inheritDoc
   */
  public setDomainContainer(container:DomainContainer):void {
    let message:string = "domain container initialized:";
    this._domainContainer = container;
  }

  /**
   * @inheritDoc
   */
  public process(callback:(err:SokokeError)=>void):void {
    let message:string = "Sokoke process start";
    callback(null);
  }
};
