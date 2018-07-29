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
    const buildInstance:Function = function():void {
      new InjectionPointBuilder();
    };
    expect(buildInstance).to.throw(SingletonError);
  }
  
  @Test({
    description: "should return a InjectionPointBuilder instance",
    order: 1
  })
  public getInstanceTest():void {
    const builder:any = InjectionPointBuilder.getInstance();
    expect(builder).to.be.an.instanceOf(InjectionPointBuilder);
  }
  
  @Test({
    description: "should return a singleton reference"
  })
  public singletonTest():void {
    const builder1:any = InjectionPointBuilder.getInstance();
    const builder2:any = InjectionPointBuilder.getInstance();
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
    description: "'getQualifiedClassName() should return 'null' as default value",
    order: 7
  })
  public getQualifiedClassNameDefaultTest():void {
    expect(this.result.getQualifiedClassName()).to.be.null;
  }

  @Test({
    description: "'getType() should return 'null' as default value",
    order: 8
  })
  public getTypeDefaultTest():void {
    expect(this.result.getType()).to.be.null;
  }

  @Test({
    description: "'getRef() should return 'null' as default value",
    order: 9
  })
  public getRefDefaultTest():void {
    expect(this.result.getRef()).to.be.null;
  }

  @Test({
    description: "'getQualifiers() should return 'null' as default value",
    order: 10
  })
  public getQualifiersDefaultTest():void {
    expect(this.result.getQualifiers()).to.be.null;
  }

  @Test({
    description: "should create an object of the type of 'SokokeInjectionPoint'",
    order: 11
  })
  public buildInitializedInstanceTest():void {
    this.result = InjectionPointBuilder.getInstance()
                                       .element(utils.PARAMETER)
                                       .type(utils.BeanType)
                                       .className(utils.CLASS_NAME)
                                       .ref(utils.BEAN_REF)
                                       .qualifiers(utils.QUALIFIERS)
                                       .build();
    expect(this.result).to.not.equal(
      InjectionPointBuilder.getInstance().build()
    );
  }

  @Test({
    description: "should return the 'null' since the bean is not ealready created",
    order: 12
  })
  public getBeanTest():void {
    expect(this.result.getBean()).to.be.null;
  }
  
  @Test({
    description: "should return the same element as used to build the injection point",
    order: 13
  })
  public getElementTest():void {
    expect(this.result.getElement()).to.equal(utils.PARAMETER);
  }
  
  @Test({
    description: "should return the class type element as used to build the injection point",
    order: 14
  })
  public getTypeTest():void {
    expect(this.result.getType()).to.equal(utils.BeanType);
  }
  
  @Test({
    description: "should return the class name as used to build the injection point",
    order: 15
  })
  public getQualifiedClassNameTest():void {
    expect(this.result.getQualifiedClassName()).to.equal(utils.CLASS_NAME);
  }
  
  @Test({
    description: "should return the class reference as used to build the injection point",
    order: 16
  })
  public getRefTest():void {
    expect(this.result.getRef()).to.equal(utils.BEAN_REF);
  }
  
  @Test({
    description: "should return the qualifiers as used to build the injection point",
    order: 17
  })
  public getQualifiersTest():void {
    expect(this.result.getQualifiers()).to.equal(utils.QUALIFIERS);
  }
  
  @Test({
    description: "should reset the builder to its initial, empty state.",
    order: 18
  })
  public clearTest():void {
    expect(
      InjectionPointBuilder.getInstance().clear()
    ).to.equal(InjectionPointBuilder.getInstance());
    this.result = InjectionPointBuilder.getInstance().build();
  }

  @Test({
    description: "'getBean()' should return 'null' after a clear() method invocation",
    order: 19
  })
  public getBeanClearTest():void {
    expect(this.result.getBean()).to.be.null;
  }
  
  @Test({
    description: "'getElement()' should return 'null' after a clear() method invocation",
    order: 20
  })
  public getElementClearTest():void {
    expect(this.result.getElement()).to.be.null;
  }
  
  @Test({
    description: "'getType()' should return 'null' after a clear() method invocation",
    order: 21
  })
  public getTypeClearTest():void {
    expect(this.result.getType()).to.be.null;
  }
  
  @Test({
    description: "'getQualifiedClassName()' should return 'null' after a clear() method invocation",
    order: 22
  })
  public getQualifiedClassNameClearTest():void {
    expect(this.result.getQualifiedClassName()).to.be.null;
  }
  
  @Test({
    description: "'getRef()' should return 'null' after a clear() method invocation",
    order: 23
  })
  public getRefClearTest():void {
    expect(this.result.getRef()).to.be.null;
  }
  
  @Test({
    description: "'getQualifiers()' should return 'null' after a clear() method invocation",
    order: 24
  })
  public getQualifiers():void {
    expect(this.result.getQualifiers()).to.be.null;
  }
}