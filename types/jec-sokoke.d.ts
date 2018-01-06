/*!
 * JEC Sokoke Node Module
 * Copyright(c) 2017 Pascal ECHEMANN
 * Apache 2.0 Licensed
 * This is a part of the JEC Projects: <https://github.com/pechemann/JEC>
 */

declare module "jec-sokoke" {

import { Injectable, Inject, InjectableParams, InjectParams,
         BeanManager } from "jec-jdi";
import { FileProperties, FilePreProcessor, Decorator, AbstractLoggerProxy,
         AbstractDecoratorConnector, LoggerProxy, JcadContext,
       } from "jec-commons";
import { LocaleManager } from "jec-commons-node";

export class SokokeAutowireProcessor implements FilePreProcessor {    constructor();    private static readonly JDI_MASK;    private static readonly INJECTABLE_MASK;    private initObj();    private resolveInjectionPoints();    processStart(watcher: any, sourcePath: string): void;    process(file: FileProperties, watcher: any): void;    processComplete(watcher: any, sourcePath: string): void;}export class SokokeBeanManager implements BeanManager {    constructor();}export class SokokeError extends Error {    constructor(message: string);}export class SokokeLocaleManager {    constructor();    private static _locked;    private static INSTANCE;    static getInstance(): LocaleManager;}export class JdiConnector extends AbstractDecoratorConnector {    constructor(jcadReference: string, decorator: Decorator);}export class InjectableDecorator implements Decorator {    constructor();    decorate(target: any, params: InjectableParams): any;}export class InjectParameterDecorator implements Decorator {    constructor();    decorate(target: any, propertyKey: string | symbol, parameterIndex: number, params: InjectParams): any;}export class InjectPropertyDecorator implements Decorator {    constructor();    decorate(target: any, key: string, params: InjectParams): any;}export class JdiContextManager {    constructor();    private _jcadContext;    private initContext(jcadReference, decoratorClass);    private removeContext(jcadReference);    createContext(jcadContext: JcadContext): void;    deleteContext(): void;}export class SokokeLoggerProxy extends AbstractLoggerProxy implements LoggerProxy {    constructor();    private static INSTANCE;    private static _locked;    static getInstance(): LoggerProxy;}}