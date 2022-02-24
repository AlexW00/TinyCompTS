// deno-lint-ignore-file
import Attribute from "../../ts/codeGenerator/Attribute.ts";
import SemanticContext from "../../ts/codeGenerator/SemanticContext.ts";

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
    _: (...args) =>
      // all syntax symbols go here as defined in the syntax ruleset:
      // e.g. PRINT_FUNCTION: {_: ["printFunctionName", "parameterStart", "parameter", "parameterEnd"]}
      // these are all terminal symbols (= Tokens), but they can also be non-terminals
      {
        const semanticContext = new SemanticContext(); // create a new semantic context (= array of attributes)

        const parameter =
          args.find((arg) => arg.getAttribute("lex").value() !== "$") ??
          new SemanticContext();
        // add any attributes you like to the semantic context, "val" attribute is required
        semanticContext.addAttribute(
          new Attribute(
            "val", // the name of the attribute
            [parameter.getAttribute("lex")], // = deps = the attributes this attribute depends on
            (...args) => {
              // the semantic function of the attribute, returns the value of the attribute
              // ...args = deps (e.g. args[0] = the first attribute of the deps array)
              args.forEach((arg) => console.log("arg val: " + arg.value()));
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

export { exampleSemanticRuleset };
