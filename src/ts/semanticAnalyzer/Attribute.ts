// ====================================================== //
// ====================== Attribute ===================== //
// ====================================================== //

export default class Attribute {
  name: string; // the name of this attribute
  deps: Attribute[] = []; // the attributes that this attribute depends on
  semFun: (...args: Attribute[]) => any; // the semantic function of this attribute

  constructor(
    name: string,
    deps: Attribute[],
    semFun: (...args: Attribute[]) => any
  ) {
    this.name = name;
    this.semFun = semFun;
    this.deps = deps;
  }

  // executes the semantic function of this attribute and returns its value
  value(): any {
    return this.semFun(...this.deps);
  }
}
