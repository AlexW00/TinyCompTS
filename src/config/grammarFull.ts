/*
?: zero-or-one
+: one-or-more
*: zero-or-more

uppercase: rule
lowercase: token
*/

export default [
  {
    type: "GRAPH",
    rules: [["RELATIONSHIP?"]],
  },
  {
    type: "RELATIONSHIP",
    rules: [["NODE", "LINK", "NODE"]],
  },
  {
    type: "NODE",
    rules: [["nodeBrackets"], ["nodeQuotes"]],
  },
  {
    type: "LINK",
    rules: [
      [
        "linkDirectionLeft?",
        "linkBody",
        "LINK_DATA?",
        "linkBody",
        "linkDirectionRight",
      ],
    ],
  },
  {
    type: "LINK_DATA",
    rules: [
      ["linkDataStart", "mathOperator", "mathNumber?", "linkDataEnd"],
      [
        "linkDataStart",
        "mathOperator",
        "mathNumber?",
        "linkDataSeperator",
        "mathNumber",
        "linkDataEnd",
      ],
    ],
  },
];

/* 
```flowGraph
[[Hi there]] -(-;11)-> "not your dope"
[[Hi there]] <-( / 2 ; 1 )-> "not your rope"
[[Hi there]] -(/1)-> "not your sope"
*/
