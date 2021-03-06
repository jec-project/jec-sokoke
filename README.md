# JEC Sokoke Project

[![JEC version](https://img.shields.io/badge/JEC-1.0-%23ba00ff.svg)](http://jecproject.org)
[![GlassCat version](https://img.shields.io/badge/GlassCat-1.0-%230a50ff.svg)](http://jecproject.org)
[![npm version](https://badge.fury.io/js/jec-sokoke.svg)](https://www.npmjs.com/package/jec-sokoke)
[![Apache 2.0](https://img.shields.io/hexpm/l/plug.svg)](https://www.apache.org/licenses/LICENSE-2.0)

Sokoke is the standard implementation of the [JavaScript Dependency Injection *(JDI)*][jec-jdi-url]
specification for GlassCat JEC applications.

[![][jec-logo]][jec-url]

## Requirements

Sokoke needs the following system parameters in order to work correctly:

- Node 6+
- npm 3+
- TypeScript 2+

## Installation

Set up the Sokoke module with:

```bash
$ npm install jec-sokoke --save
```

## Running Tests

To execute all unit tests, use:

```bash
$ npm test
```

## API Reference

The API Reference documentation is not included into the Sokoke node module. To build the API reference documentation, use:

```bash
$ grunt doc
```

Documentation will be generated in the `docs/api-reference` repository.
The online version of the  API reference documentation will be available soon at the JEC Website.

The documentation generator is [TypeDoc](http://typedoc.org/)

## Update Release Notes

**Current stable release:** [0.0.4](CHANGELOG.md#jec-sokoke-0.0.4)
 
For a complete listing of release notes for all Sokoke update releases, see the [CHANGELOG](CHANGELOG.md) file. 

## License
This Sokoke Project is licensed under Apache 2.0. Full license text is available in [LICENSE](LICENSE).

```
Copyright 2016-2018 Pascal ECHEMANN.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```

[jec-url]: http://jecproject.org
[jec-jdi-url]: https://github.com/jec-project/jec-jdi
[jec-logo]: https://raw.githubusercontent.com/jec-project/JEC/master/assets/jec-logos/jec-logo.png