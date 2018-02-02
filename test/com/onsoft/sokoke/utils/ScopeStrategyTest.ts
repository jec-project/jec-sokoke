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
import { ScopeStrategy } from "../../../../../src/com/onsoft/sokoke/utils/ScopeStrategy";
import { Scope, ApplicationScoped, SessionScoped, RequestScoped, ScopeType } from "jec-jdi";
import { SingletonError } from "jec-commons";

@TestSuite({
  description: "Test the ScopeStrategy class methods"
})
export class ScopeStrategyTest {

  @Test({
    description: "should throw a singleton error when calling the constructor function"
  })
  public singletonErrorTest():void {
    let buildInstance:Function = function():void {
      new ScopeStrategy();
    };
    expect(buildInstance).to.throw(SingletonError);
  }
  
  @Test({
    description: "should return a ScopeStrategy instance"
  })
  public getInstanceTest():void {
    expect(ScopeStrategy.getInstance()).to.be.an.instanceOf(ScopeStrategy);
  }
  
  @Test({
    description: "should return a singleton reference"
  })
  public singletonTest():void {
    let strategy1:any = ScopeStrategy.getInstance();
    let strategy2:any = ScopeStrategy.getInstance();
    expect(strategy1).to.equal(strategy2);
  }
  
  @Test({
    description: "should return 'null'"
  })
  public nullTest():void {
    expect(ScopeStrategy.getInstance().resolve(null)).to.be.null;
  }
  
  @Test({
    description: "should return 'null'"
  })
  public undefinedTest():void {
    expect(ScopeStrategy.getInstance().resolve(undefined)).to.be.null;
  }
  
  @Test({
    description: "should return 'null'"
  })
  public dependentTest():void {
    expect(ScopeStrategy.getInstance().resolve(ScopeType.DEPENDENT)).to.be.null;
  }
  
  @Test({
    description: "should return an instance od 'ApplicationScoped'"
  })
  public applicationTest():void {
    expect(
      ScopeStrategy.getInstance().resolve(ScopeType.APPLICATION)
    ).to.be.an.instanceOf(ApplicationScoped);
  }
  
  @Test({
    description: "should return an instance od 'SessionScoped'"
  })
  public sessionTest():void {
    expect(
      ScopeStrategy.getInstance().resolve(ScopeType.SESSION)
    ).to.be.an.instanceOf(SessionScoped);
  }
  
  @Test({
    description: "should return an instance od 'RequestScoped'"
  })
  public requestTest():void {
    expect(
      ScopeStrategy.getInstance().resolve(ScopeType.REQUEST)
    ).to.be.an.instanceOf(RequestScoped);
  }
}