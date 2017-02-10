import { Deceiver } from '../JasmineDeceiver';


function expectToBeSpy (actual: any): void {
    expect(actual.and).toEqual(jasmine.any((jasmine as any).SpyStrategy));
    expect(actual.calls).toEqual(jasmine.any((jasmine as any).CallTracker));
}

describe('Jasmine Deceiver', () => {
    it('should create pretender using jasmine.createSpyObj method', () => {
        class TestClass {
            method1 () {}
            method2 () {}
        }

        const jasmineDeceiver = Deceiver(TestClass);

        expectToBeSpy(jasmineDeceiver.method1);
        expectToBeSpy(jasmineDeceiver.method2);
    });

    it('should allow to spy method calls', () => {
        class TestClass {
            method1 () {}
        }

        const jasmineDeceiver = Deceiver(TestClass);
        jasmineDeceiver.method1.and.callThrough();
        jasmineDeceiver.method1();

        expect(jasmineDeceiver.method1).toHaveBeenCalled();
    });

    it('should keep types of passed class', () => {
        class Foo {
            getFoo (): string {return 'bar';}
        }

        function consumeFoo (f: Foo): void {
            expect(f.getFoo()).toEqual('foo');
        }

        const fooDeceiver = Deceiver(Foo);
        fooDeceiver.getFoo.and.returnValue('foo');

        consumeFoo(fooDeceiver);
        expect(fooDeceiver.getFoo).toHaveBeenCalled();
    });
});
