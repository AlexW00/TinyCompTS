// ##################################################################### //
// ########################### LexicalRuleset ########################## //
// ##################################################################### //

export default interface LexicalRuleset {
  [name: string]: {
    regex: RegExp;
  };
}

// ====================================================== //
// ======================= Example ====================== //
// ====================================================== //

const exampleLexicalRuleset: LexicalRuleset = {
  // the name of the token
  whitespace: {
    regex: /([^\S\r\n])/, // the regex that matches the token
  },
  printFunctionName: {
    regex: /print/,
  },
  parameterStart: {
    regex: /\(/,
  },
  parameterEnd: {
    regex: /\)/,
  },
  parameter: {
    regex: /[\w\d ]+/,
  },
  // ... more lexical rules go here
};

export { exampleLexicalRuleset };
