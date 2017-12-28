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

import { TestSuite, Test, TestSorters, BeforeAll, AfterAll } from "jec-juta";
import * as chai from "chai";
import * as spies from "chai-spies";
import { DefaultSokokeContainer } from "../../../../../src/com/onsoft/sokoke/core/DefaultSokokeContainer";
import { SokokeError } from "../../../../../src/com/onsoft/sokoke/exceptions/SokokeError";

// Utilities:
//import * as utils from "../../../../../utils/test-utils/utilities/DefaultSokokeContainerTestUtils";

// Chai declarations:
const expect:any = chai.expect;
chai.use(spies);

@TestSuite({
  description: "Test the DefaultSokokeContainer class methods",
  testOrder: TestSorters.ORDER_ASCENDING,
  disabled: true
})
export class DefaultSokokeContainerTest {

  public container:DefaultSokokeContainer = null;

  @BeforeAll()
  public initTest():void {
    this.container = new DefaultSokokeContainer();
  }

  @AfterAll()
  public resetTest():void {
    this.container = null;
  }
}