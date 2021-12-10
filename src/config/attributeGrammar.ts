/*
?: zero-or-one
+: one-or-more
*: zero-or-more

uppercase: rule
lowercase: token
*/

export default [
  {
    name: "GRAPH",
    productionRules: [["RELATIONSHIP"]],
  },
  {
    name: "RELATIONSHIP",
    productionRules: [["NODE", "LINK", "NODE"]],
  },
  {
    name: "NODE",
    productionRules: [["nodeBrackets"], ["nodeQuotes"]],
  },
  {
    name: "LINK",
    productionRules: [
      ["linkBody", "LINK_DATA", "linkBody", "linkDirectionRight"],
    ],
  },
  {
    name: "LINK_DATA",
    productionRules: [
      ["linkDataStart", "mathOperator", "mathNumber", "linkDataEnd"],
      ["linkDataStart", "mathOperator", "linkDataEnd"],
      [
        "linkDataStart",
        "mathOperator",
        "mathNumber",
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
