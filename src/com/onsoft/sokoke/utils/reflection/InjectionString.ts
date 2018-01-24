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

/**
 * The <code>InjectionString</code> Enum contains convenient strings for
 * evaluating injections in a bean file. 
 */
export enum InjectionString {

  /**
   * A reference to the coma (<code>,</code>) character.
   */
  COMA = ",",

  /**
   * A reference to the coma (<code>.</code>) character.
   */
  DOT = ".",

  /**
   * A reference to the <code>"ScopeType.APPLICATION"</code> string.
   */
  SCOPETYPE_APPLICATION = "ScopeType.APPLICATION",

  /**
   * A reference to the <code>"ScopeType.SESSION"</code> string.
   */
  SCOPETYPE_SESSION = "ScopeType.SESSION",
  
  /**
   * A reference to the <code>"ScopeType.REQUEST"</code> string.
   */
  SCOPETYPE_REQUEST = "ScopeType.REQUEST",

  /**
   * A reference to the <code>"ScopeType.DEPENDENT"</code> string.
   */
  SCOPETYPE_DEPENDENT = "ScopeType.DEPENDENT",
  
  /**
   * A reference to the <code>"null"</code> string.
   */
  NULL = "null",

  /**
   * A reference to the <code>"name"</code> string.
   */
  NAME = "name",
  
  /**
   * A reference to the <code>"type"</code> string.
   */
  TYPE = "type",
  
  /**
   * A reference to the <code>"scope"</code> string.
   */
  SCOPE = "scope",
  
  /**
   * A reference to the <code>"retention"</code> string.
   */
  RETENTION = "retention",
  
  /**
   * A reference to the <code>"qualifier"</code> string.
   */
  QUALIFIER = "qualifier"
}