import SemanticRuleset from "../attributeGrammar/semanticRuleset.ts";
import SyntaxParseTree from "../parser/SyntaxParseTree.ts";
import AttributedParseTree from "./AttributedParseTree.ts";

// ##################################################################### //
// ########################### CodeGenerator ########################### //
// ##################################################################### //

export default class CodeGenerator {
  semanticRuleset: SemanticRuleset;
  constructor(semanticRuleset: SemanticRuleset) {
    this.semanticRuleset = semanticRuleset; // the attribute grammar (defined in .../semanticTypes.ts)
  }

  // converts a syntax parse tree to an attributed parse tree and returns it's semantic value
  generate(parseResult: SyntaxParseTree) {
    const APT = new AttributedParseTree(parseResult, this.semanticRuleset);
    return APT.value();
  }
}
