/*!
 * JEC Sokoke Node Module
 * Copyright(c) 2017 Pascal ECHEMANN
 * Apache 2.0 Licensed
 * This is a part of the JEC Projects: <https://github.com/pechemann/JEC>
 */

declare module "jec-sokoke" {

import { Injectable, Inject, InjectableParams, InjectParams, Scope,
         BeanManager, Bean, InjectionPoint, JdiContainer, JDI } from "jec-jdi";
import { FileProperties, FilePreProcessor, Decorator, AbstractLoggerProxy,
         AbstractDecoratorConnector, LoggerProxy, JcadContext, Member,
         Parameter } from "jec-commons";
import { LocaleManager } from "jec-commons-node";

export class BeanBuilder {    constructor();    private static _locked;    private static INSTANCE;    static getInstance(): BeanBuilder;    private _scope;    private _name;    private _beanClass;    private _types;    scope(scope: Scope): BeanBuilder;    name(name: string): BeanBuilder;    beanClass(beanClass: any): BeanBuilder;    types(types: Set<any>): BeanBuilder;    clear(): BeanBuilder;    build(): Bean;}export class InjectionPointBuilder {    constructor();    private static _locked;    private static INSTANCE;    static getInstance(): InjectionPointBuilder;    private _bean;    private _type;    private _element;    bean(bean: Bean): InjectionPointBuilder;    type(type: any): InjectionPointBuilder;    element(element: Member | Parameter): InjectionPointBuilder;    clear(): InjectionPointBuilder;    build(): InjectionPoint;}export class BeanFactory {    constructor();    private _evaluator;    private initObj();    create(file: FileProperties): Bean;}export class InjectionPointsFactory {    constructor();    private _evaluator;    private initObj();    create(file: FileProperties, bean: Bean): void;}export class SokokeAutowireProcessor implements FilePreProcessor {    constructor();    private static readonly JDI_MASK;    private static readonly INJECTABLE_MASK;    private static readonly INJECT_MASK;    private _beanFactory;    private _injectPointFactory;    private initObj();    processStart(watcher: any, sourcePath: string): void;    process(file: FileProperties, watcher: any): void;    processComplete(watcher: any, sourcePath: string): void;}export class SokokeError extends Error {    constructor(message: string);}export class SokokeLocaleManager {    constructor();    private static _locked;    private static INSTANCE;    static getInstance(): LocaleManager;}export class Sokoke implements JDI {    constructor();    private static _locked;    private static INSTANCE;    static getInstance(): JDI;    private _container;    private initObj();    getContainer(): JdiContainer;    getBeanManager(): BeanManager;}export class SokokeBean implements Bean {    constructor(name: string, scope: Scope, beanClass: any, types: Set<any>);    private _name;    private _scope;    private _beanClass;    private _types;    private initObj(name, scope, beanClass, types);    getScope(): Scope;    getName(): string;    getBeanClass(): any;    getTypes(): Set<any>;    toString(): string;}export class SokokeBeanManager implements BeanManager {    constructor();    private initObj();    addBean(bean: Bean): void;    getBeans(injectionPoint: InjectionPoint): Set<Bean>;}export class SokokeContainer implements JdiContainer {    constructor();    private initObj();    getId(): string;    getBeanManager(key: string): BeanManager;    setBeanManager(beanManager: BeanManager, key: string): void;}export class SokokeInjectionPoint implements InjectionPoint {    constructor(bean: Bean, type: any, element: Member | Parameter);    private _bean;    private _type;    private _element;    private initObj(bean, type, element);    getBean(): Bean;    getType(): any;    getElement(): Member | Parameter;}export class JdiConnector extends AbstractDecoratorConnector {    constructor(jcadReference: string, decorator: Decorator);}export class InjectableDecorator implements Decorator {    constructor();    decorate(target: any, params: InjectableParams): any;}export class InjectParameterDecorator implements Decorator {    constructor();    decorate(target: any, propertyKey: string | symbol, parameterIndex: number, params: InjectParams): any;}export class InjectPropertyDecorator implements Decorator {    constructor();    decorate(target: any, key: string, params: InjectParams): any;}export class JdiContextManager {    constructor();    private _jcadContext;    private initContext(jcadReference, decoratorClass);    private removeContext(jcadReference);    createContext(jcadContext: JcadContext): void;    deleteContext(): void;}export class SokokeLoggerProxy extends AbstractLoggerProxy implements LoggerProxy {    constructor();    private static INSTANCE;    private static _locked;    static getInstance(): LoggerProxy;}export class InjectableParamsEvaluator {    constructor();    private getBeanClass(file);    private buildTypes(beanClass, beanType);    private extractParams(rawParams, file);    private resolveInjectableParams(file);    evaluate(file: FileProperties): Bean;}export class InjectionSanitizer {    constructor();    private static INSTANCE;    private static _locked;    static getInstance(): InjectionSanitizer;    private sanitizesString(value);    sanitizeName(params: InjectableParams | InjectParams, value: string): void;    sanitizeType(params: InjectableParams | InjectParams, value: string, file: FileProperties): void;    sanitizeScope(params: InjectableParams, value: string): void;}export enum InjectionString {    COMA = ",",    DOT = ".",    SCOPETYPE_APPLICATION = "ScopeType.APPLICATION",    SCOPETYPE_SESSION = "ScopeType.SESSION",    SCOPETYPE_REQUEST = "ScopeType.REQUEST",    SCOPETYPE_DEPENDENT = "ScopeType.DEPENDENT",    NULL = "null",    NAME = "name",    TYPE = "type",    SCOPE = "scope",    RETENTION = "retention",    QUALIFIER = "qualifier",}export class InjectParamsEvaluator {    constructor();    private extractParams(rawParams, file);    private resolveInjectParams(file, rawDecorator);    private resolveInjections(file, bean);    private extractDecorators(file);    evaluate(file: FileProperties, bean: Bean): void;}export enum InjectParamsString {    DECORATE = "__decorate([",    DECORATE_CLOSING = ");",    PROTOTYPE = ".prototype, \"",    INJECT = ".Inject(",}export class JdiRegExp {    static readonly INJECTABLE_MATCHER: RegExp;    static readonly INJECT_MATCHER: RegExp;    static readonly PARAMS_MATCHER: RegExp;    static getTypeMatcher(impRef: string): RegExp;}export class ScopeStrategy {    constructor();    private static _locked;    private static INSTANCE;    static getInstance(): ScopeStrategy;    resolve(scope: string): Scope;}}