/*!
 * JEC Sokoke Node Module
 * Copyright(c) 2017-2018 Pascal ECHEMANN
 * Apache 2.0 Licensed
 * This is a part of the JEC projects: <http://jecproject.org>
 */

declare module "jec-sokoke" {

import { Injectable, Inject, InjectableParams, InjectParams, Scope,
         BeanManager, Bean, InjectionPoint, JdiContainer, JDI, DecoratedType,
         InjectionTarget, ScopeType } from "jec-jdi";
import { FileProperties, FilePreProcessor, Decorator, AbstractLoggerProxy,
         AbstractDecoratorConnector, LoggerProxy, JcadContext, Member,
         Parameter, Locale, Interface } from "jec-commons";
import { LocaleManager } from "jec-commons-node";

export class BeanBuilder {
    constructor();
    private static _locked;
    private static INSTANCE;
    static getInstance(): BeanBuilder;
    private _scope;
    private _name;
    private _beanClass;
    private _types;
    private _className;
    scope(scope: Scope): BeanBuilder;
    name(name: string): BeanBuilder;
    beanClass(beanClass: any): BeanBuilder;
    types(types: Set<any>): BeanBuilder;
    className(className: string): BeanBuilder;
    clear(): BeanBuilder;
    build(): Bean;
}
export class BeanManagerBuilder {
    constructor();
    private static _locked;
    private static INSTANCE;
    static getInstance(): BeanManagerBuilder;
    build(context: SokokeContext): BeanManager;
}
export class InjectionPointBuilder {
    constructor();
    private static _locked;
    private static INSTANCE;
    static getInstance(): InjectionPointBuilder;
    private _type;
    private _element;
    private _className;
    private _beanRef;
    private _qualifiers;
    type(type: any): InjectionPointBuilder;
    element(element: Member | Parameter): InjectionPointBuilder;
    className(className: string): InjectionPointBuilder;
    ref(beanRef: string): InjectionPointBuilder;
    qualifiers(qualifiers: Array<string>): InjectionPointBuilder;
    clear(): InjectionPointBuilder;
    build(): InjectionPoint;
}
export class InjectionTargetBuilder {
    constructor();
    private static _locked;
    private static INSTANCE;
    static getInstance(): InjectionTargetBuilder;
    build(target: any, key: string | Symbol, decoratedType: DecoratedType, parameterIndex?: number): InjectionTarget;
}
export class JdiContainerFactory {
    constructor();
    create(): JdiContainer;
}
export class SokokeContextBuilder {
    constructor();
    private static _locked;
    private static INSTANCE;
    static getInstance(): SokokeContextBuilder;
    build(domainPath: string, locale: Locale): SokokeContext;
}
export class BeanFactory {
    constructor();
    private _evaluator;
    private initObj();
    create(file: FileProperties): Bean;
}
export class BeanMethodInvoker {
    constructor();
    private initObj();
    initInstance(target: any): void;
}
export class BeanStore {
    constructor();
    private _beanInstancesMap;
    private initObj();
    registerBean(bean: Bean): void;
    getBeanInstance(bean: Bean): any;
}
export class InjectionPointManager {
    constructor();
    private _injectionPoints;
    private _injectionPointMap;
    private initObj();
    addInjectionPoint(injectionPoint: InjectionPoint): void;
    getInjectionPoint(ref: number): InjectionPoint;
    getInjectionPoints(): Array<InjectionPoint>;
}
export class InjectionPointsFactory {
    constructor();
    private _evaluator;
    private initObj();
    create(file: FileProperties, bean: Bean): Array<InjectionPoint>;
}
export class SokokeAutowireProcessor implements FilePreProcessor {
    constructor();
    private static readonly JDI_MASK;
    private static readonly INJECTABLE_MASK;
    private static readonly INJECT_MASK;
    private _beanFactory;
    private _injectPointFactory;
    private initObj();
    processStart(watcher: any, sourcePath: string): void;
    process(file: FileProperties, watcher: any): void;
    processComplete(watcher: any, sourcePath: string): void;
}
export interface SokokeContext {
    getDomainPath(): string;
    getLocale(): Locale;
}
export class SokokeContextImpl {
    constructor(domainPath: string, locale: Locale);
    private _domainPath;
    private _locale;
    private initObj(domainPath, locale);
    getDomainPath(): string;
    getLocale(): Locale;
    toString(): string;
}
export class SokokeError extends Error {
    constructor(message: string);
}
export class SokokeLocaleManager {
    constructor();
    private static _locked;
    private static INSTANCE;
    static getInstance(): LocaleManager;
}
export class Sokoke implements JDI {
    constructor();
    private static _locked;
    private static INSTANCE;
    static getInstance(): JDI;
    private _container;
    private _localeCongig;
    private _currContext;
    private _contextList;
    private initObj();
    private getBeanList(injectionPoint);
    private resolveBean(beanList, injectionPoint);
    getContainer(): JdiContainer;
    getBeanManager(): BeanManager;
    addContext(context: SokokeContext): void;
    setCurrentContext(context: SokokeContext): void;
    getCurrentContext(): SokokeContext;
    getContextByPath(path: string): SokokeContext;
    resolveInjectionPoint(classPath: string, member: string): InjectionPoint;
    getBean(injectionPoint: InjectionPoint): Bean;
    getInjectableReference(bean: Bean): any;
    isDebugMode(): boolean;
}
export class SokokeBean implements Bean {
    constructor(name: string, scope: Scope, beanClass: any, types: Set<any>, className: string);
    private _name;
    private _scope;
    private _beanClass;
    private _types;
    private _className;
    private _injectionPoints;
    private _hash;
    private initObj(name, scope, beanClass, types, className);
    getScope(): Scope;
    getName(): string;
    getBeanClass(): any;
    getTypes(): Set<any>;
    getQualifiedClassName(): string;
    getInjectionPoints(): Array<InjectionPoint>;
    addInjectionPoint(injectionPoint: InjectionPoint): void;
    getHash(): number;
    toString(): string;
}
export class SokokeBeanManager implements BeanManager {
    constructor(context: SokokeContext);
    private _context;
    private _beanList;
    private _applicationManagedBeanList;
    private _injectionPointManager;
    private _beanStore;
    private initObj(context);
    addBean(bean: Bean): void;
    getBeans(): Set<Bean>;
    getBeansByName(name: string): Set<Bean>;
    getBeansByType(type: any): Set<Bean>;
    getBeansByInjectionPoint(injectionPoint: InjectionPoint): Set<Bean>;
    addInjectionPoint(injectionPoint: InjectionPoint): void;
    getReference(bean: Bean): any;
    getContext(): SokokeContext;
    getInjectionPoint(ref: number): InjectionPoint;
    getInjectionPoints(): Array<InjectionPoint>;
}
export class SokokeContainer implements JdiContainer {
    constructor();
    private _id;
    private _beanManagerMap;
    private _currentDomainPath;
    private initObj();
    getId(): string;
    getBeanManager(): BeanManager;
    setBeanManager(beanManager: BeanManager): void;
    contextChange(context: SokokeContext): void;
}
export class SokokeInjectionPoint implements InjectionPoint {
    constructor(type: any, element: Member | Parameter, className: string, beanRef: string, qualifiers: Array<string>);
    private _bean;
    private _type;
    private _element;
    private _className;
    private _beanRef;
    private _qualifiers;
    private initObj(type, element, className, beanRef, qualifiers);
    getBean(): Bean;
    getType(): any;
    getElement(): Member | Parameter;
    getQualifiedClassName(): string;
    getRef(): string;
    getQualifiers(): Array<string>;
    toString(): string;
    setBean(bean: Bean): void;
}
export class SokokeInjectionPointResolver {
    constructor();
    private static INSTANCE;
    private static _locked;
    static getInstance(): SokokeInjectionPointResolver;
    private resovelInjectionPoint(key);
    private injectFieldMetadata(target, key);
    private injectParamMetadata(target, key, index);
    resolve(context: InjectionTarget): void;
}
export interface SokokeInjectionTarget extends InjectionTarget {
    getId(): string;
}
export class SokokeInjector {
    constructor();
    private static INSTANCE;
    private static _locked;
    static getInstance(): SokokeInjector;
    static readonly DEFAULT_SCOPE_TYPES: ScopeType[];
    inject(target: any, scopeTypes: ScopeType[]): void;
    dispose(target: any, scopeTypes: ScopeType[]): void;
}
export class JdiConnector extends AbstractDecoratorConnector {
    constructor(jcadReference: string, decorator: Decorator);
}
export class InjectableDecorator implements Decorator {
    constructor();
    decorate(target: any, params: InjectableParams): any;
}
export class InjectFieldDecorator implements Decorator {
    constructor();
    decorate(target: any, key: string, context: string | Interface | InjectParams): any;
}
export class InjectParameterDecorator implements Decorator {
    constructor();
    decorate(target: any, propertyKey: string | symbol, parameterIndex: number, context: string | Interface | InjectParams): any;
}
export class JdiContextManager {
    constructor();
    private _jcadContext;
    private initContext(jcadReference, decoratorClass);
    private removeContext(jcadReference);
    createContext(jcadContext: JcadContext): void;
    deleteContext(): void;
}
export class SokokeLoggerProxy extends AbstractLoggerProxy implements LoggerProxy {
    constructor();
    private static INSTANCE;
    private static _locked;
    static getInstance(): LoggerProxy;
}
export class SokokeMetadataExtractor {
    constructor();
    private static _locked;
    private static INSTANCE;
    static getInstance(): SokokeMetadataExtractor;
    extractContext(bean: any): any;
}
export class SokokeMetadataInjector {
    constructor();
    private static _locked;
    private static INSTANCE;
    static getInstance(): SokokeMetadataInjector;
    injectContext(bean: any, context: SokokeContext): void;
    injectInjectionPoint(target: any, injectionPoint: InjectionPoint): void;
}
export class SokokeMetadataRefs {
    static readonly SOKOKE_CONTEXT_METADATA: string;
    static readonly SOKOKE_INJECTION_POINT_METADATA: string;
}
export class HashCodeBuilder {
    constructor();
    private static _locked;
    private static INSTANCE;
    static getInstance(): HashCodeBuilder;
    build(...values: string[]): number;
}
export class InjectableParamsEvaluator {
    constructor();
    private getBeanClass(filePath);
    private buildTypes(beanClass, beanType);
    private extractParams(rawParams, file);
    private resolveInjectableParams(file);
    evaluate(file: FileProperties): Bean;
}
export class InjectionSanitizer {
    constructor();
    private static INSTANCE;
    private static _locked;
    static getInstance(): InjectionSanitizer;
    private sanitizesString(value);
    sanitizeName(params: InjectableParams | InjectParams, value: string): void;
    sanitizeType(params: InjectableParams | InjectParams, value: string, file: FileProperties): void;
    sanitizeScope(params: InjectableParams, value: string): void;
}
export enum InjectionString {
    COMA = ",",
    DOT = ".",
    SCOPETYPE_APPLICATION = "ScopeType.APPLICATION",
    SCOPETYPE_SESSION = "ScopeType.SESSION",
    SCOPETYPE_REQUEST = "ScopeType.REQUEST",
    SCOPETYPE_DEPENDENT = "ScopeType.DEPENDENT",
    NULL = "null",
    NAME = "name",
    TYPE = "type",
    SCOPE = "scope",
    RETENTION = "retention",
    QUALIFIER = "qualifier",
}
export class InjectParamsEvaluator {
    constructor();
    private extractField(decorator, beanClass);
    private extractParams(rawParams, file);
    private resolveInjectParams(file, rawDecorator);
    private resolveInjections(file, bean);
    private extractDecorators(file);
    evaluate(file: FileProperties, bean: Bean): Array<InjectionPoint>;
}
export enum InjectParamsString {
    DECORATE = "__decorate([",
    DECORATE_CLOSING = ");",
    PROTOTYPE = ".prototype, \"",
    INJECT = ".Inject(",
    CLOSING_QUOTE = "\",",
}
export class JdiRegExp {
    static readonly INJECTABLE_MATCHER: RegExp;
    static readonly INJECT_MATCHER: RegExp;
    static readonly PARAMS_MATCHER: RegExp;
    static getTypeMatcher(impRef: string): RegExp;
}
export class ScopeStrategy {
    constructor();
    private static _locked;
    private static INSTANCE;
    static getInstance(): ScopeStrategy;
    resolve(scope: ScopeType): Scope;
}
export class SingletonErrorFactory {
    constructor();
    throw(contextClass: any): void;
}
export class BeanInjectionValidator {
    constructor();
    private static INSTANCE;
    private static _locked;
    static getInstance(): BeanInjectionValidator;
    validate(bean: Bean, injectionPoints: Array<InjectionPoint>): void;
}
}