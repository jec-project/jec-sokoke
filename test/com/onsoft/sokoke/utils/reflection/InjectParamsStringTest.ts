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
import { InjectParamsString } from "../../../../../../src/com/onsoft/sokoke/utils/reflection/InjectParamsString";

import * as utils  from "../../../../../../utils/test-utils/utilities/InjectParamsStringTestUtils";

@TestSuite({
  description: "Test the InjectParamsString enum members"
})
export class InjectParamsStringTest {

  /*@Test({
    description: "DECORATE should return '__decorate(['"
  })
  public DECORATETest():void {
    expect(InjectParamsString.DECORATE).to.equal(utils.DECORATE);
  }

  @Test({
    description: "DECORATE_CLOSING should return ');'"
  })
  public DECORATE_CLOSINGTest():void {
    expect(InjectParamsString.DECORATE_CLOSING).to.equal(utils.DECORATE_CLOSING);
  }

  @Test({
    description: "PROTOTYPE should return '.prototype, \"'"
  })
  public PROTOTYPETest():void {
    expect(InjectParamsString.PROTOTYPE).to.equal(utils.PROTOTYPE);
  }
  
  @Test({
    description: "INJECT should return '.Inject('"
  })
  public INJECTTest():void {
    expect(InjectParamsString.INJECT).to.equal(utils.INJECT);
  }*/
}