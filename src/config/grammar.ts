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
    productionRules: { _: ["RELATIONSHIP"] },
  },
  {
    name: "RELATIONSHIP",
    productionRules: { _: ["NODE", "LINK", "NODE"] },
  },
  {
    name: "NODE",
    productionRules: { brackets: ["nodeBrackets"], quotes: ["nodeQuotes"] },
  },
  {
    name: "LINK",
    productionRules: {
      right: ["linkBody", "LINK_DATA", "linkBody", "linkDirectionRight"],
    },
  },
  {
    name: "LINK_DATA",
    productionRules: {
      op: ["linkDataStart", "mathOperator", "linkDataEnd"],
      op_num: ["linkDataStart", "mathOperator", "mathNumber", "linkDataEnd"],
      op_num_spd: [
        "linkDataStart",
        "mathOperator",
        "mathNumber",
        "linkDataSeperator",
        "mathNumber",
        "linkDataEnd",
      ],
    },
  },
];

/* 
```flowGraph
[[Hi there]] -(-;11)-> "not your dope"
[[Hi there]] <-( / 2 ; 1 )-> "not your rope"
[[Hi there]] -(/1)-> "not your sope"
*/
