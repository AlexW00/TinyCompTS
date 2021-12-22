import Attribute from "../../ts/semanticAnalyzer/Attribute";
import SemanticContext from "../../ts/semanticAnalyzer/SemanticContext";

// ##################################################################### //
// ########################## SemanticRuleset ########################## //
// ##################################################################### //

// An example of a semantic ruleset:
export default {
  PRINT_FUNCTION: {
    _: (
      printFunctionName: SemanticContext,
      parameterStart: SemanticContext,
      parameter: SemanticContext,
      parameterEnd: SemanticContext
      // all syntax symbols go here as defined in the syntax ruleset:
      // e.g. PRINT_FUNCTION: {_: ["printFunctionName", "parameterStart", "parameter", "parameterEnd"]}
      // these are all terminal symbols (= Tokens), but they can also be non-terminals
    ) => {
      const semanticContext = new SemanticContext(); // create a new semantic context (= array of attributes)

      // add any attributes you like to the semantic context, "val" attribute is required
      semanticContext.addAttribute(
        new Attribute(
          "val", // the name of the attribute
          [parameter.getAttribute("lex")], // = deps = the attributes this attribute depends on
          (...args) => {
            // the semantic function of the attribute, returns the value of the attribute
            // ...args = deps (e.g. args[0] = the first attribute of the deps array)
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
