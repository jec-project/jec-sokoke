/*!
 * JEC Sokoke Node Module
 * Copyright(c) 2017 Pascal ECHEMANN
 * Apache 2.0 Licensed
 * This is a part of the JEC Projects: <https://github.com/pechemann/JEC>
 */

declare module "jec-sandcat" {

import { Injectable, Inject } from "jec-jdi";
import { DomainContainer, DomainConnector } from "jec-glasscat-core";
import { FileProperties, FilePreProcessor, Decorator, AbstractLoggerProxy,
         AbstractDecoratorConnector, LoggerProxy } from "jec-commons";

export class SokokeBuilder implements DelegatedContainerBuilder {    constructor();    build(container: DomainContainer): DelegatedContainer;}export class DefaultSokokeContainer implements Sokoke {    constructor();    private _domainContainer;    private initObj();    getDomainContainer(): DomainContainer;    setDomainContainer(container: DomainContainer): void;    process(callback: (err: SokokeError) => void): void;}export class SokokeError extends Error {    constructor(message: string);}export interface Sokoke extends DelegatedContainer {    setDomainContainer(container: DomainContainer): void;    process(callback: (err: SokokeError) => void): void;}}