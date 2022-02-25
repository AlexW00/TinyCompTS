// deno-lint-ignore-file
import Attribute from "../../ts/codeGenerator/Attribute.ts";
import SemanticContext from "../../ts/codeGenerator/SemanticContext.ts";
import { MissingSemanticContextError } from "../codeGenerator/SemanticError.ts";

// ##################################################################### //
// ########################## SemanticRuleset ########################## //
// ##################################################################### //

// IMPORT THIS INTERFACE FROM the file /ts/TinyComp.ts
export default interface SemanticRuleset {
  [syntaxRuleName: string]: {
    [syntaxRuleType: string]: (...args: SemanticContext[]) => SemanticContext;
  };
}

// ====================================================== //
// ======================= Example ====================== //
// ====================================================== //

const exampleSemanticRuleset: SemanticRuleset = {
  PRINT_FUNCTION: {
    _: (...semanticContexts) =>
      // all syntax symbols go here as defined in the syntax ruleset:
      // e.g. PRINT_FUNCTION: {_: ["printFunctionName", "parameterStart", "parameter", "parameterEnd"]}
      // these are all terminal symbols (= Tokens), but they can also be non-terminals
      {
        const semanticContext = new SemanticContext("PRINT_FUNCTION"); // create a new semantic context (= array of attributes)

        // retrieve the semantic contexts here
        // use _getFirstSemanticContextBySyntaxRuleName or _getSemanticContextsBySyntaxRuleName
        // to retrieve the first or all semantic contexts of a syntax rule
        // this is necessary because of the Quantifiers, which can be used in the grammar to
        // specify how many times a certain symbol can occur in a syntax rule,
        // thus creating the possibility to have multiple semantic contexts
        // e.g. TODO: Add example
        const parameter = _getFirstSemanticContextBySyntaxRuleName(
          "parameter",
          semanticContexts
        );

        // add any attributes you like to the semantic context, "val" attribute is required
        semanticContext.addAttribute(
          new Attribute(
            "val", // the name of the attribute
            [parameter.getAttribute("lex")], // = deps = the attributes this attribute depends on
            (...args) => {
              // the semantic function of the attribute, returns the value of the attribute
              // ...args = deps (e.g. args[0] = the first attribute of the deps array that we provided in the previous parameter of the Attribute constructor)
              // your custom attribute goes here, in this case it's a function that prints the value of the parameter
              return () => console.log(args[0].value());
            }
          )
        );

        //... more attributes go here

        return semanticContext; // return the semantic context
      },

    // more semantic rules go here
  },
};

// ====================================================== //
// ================== Helper functions ================== //
// ====================================================== //

// returns the first semantic context of the syntax rule "syntaxRuleName"
export const _getFirstSemanticContextBySyntaxRuleName = (
  syntaxRuleName: string,
  semanticContexts: SemanticContext[]
): SemanticContext => {
  const result = semanticContexts.find(
    (semanticContext) => semanticContext.syntaxRuleName === syntaxRuleName
  );
  if (!result) throw new MissingSemanticContextError(syntaxRuleName);
  else return result;
};

// returns all semantic contexts of the syntax rule "syntaxRuleName" as an array
export const _getSemanticContextsBySyntaxRuleName = (
  syntaxRuleName: string,
  semanticContexts: SemanticContext[]
): SemanticContext[] => {
  const results = semanticContexts.filter(
    (semanticContext) => semanticContext.syntaxRuleName === syntaxRuleName
  );
  if (results.length === 0)
    throw new MissingSemanticContextError(syntaxRuleName);
  else return results;
};

export { exampleSemanticRuleset };
