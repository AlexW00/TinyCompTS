// ##################################################################### //
// ########################### LexicalRuleset ########################## //
// ##################################################################### //

// an example lexical ruleset

export default [
  {
    name: "whitespace", // the name of the token
    regex: /([^\S\r\n])/, // the regex that matches the token
  },
  {
    name: "printFunctionName",
    regex: /print/,
  },
  {
    name: "parameterStart",
    regex: /\(/,
  },
  {
    name: "parameterEnd",
    regex: /\)/,
  },
  {
    name: "parameter",
    regex: /[\w\d]+/,
  },

  // ... more rules go here
];
