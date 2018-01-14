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

import { TestSuite, Test, AfterAll, TestSorters } from "jec-juta";
import { expect } from "chai";
import { InjectionPointBuilder } from "../../../../../src/com/onsoft/sokoke/builders/InjectionPointBuilder";
import { SokokeInjectionPoint } from "../../../../../src/com/onsoft/sokoke/inject/SokokeInjectionPoint";
import { InjectionPoint } from "jec-jdi";
import { SingletonError } from "jec-commons";

import * as utils from "../../../../../utils/test-utils/utilities/InjectionPointBuilderTestUtils";

@TestSuite({
  description: "Test the InjectionPointBuilder class methods",
  testOrder: TestSorters.ORDER_ASCENDING
})
export class InjectionPointBuilderTest {

  public result:InjectionPoint = null;

  @AfterAll()
  public resetTest():void {
    this.result = null;
  }

  @Test({
    description: "should throw a singleton error when calling the constructor function",
    order: 0
  })
  public singletonErrorTest():void {
    let buildInstance:Function = function():void {
      new InjectionPointBuilder();
    };
    expect(buildInstance).to.throw(SingletonError);
  }
  
  @Test({
    description: "should return a InjectionPointBuilder instance",
    order: 1
  })
  public getInstanceTest():void {
    let builder:any = InjectionPointBuilder.getInstance();
    expect(builder).to.be.an.instanceOf(InjectionPointBuilder);
  }
  
  @Test({
    description: "should return a singleton reference"
  })
  public singletonTest():void {
    let builder1:any = InjectionPointBuilder.getInstance();
    let builder2:any = InjectionPointBuilder.getInstance();
    expect(builder1).to.equal(builder2);
  }

  @Test({
    description: "should create an object of the type of 'SokokeInjectionPoint'",
    order: 3
  })
  public buildTest():void {
    expect(
      InjectionPointBuilder.getInstance().build()
    ).to.be.an.instanceOf(SokokeInjectionPoint);
  }
  
  @Test({
    description: "should create an object of the type of 'SokokeInjectionPoint'",
    order: 4
  })
  public buildNewInstanceTest():void {
    this.result = InjectionPointBuilder.getInstance().build();
    expect(this.result).to.not.equal(
      InjectionPointBuilder.getInstance().build()
    );
  }
  
  @Test({
    description: "'getBean() should return 'null' as default value",
    order: 5
  })
  public getBeanDefaultTest():void {
    expect(this.result.getBean()).to.be.null;
  }
  
  @Test({
    description: "'getElement() should return 'null' as default value",
    order: 6
  })
  public getElementDefaultTest():void {
    expect(this.result.getElement()).to.be.null;
  }
  
  @Test({
    description: "'getType() should return 'null' as default value",
    order: 7
  })
  public getTypeDefaultTest():void {
    expect(this.result.getType()).to.be.null;
  }

  @Test({
    description: "should create an object of the type of 'SokokeInjectionPoint'",
    order: 8
  })
  public buildInitializedInstanceTest():void {
    this.result = InjectionPointBuilder.getInstance()
                                       .bean(utils.BEAN)
                                       .element(utils.PARAMETER)
                                       .type(utils.BeanType)
                                       .build();
    expect(this.result).to.not.equal(
      InjectionPointBuilder.getInstance().build()
    );
  }

  @Test({
    description: "should return the same 'Bean' as used to build the injection point",
    order: 9
  })
  public getBeanTest():void {
    expect(this.result.getBean()).to.equal(utils.BEAN);
  }
  
  @Test({
    description: "should return the same element as used to build the injection point",
    order: 10
  })
  public getElementTest():void {
    expect(this.result.getElement()).to.equal(utils.PARAMETER);
  }
  
  @Test({
    description: "should return the class type element as used to build the injection point",
    order: 11
  })
  public getTypeTest():void {
    expect(this.result.getType()).to.equal(utils.BeanType);
  }
  
  @Test({
    description: "should reset the builder to its initial, empty state.",
    order: 12
  })
  public clearTest():void {
    expect(InjectionPointBuilder.getInstance().clear()).to.be.OK;
    this.result = InjectionPointBuilder.getInstance().build();
  }

  @Test({
    description: "'getBean() should return 'null' after a clear() method invocation",
    order: 13
  })
  public getBeanClearTest():void {
    expect(this.result.getBean()).to.be.null;
  }
  
  @Test({
    description: "'getElement() should return 'null' after a clear() method invocation",
    order: 14
  })
  public getElementClearTest():void {
    expect(this.result.getElement()).to.be.null;
  }
  
  @Test({
    description: "'getType() should return 'null' after a clear() method invocation",
    order: 15
  })
  public getTypeClearTest():void {
    expect(this.result.getType()).to.be.null;
  }
}