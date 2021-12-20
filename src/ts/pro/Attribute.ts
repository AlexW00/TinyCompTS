export default class Attribute {
  name: string;
  deps: Attribute[] = [];
  semFun: (...args: Attribute[]) => any;
  isAvailable: boolean = false;

  constructor(
    name: string,
    deps: Attribute[],
    semFun: (...args: Attribute[]) => any
  ) {
    this.name = name;
    this.semFun = semFun;
    this.deps = deps;
  }

  value(): any {
    return this.semFun(...this.deps);
  }
}
