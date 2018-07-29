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
import { HashCodeBuilder } from "../../../../../src/com/onsoft/sokoke/utils/HashCodeBuilder";
import { SingletonError } from "jec-commons";

@TestSuite({
  description: "Test the HashCodeBuilder class methods"
})
export class HashCodeBuilderTest {

  @Test({
    description: "should throw a singleton error when calling the constructor function"
  })
  public singletonErrorTest():void {
    const buildInstance:Function = function():void {
      new HashCodeBuilder();
    };
    expect(buildInstance).to.throw(SingletonError);
  }
  
  @Test({
    description: "should return a HashCodeBuilder instance"
  })
  public getInstanceTest():void {
    expect(HashCodeBuilder.getInstance()).to.be.an.instanceOf(HashCodeBuilder);
  }
  
  @Test({
    description: "should return a singleton reference"
  })
  public singletonTest():void {
    const builder1:any = HashCodeBuilder.getInstance();
    const builder2:any = HashCodeBuilder.getInstance();
    expect(builder1).to.equal(builder2);
  }
  
  @Test({
    description: "should return a number"
  })
  public numberTest():void {
    expect(HashCodeBuilder.getInstance().build("test")).to.be.a("number");
  }
  
  @Test({
    description: "should return different hash codes for different values"
  })
  public hashTest():void {
    const VAL1:string = "foo";
    const VAL2:string = "bar";
    expect(
      HashCodeBuilder.getInstance().build(VAL1, VAL2)
    ).to.not.equal(HashCodeBuilder.getInstance().build(VAL2, VAL1));
  }
  
  @Test({
    description: "should return the same hash code for identical values"
  })
  public idempotentTest():void {
    const VAL1:string = "foo";
    const VAL2:string = "bar";
    expect(
      HashCodeBuilder.getInstance().build(VAL1, VAL2)
    ).to.equal(HashCodeBuilder.getInstance().build(VAL1, VAL2));
  }
}