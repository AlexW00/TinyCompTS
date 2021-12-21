export default class Attribute {
  name: string; // the name of the attribute
  deps: Attribute[] = []; // the attributes that this attribute depends on
  semFun: (...args: Attribute[]) => any; // the semantic function of the attribute

  constructor(
    name: string,
    deps: Attribute[],
    semFun: (...args: Attribute[]) => any
  ) {
    this.name = name;
    this.semFun = semFun;
    this.deps = deps;
  }

  // executes the semantic function of the attribute
  value(): any {
    return this.semFun(...this.deps);
  }
}
