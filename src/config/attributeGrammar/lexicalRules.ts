export default [
  {
    type: "whitespace",
    regex: /([^\S\r\n])/,
  },
  {
    type: "newline",
    regex: /(\r\n|\n|\r)/,
  },
  {
    type: "nodeBrackets",
    regex: /\[\[.+?\]\]/,
  },
  {
    type: "nodeQuotes",
    regex: /\".+?\"/,
  },
  {
    type: "linkBody",
    regex: /-/,
  },
  {
    type: "linkDirectionLeft",
    regex: /</,
  },
  {
    type: "linkDirectionRight",
    regex: />/,
  },
  {
    type: "linkDataStart",
    regex: /\(/,
  },
  {
    type: "linkDataEnd",
    regex: /\)/,
  },
  {
    type: "linkDataSeperator",
    regex: /;/,
  },
  {
    type: "mathOperator",
    regex: /[\+\-\*\/]/,
  },
  {
    type: "mathNumber",
    regex: /\d+/,
  },
];

/* 
```flowGraph
[[Hi there]] -(+100)-> "not your dope"
[[Hi there]] <-( / 2 ; 1 )-> "not your rope"
[[Hi there]] -(/1)-> "not your sope"
*/
