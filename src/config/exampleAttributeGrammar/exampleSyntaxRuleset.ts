// ##################################################################### //
// ########################### syntaxRuleset ########################### //
// ##################################################################### //

// An example of a syntax ruleset:
export default [
  {
    name: "PRINT_FUNCTION", // the name of this SyntaxRule (uppercase, because it is a non-terminal)
    productionRules: {
      // the definition of a syntax rule consists of one or more production rules
      // syntax: typeName: ["terminalSymbol1", "NON_TERMINAL_SYMBOL", ...]
      // a production rule consists of one or more syntax symbols (terminal or NON_TERMINAL)
      _: ["printFunctionName", "parameterStart", "parameter", "parameterEnd"],
      //... more production rules go here
    },
  },

  // more syntax rules go here
];
