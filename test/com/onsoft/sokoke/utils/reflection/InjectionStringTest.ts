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
import { InjectionString } from "../../../../../../src/com/onsoft/sokoke/utils/reflection/InjectionString";

import * as utils  from "../../../../../../utils/test-utils/utilities/InjectionStringTestUtils";

@TestSuite({
  description: "Test the InjectionString enum members"
})
export class InjectionStringTest {

  @Test({
    description: "COMA should return ','"
  })
  public COMATest():void {
    expect(InjectionString.COMA).to.equal(utils.COMA);
  }

  @Test({
    description: "DOT should return '.'"
  })
  public DOTTest():void {
    expect(InjectionString.DOT).to.equal(utils.DOT);
  }

  @Test({
    description: "SCOPETYPE_APPLICATION should return 'ScopeType.APPLICATION'"
  })
  public SCOPETYPE_APPLICATIONTest():void {
    expect(
      InjectionString.SCOPETYPE_APPLICATION
    ).to.equal(utils.SCOPETYPE_APPLICATION);
  }

  @Test({
    description: "SCOPETYPE_SESSION should return 'ScopeType.SESSION'"
  })
  public SCOPETYPE_SESSIONTest():void {
    expect(
      InjectionString.SCOPETYPE_SESSION
    ).to.equal(utils.SCOPETYPE_SESSION);
  }

  @Test({
    description: "SCOPETYPE_REQUEST should return 'ScopeType.REQUEST'"
  })
  public SCOPETYPE_REQUESTTest():void {
    expect(
      InjectionString.SCOPETYPE_REQUEST
    ).to.equal(utils.SCOPETYPE_REQUEST);
  }

  @Test({
    description: "SCOPETYPE_DEPENDENT should return 'ScopeType.DEPENDENT'"
  })
  public SCOPETYPE_DEPENDENTTest():void {
    expect(
      InjectionString.SCOPETYPE_DEPENDENT
    ).to.equal(utils.SCOPETYPE_DEPENDENT);
  }

  @Test({
    description: "NULL should return 'null'"
  })
  public NULLTest():void {
    expect(InjectionString.NULL).to.equal(utils.NULL);
  }

  @Test({
    description: "NAME should return 'name'"
  })
  public NAMETest():void {
    expect(InjectionString.NAME).to.equal(utils.NAME);
  }

  @Test({
    description: "TYPE should return 'type'"
  })
  public TYPETest():void {
    expect(InjectionString.TYPE).to.equal(utils.TYPE);
  }

  @Test({
    description: "SCOPE should return 'scope'"
  })
  public SCOPETest():void {
    expect(InjectionString.SCOPE).to.equal(utils.SCOPE);
  }

  @Test({
    description: "RETENTION should return 'retention'"
  })
  public RETENTIONTest():void {
    expect(InjectionString.RETENTION).to.equal(utils.RETENTION);
  }

  @Test({
    description: "RETENTION should return 'qualifier'"
  })
  public QUALIFIERTest():void {
    expect(InjectionString.QUALIFIER).to.equal(utils.QUALIFIER);
  }
}