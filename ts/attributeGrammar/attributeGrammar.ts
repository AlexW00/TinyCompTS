// ##################################################################### //
// ########################## AttributeGrammar ######################### //
// ##################################################################### //

import LexicalRuleset from "./lexicalRuleset.ts";
import SemanticRuleset from "./semanticRuleset.ts";
import SyntaxRuleset from "./syntaxRuleset.ts";

// Interface that describes the components of an Attribute grammar
export default interface AttributeGrammar {
  lexicalRuleset: LexicalRuleset; // example in ./lexicalRuleset.ts
  syntaxRuleset: SyntaxRuleset; // example in ./syntaxRuleset.ts
  semanticRuleset: SemanticRuleset; // example in ./semanticRuleset.ts
}
