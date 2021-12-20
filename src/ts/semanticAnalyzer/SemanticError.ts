import ProductionRule from "../parser/ProductionRule";
import Attribute from "./Attribute";
export class SemanticError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "SemanticError";
    this.message = message;
  }
}

export class MissingSemanticRuleError extends SemanticError {
  constructor(productionRule: ProductionRule) {
    const message =
      "No semantic rule found for " +
      productionRule.ruleName +
      " type: " +
      productionRule.type;
    super(message);
    this.name = "MissingSemanticRuleError";
    this.message = message;
  }
}

export class DuplicateAttributeError extends SemanticError {
  constructor(attribute: Attribute) {
    const message =
      "Attribute already defined for " + JSON.stringify(attribute);
    super(message);
    this.name = "DuplicateAttributeError";
    this.message = message;
  }
}
