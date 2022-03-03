// ##################################################################### //
// ########################### LexicalRuleset ########################## //
// ##################################################################### //

// IMPORT THIS INTERFACE FROM the file /ts/TinyComp.ts
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
    regex: /([\s\r\n])/, // the regex that matches the token
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
    regex: /"[\w\d ]+"/,
  },
  parameterSeperator: {
    regex: /,/,
  },
  // ... more lexical rules go here
};

export { exampleLexicalRuleset };
