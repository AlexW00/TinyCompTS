import Attribute from "./Attribute";

export default class SemanticContext {
  attributes: Attribute[] = [];

  addAttribute(attribute: Attribute) {
    this.attributes.push(attribute);
  }

  getAttribute(name: string): Attribute {
    const attr = this.attributes.find((attribute) => attribute.name === name);
    if (!attr) throw new Error(`Attribute ${name} not found`);
    else return attr;
  }

  getAttributes(names: string[]): Attribute[] {
    return this.attributes.filter((attribute) =>
      names.includes(attribute.name)
    );
  }
}
