// tslint:disable:no-any
import { Constructor, DeceiverFactory, DeceiverMirror } from 'deceiver-core';

export * from 'deceiver-core';

// Sadly those types need to be copied here as jasmine doesn't export them :(
export interface Spy {
    (...params: any[]): any;

    identity: string;
    and: SpyAnd;
    calls: Calls;
    mostRecentCall: { args: any[]; };
    argsForCall: any[];
}

export interface SpyAnd {
    callThrough(): Spy;
    returnValue(val: any): Spy;
    returnValues(...values: any[]): Spy;
    callFake(fn: Function): Spy;
    throwError(msg: string): Spy;
    stub(): Spy;
}

export interface Calls {
    any(): boolean;
    count(): number;
    argsFor(index: number): any[];
    allArgs(): any[];
    all(): CallInfo[];
    mostRecent(): CallInfo;
    first(): CallInfo;
    reset(): void;
}

export interface CallInfo {
    object: any;
    args: any[];
    returnValue: any;
}

export type Deceiving<T> = {
    [P in keyof T]: Spy & T[P];
};

export const deceiverFactory = new DeceiverFactory(<T>(mirror: DeceiverMirror<T>): T => {
    return jasmine.createSpyObj(mirror.getClassName(), mirror.getMethodNames());
});

export function Deceiver<T>(klass: Constructor<T>): Deceiving<T> { // tslint:disable-line:function-name
    return deceiverFactory.getDeceiver(klass) as Deceiving<T>;
}
