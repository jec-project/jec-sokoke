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

import { TestSuite, Test, AfterAll, BeforeAll } from "jec-juta";
import { expect } from "chai";
import { SokokeBean } from "../../../../../src/com/onsoft/sokoke/inject/SokokeBean";
import { Bean } from "jec-jdi";

import * as utils from "../../../../../utils/test-utils/utilities/SokokeBeanTestUtils";

@TestSuite({
  description: "Test the SokokeBean class methods"
})
export class SokokeBeanTest {

  public bean:Bean = null;

  @BeforeAll()
  public initTest():void {
    this.bean = new SokokeBean(utils.NAME, utils.SCOPE);
  }

  @AfterAll()
  public resetTest():void {
    this.bean = null;
  }

  @Test({
    description: "should return the same 'Scope' as passed as constructor parameter"
  })
  public getScopeTest():void {
    expect(this.bean.getScope()).to.equal(utils.SCOPE);
  }
  
  @Test({
    description: "should return the same 'name' as passed as constructor parameter"
  })
  public getNameTest():void {
    expect(this.bean.getName()).to.equal(utils.NAME);
  }
}