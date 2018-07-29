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

import { TestSuite, Test } from "jec-juta";
import { expect } from "chai";
import { SokokeLocaleManager } from "../../../../../src/com/onsoft/sokoke/i18n/SokokeLocaleManager";
import { SingletonError } from "jec-commons";
import { LocaleManager, LocaleManagerBase } from "jec-commons-node";

@TestSuite({
  description: "Test the SokokeLocaleManager class methods"
})
export class SokokeLocaleManagerTest {

  @Test({
    description: "should throw a SingletonError error when calling the constructor function"
  })
  public singletonErrorTest():void {
    const buildInstance:Function = function():void {
      new SokokeLocaleManager();
    };
    expect(buildInstance).to.throw(SingletonError);
  }

  @Test({
    description: "should return a DefaultLocaleManager instance"
  })
  public getInstanceTest():void {
    const manager:LocaleManager = SokokeLocaleManager.getInstance();
    expect(manager).to.be.an.instanceOf(LocaleManagerBase);
  }
  
  @Test({
    description: "should return a singleton reference"
  })
  public validSingletonTest():void {
    const manager1:LocaleManager = SokokeLocaleManager.getInstance();
    const manager2:LocaleManager = SokokeLocaleManager.getInstance();
    expect(manager1).to.equal(manager2);
  }
}