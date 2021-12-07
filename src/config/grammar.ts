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
    definitions: [["RELATIONSHIP"]],
  },
  {
    name: "RELATIONSHIP",
    definitions: [["NODE", "LINK", "NODE"]],
  },
  {
    name: "NODE",
    definitions: [["nodeBrackets"], ["nodeQuotes"]],
  },
  {
    name: "LINK",
    definitions: [["linkBody", "LINK_DATA", "linkBody", "linkDirectionRight"]],
  },
  {
    name: "LINK_DATA",
    definitions: [
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
