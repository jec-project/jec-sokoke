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
import { JdiConnector } from "../../../../../../src/com/onsoft/sokoke/jcad/connectors/JdiConnector";
import { JdiConnectorRefs } from "jec-jdi";
import { AbstractDecoratorConnector } from "jec-commons";

// Utilities:
import * as utils from "../../../../../../utils/test-utils/utilities/JdiConnectorTestUtils";

@TestSuite({
  description: "Test the JdiConnector class methods"
})
export class JdiConnectorTest {
  
  @Test({
    description: "should extend the AbstractDecoratorConnector class"
  })
  public errorInstanceTest():void {
    let connector = new JdiConnector(
      JdiConnectorRefs.INJECTABLE_CONNECTOR_REF, utils.DECORATOR
    );
    expect(connector).to.be.an.instanceOf(AbstractDecoratorConnector);
  }
  
  @Test({
    description: "should return the JCAD reference passed as parameter of the constructor function"
  })
  public getJcadReferenceTest():void {
    let connector = new JdiConnector(
      JdiConnectorRefs.INJECTABLE_CONNECTOR_REF, utils.DECORATOR
    );
    expect(
      connector.getJcadReference()
    ).to.be.equal(JdiConnectorRefs.INJECTABLE_CONNECTOR_REF);
  }
  
  @Test({
    description: "should return the Decorator instance passed as parameter of the constructor function"
  })
  public getDecoratorTest():void {
     let connector = new JdiConnector(
      JdiConnectorRefs.INJECTABLE_CONNECTOR_REF, utils.DECORATOR
    );
    expect(connector.getDecorator()).to.be.equal(utils.DECORATOR);
  }
}