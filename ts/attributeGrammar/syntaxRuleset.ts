// ##################################################################### //
// ########################### syntaxRuleset ########################### //
// ##################################################################### //

// IMPORT THIS INTERFACE FROM the file /ts/TinyComp.ts
export default interface SyntaxRuleset {
  [syntaxRuleName: string]: {
    [syntaxRuleType: string]: string[];
  };
}

// ====================================================== //
// ======================= Example ====================== //
// ====================================================== //

const exampleSyntaxRuleset: SyntaxRuleset = {
  PRINT_FUNCTION: {
    // the definition of a syntax rule consists of one or more production rules
    // syntax: typeName: ["terminalSymbol1", "NON_TERMINAL_SYMBOL", ...]
    // a production rule consists of one or more syntax symbols (terminal or NON_TERMINAL)
    // use quantifiers at the END of a production rule to specify how many times a certain symbol can occur in a syntax rule
    // supported quantifiers:
    // - "?" = zero or one
    // - "*" = zero or more
    // - "+" = one or more

    _: [
      "printFunctionName",
      "parameterStart",
      "parameter",
      "EXTRA_PARAMETER?", // optional parameter, indicated by the ? quantifier.
      "parameterEnd",
    ],

    //... more production rules go here
  },

  EXTRA_PARAMETER: {
    _: ["parameterSeperator", "parameter"],
  },

  // more syntax rules go here
};
export { exampleSyntaxRuleset };
