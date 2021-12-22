// deno-lint-ignore-file no-unused-vars
import Attribute from "../../ts/semanticAnalyzer/Attribute.ts";
import SemanticContext from "../../ts/semanticAnalyzer/SemanticContext.ts";

// ##################################################################### //
// ########################## SemanticRuleset ########################## //
// ##################################################################### //

// Define your semantic rules here.
//
// Sytnax of one semantic rule:
//
// SYNTAX_RULE_NAME: {
//   SYNTAX_RULE_TYPE: (
//     syntaxRuleSymbolContext1: SemanticContext,
//     syntaxRuleSymbolContext2: SemanticContext
//     ...
//   ) => {
//     // create a new SemanticContext
//     const semanticContext = new SemanticContext ();
//
//     // add any attributes to the semantic context, val attribute is required
//     semanticContext.addAttribute(
//       new Attribute("type", [dependencyAttributes], semanticFunction = (...dependencyAttributes) => {return aValue})
//     );

//     return semanticContext;
//   },
// },
//
// For an example take a look at ../exampleAttributeGrammar/semanticRuleset.ts

export default {
  // your semantic rules go here
};
