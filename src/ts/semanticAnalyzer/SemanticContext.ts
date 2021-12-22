import Attribute from "./Attribute";
import { DuplicateAttributeError } from "./SemanticError";

// ====================================================== //
// =================== SemanticContext ================== //
// ====================================================== //

export default class SemanticContext {
  attributes: Attribute[] = []; // the list of attributes this context consists of

  // adds an attribute to this context
  addAttribute(attribute: Attribute) {
    if (this.attributes.find((attr) => attr.name === attribute.name))
      throw new DuplicateAttributeError(attribute);
    this.attributes.push(attribute);
  }

  // returns the attribute matching the name
  getAttribute(name: string): Attribute {
    const attr = this.attributes.find((attribute) => attribute.name === name);
    if (!attr) throw new Error(`Attribute ${name} not found`);
    else return attr;
  }
}
