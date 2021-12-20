export default class Attribute {
  // the name of the attribute
  name: string;
  // the attributes that this attribute depends on
  deps: Attribute[] = [];
  // the semantic function of the attribute
  semFun: (...args: Attribute[]) => any;

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
