import { Symbol } from "./Symbol";

// ====================================================== //
// =================== ProductionRule =================== //
// ====================================================== //

// A production rule defines which syntaxSymbol sequence is a valid parse for a SyntaxRule.
export default class ProductionRule {
  ruleName: string; // the name of the SyntaxRule that this production rule belongs to
  type: string; // the type of the SyntaxRule that this production rule belongs to
  syntaxSymbols: Symbol[]; // the syntax symbols that this production rule consists of

  constructor(ruleName: string, type: string, syntaxSymbols: Symbol[]) {
    this.ruleName = ruleName;
    this.type = type;
    this.syntaxSymbols = syntaxSymbols;
  }
}
