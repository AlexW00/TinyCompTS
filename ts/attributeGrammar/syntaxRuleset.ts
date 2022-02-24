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

    _: ["printFunctionName", "parameterStart", "parameter", "parameterEnd"],

    //... more production rules go here
  },

  // more syntax rules go here
};
export { exampleSyntaxRuleset };
