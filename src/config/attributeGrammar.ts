import Token from "../ts/lexer/Token";
import SemanticParseResult from "../ts/semanticAnalyzer/SemanticParseResult";

/*
?: zero-or-one
+: one-or-more
*: zero-or-more

uppercase: rule
lowercase: token
*/
export default {
  GRAPH: {
    _: (RELATIONSHIP: any) => {
      return {
        graph: RELATIONSHIP.value,
      };
    },
  },
  RELATIONSHIP: {
    _: (NODE_1: any, LINK: any, NODE_2: any) => {
      return {
        relationship: {
          node1: NODE_1.value,
          link: LINK.value,
          node2: NODE_2.value,
        },
      };
    },
  },
  NODE: {
    quotes: (node: Token) => {
      return { text: node.value };
    },
    brackets: (node: Token) => {
      return { text: node.value };
    },
  },
  LINK: {
    right: (
      linkBody1: Token,
      LINK_DATA: SemanticParseResult,
      linkBody2: Token,
      linkDirectionRight: Token
    ) => {
      return {
        link: {
          linkData: LINK_DATA.value,
          linkDirections: [linkDirectionRight.name],
        },
      };
    },
  },
  LINK_DATA: {
    op: (linkDataStart: Token, mathOperator: Token, linkDataEnd: Token) => {
      return {
        linkData: {
          mathOperator: mathOperator.value,
        },
      };
    },
  },
  op_num: (
    linkDataStart: Token,
    mathOperator: Token,
    mathNumber: Token,
    linkDataEnd: Token
  ) => {
    return {
      linkData: {
        mathOperator: mathOperator.value,
        mathNumber: mathOperator.value,
      },
    };
  },
  op_num_spd: (
    linkDataStart: Token,
    mathOperator: Token,
    mathNumber1: Token,
    linkDataSeperator: Token,
    mathNumber2: Token,
    linkDataEnd: Token
  ) => {
    return {
      linkData: {
        mathOperator: mathOperator.value,
        force: mathNumber1.value,
        speed: mathNumber2.value,
      },
    };
  },
};

/* 
```flowGraph
[[Hi there]] -(-;11)-> "not your dope"
[[Hi there]] <-( / 2 ; 1 )-> "not your rope"
[[Hi there]] -(/1)-> "not your sope"
*/
