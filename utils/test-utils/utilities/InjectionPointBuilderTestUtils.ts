
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

import { Bean, Scope } from "jec-jdi";
import { Parameter } from "jec-commons";

/*!
 * This module constains utilities used by the InjectionPointBuilderTest test
 * suite.
 */

// Utilities:
export class BeanType {}
export const BEAN:Bean = ({
  getScope: function():Scope { return null; },
  getName: function():string { return null; }
} as Bean);
export const PARAMETER:Parameter = new Parameter("foo");
export const CLASS_NAME:string = "foo.bar.BeanClass";
export const BEAN_REF:string = "foobar";
export const QUALIFIERS:Array<string> = ["DEV", "TEST", "PROD"];
