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
import { SokokeInjectionPoint } from "../../../../../src/com/onsoft/sokoke/inject/SokokeInjectionPoint";
import { InjectionPoint } from "jec-jdi";
import { SingletonError } from "jec-commons";

import * as utils from "../../../../../utils/test-utils/utilities/InjectionPointBuilderTestUtils";

@TestSuite({
  description: "Test the SokokeInjectionPoint class methods"
})
export class SokokeInjectionPointTest {

  public injectionPoint:InjectionPoint = null;

  @BeforeAll()
  public initTest():void {
    this.injectionPoint = new SokokeInjectionPoint(
      utils.BEAN, utils.BeanType, utils.PARAMETER, utils.CLASS_NAME,
      utils.BEAN_REF, utils.QUALIFIERS
    );
  }

  @AfterAll()
  public resetTest():void {
    this.injectionPoint = null;
  }

  @Test({
    description: "should return the same 'Bean' as used to build the injection point"
  })
  public getBeanTest():void {
    expect(this.injectionPoint.getBean()).to.equal(utils.BEAN);
  }
  
  @Test({
    description: "should return the same element as used to build the injection point"
  })
  public getElementTest():void {
    expect(this.injectionPoint.getElement()).to.equal(utils.PARAMETER);
  }
  
  @Test({
    description: "should return the same class type element as used to build the injection point"
  })
  public getTypeTest():void {
    expect(this.injectionPoint.getType()).to.equal(utils.BeanType);
  }
  
  @Test({
    description: "should return the same class name as used to build the injection point"
  })
  public getQualifiedClassNameTest():void {
    expect(
      this.injectionPoint.getQualifiedClassName()
    ).to.equal(utils.CLASS_NAME);
  }
  
  @Test({
    description: "should return the same bean name as used to build the injection point"
  })
  public getRefTest():void {
    expect(
      this.injectionPoint.getRef()
    ).to.equal(utils.BEAN_REF);
  }

  @Test({
    description: "should return the same qualifiers as used to build the injection point"
  })
  public getQualifiersTest():void {
    expect(
      this.injectionPoint.getQualifiers()
    ).to.equal(utils.QUALIFIERS);
  }
}