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
import { JdiContextManager } from "../../../../../src/com/onsoft/sokoke/jcad/JdiContextManager";
import { JcadContextError, JcadContextFactory, JcadContext } from "jec-commons";

@TestSuite({
  description: "Test the JdiContextManager class methods"
})
export class JdiJcadContextManagerTest {
  
  @Test({
    description: "should throw a JcadContextError excpetion when nor context have been created before"
  })
  public deleteContextErrorTest():void {
    let manager:JdiContextManager = new JdiContextManager();
    let doDeleteContext:Function = function():void {
      manager.deleteContext();
    };
    expect(doDeleteContext).to.throw(JcadContextError);
  }
  
  @Test({
    description: "should create and remove JCAD contexts without error"
  })
  public createContextTest():void {
    let manager:JdiContextManager = new JdiContextManager();
    let context:JcadContext = new JcadContextFactory().create();
    expect(manager.createContext(context)).to.be.OK;
    expect(manager.deleteContext()).to.be.OK;
  }
}