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
import { BeanBuilder } from "../../../../../src/com/onsoft/sokoke/builders/BeanBuilder";
import { SokokeBean } from "../../../../../src/com/onsoft/sokoke/inject/SokokeBean";
import { Bean } from "jec-jdi";
import { SingletonError } from "jec-commons";

import * as utils from "../../../../../utils/test-utils/utilities/SokokeBeanTestUtils";

@TestSuite({
  description: "Test the BeanBuilder class methods",
  testOrder: TestSorters.ORDER_ASCENDING
})
export class BeanBuilderTest {

  public bean:Bean = null;

  @AfterAll()
  public resetTest():void {
    this.bean = null;
  }

  @Test({
    description: "should throw a singleton error when calling the constructor function",
    order: 0
  })
  public singletonErrorTest():void {
    const buildInstance:Function = function():void {
      new BeanBuilder();
    };
    expect(buildInstance).to.throw(SingletonError);
  }
  
  @Test({
    description: "should return a BeanBuilder instance",
    order: 1
  })
  public getInstanceTest():void {
    const builder:any = BeanBuilder.getInstance();
    expect(builder).to.be.an.instanceOf(BeanBuilder);
  }
  
  @Test({
    description: "should return a singleton reference",
    order: 2
  })
  public singletonTest():void {
    const builder1:any = BeanBuilder.getInstance();
    const builder2:any = BeanBuilder.getInstance();
    expect(builder1).to.equal(builder2);
  }

  @Test({
    description: "should create an object of the type of 'SokokeBean'",
    order: 3
  })
  public buildTest():void {
    expect(
      BeanBuilder.getInstance().build()
    ).to.be.an.instanceOf(SokokeBean);
  }
  
  @Test({
    description: "should create an object of the type of 'SokokeBean'",
    order: 4
  })
  public buildNewInstanceTest():void {
    this.bean = BeanBuilder.getInstance().build();
    expect(this.bean).to.not.equal(BeanBuilder.getInstance().build());
  }
  
  @Test({
    description: "'getScope() should return 'null' as default value",
    order: 5
  })
  public getScopeDefaultTest():void {
    expect(this.bean.getScope()).to.be.null;
  }
  
  @Test({
    description: "'getName() should return 'null' as default value",
    order: 6
  })
  public getNameDefaultTest():void {
    expect(this.bean.getName()).to.be.null;
  }
  
  @Test({
    description: "'getBeanClass() should return 'null' as default value",
    order: 7
  })
  public getBeanClassDefaultTest():void {
    expect(this.bean.getBeanClass()).to.be.null;
  }
  
  @Test({
    description: "'getTypes() should return 'null' as default value",
    order: 8
  })
  public getTypesDefaultTest():void {
    expect(this.bean.getTypes()).to.be.null;
  }
  
  @Test({
    description: "'getQualifiedClassName() should return 'null' as default value",
    order: 9
  })
  public getQualifiedClassNameDefaultTest():void {
    expect(this.bean.getQualifiedClassName()).to.be.null;
  }
  
  @Test({
    description: "should create an object of the type of 'SokokeBean'",
    order: 10
  })
  public buildInitializedInstanceTest():void {
    this.bean = BeanBuilder.getInstance().scope(utils.SCOPE)
                                         .name(utils.NAME)
                                         .beanClass(utils.BeanClass)
                                         .types(utils.TYPES)
                                         .className(utils.CLASS_NAME)
                                         .build();
    expect(this.bean).to.not.equal(BeanBuilder.getInstance().build());
  }

  @Test({
    description: "should return the same 'name' as used to build the bean",
    order: 11
  })
  public getNameTest():void {
    expect(this.bean.getName()).to.equal(utils.NAME);
  }
  
  @Test({
    description: "should return the same 'Scope' as used to build the bean",
    order: 12
  })
  public getScopeTest():void {
    expect(this.bean.getScope()).to.equal(utils.SCOPE);
  }
  
  @Test({
    description: "should return the same class as used to build the bean",
    order: 13
  })
  public getBeanClassTest():void {
    expect(this.bean.getBeanClass()).to.equal(utils.BeanClass);
  }
  
  @Test({
    description: "should return the same types as used to build the bean",
    order: 14
  })
  public getTypesTest():void {
    expect(this.bean.getTypes()).to.equal(utils.TYPES);
  }
  
  @Test({
    description: "should return the same class name as used to build the bean",
    order: 15
  })
  public getQualifiedClassNameTest():void {
    expect(this.bean.getQualifiedClassName()).to.equal(utils.CLASS_NAME);
  }
  
  @Test({
    description: "should reset the builder to its initial, empty state.",
    order: 16
  })
  public clearTest():void {
    expect(
      BeanBuilder.getInstance().clear()
    ).to.equal(BeanBuilder.getInstance());
    this.bean = BeanBuilder.getInstance().build();
  }

  @Test({
    description: "'getName() should return 'null' after a clear() method invocation",
    order: 17
  })
  public getNameClearTest():void {
    expect(this.bean.getName()).to.be.null;
  }
  
  @Test({
    description: "'getScope() should return 'null' after a clear() method invocation",
    order: 18
  })
  public getScopeClearTest():void {
    expect(this.bean.getScope()).to.be.null;
  }
  
  @Test({
    description: "'getBeanClass() should return 'null' after a clear() method invocation",
    order: 19
  })
  public getBeanClassClearTest():void {
    expect(this.bean.getBeanClass()).to.be.null;
  }
  
  @Test({
    description: "'getTypes() should return 'null' after a clear() method invocation",
    order: 20
  })
  public getTypesClearTest():void {
    expect(this.bean.getTypes()).to.be.null;
  }
  
  @Test({
    description: "'getQualifiedClassName() should return 'null' after a clear() method invocation",
    order: 21
  })
  publicgetQualifiedClassNameClearTest():void {
    expect(this.bean.getQualifiedClassName()).to.be.null;
  }
}