import Token from "../../ts/lexer/Token";
import Attribute from "./Attribute";
import SemanticContext from "./SemanticContext";

/*
?: zero-or-one
+: one-or-more
*: zero-or-more

uppercase: rule
lowercase: token
*/
export default {
  GRAPH: {
    _: (RELATIONSHIP: SemanticContext) => {
      const GRAPH = new SemanticContext();
      GRAPH.addAttribute(
        new Attribute(
          "val",
          [RELATIONSHIP.getAttribute("val")],
          (relationship) => {
            return {
              graph: relationship.value(),
            };
          }
        )
      );
      return GRAPH;
    },
  },
  RELATIONSHIP: {
    _: (
      NODE_1: SemanticContext,
      LINK: SemanticContext,
      NODE_2: SemanticContext
    ) => {
      const RELATIONSHIP = new SemanticContext();
      RELATIONSHIP.addAttribute(
        new Attribute(
          "val",
          [
            NODE_1.getAttribute("val"),
            LINK.getAttribute("val"),
            NODE_2.getAttribute("val"),
          ],
          (node1, link, node2) => {
            return {
              relationship: {
                node1: node1.value(),
                link: link.value(),
                node2: node2.value(),
              },
            };
          }
        )
      );

      return RELATIONSHIP;
    },
  },
  NODE: {
    quotes: (node: SemanticContext) => {
      const NODE = new SemanticContext();
      NODE.addAttribute(
        new Attribute("val", [], () => node.getAttribute("lex").value())
      );
      return NODE;
    },
    brackets: (node: SemanticContext) => {
      const NODE = new SemanticContext();
      console.log(node);
      console.log(Object.keys(node));
      NODE.addAttribute(
        new Attribute("val", [], () => node.getAttribute("lex").value())
      );
      return NODE;
    },
  },
  LINK: {
    right: (
      linkBody1: SemanticContext,
      LINK_DATA: SemanticContext,
      linkBody2: SemanticContext,
      linkDirectionRight: SemanticContext
    ) => {
      const LINK = new SemanticContext();

      LINK.addAttribute(
        new Attribute("val", [LINK_DATA.getAttribute("val")], (linkData) => {
          return {
            link: {
              type: linkData.value(),
              directions: [linkDirectionRight.getAttribute("val").value()],
            },
          };
        })
      );
      return LINK;
    },
  },
  LINK_DATA: {
    op: (
      linkDataStart: SemanticContext,
      mathOperator: SemanticContext,
      linkDataEnd: SemanticContext
    ) => {
      const LINK_DATA = new SemanticContext();
      LINK_DATA.addAttribute(
        new Attribute("val", [], () => {
          return {
            linkData: {
              type: mathOperator.getAttribute("lex").value(),
            },
          };
        })
      );
      return LINK_DATA;
    },
  },
  op_num: (
    linkDataStart: SemanticContext,
    mathOperator: SemanticContext,
    mathNumber: SemanticContext,
    linkDataEnd: SemanticContext
  ) => {
    const LINK_DATA = new SemanticContext();
    LINK_DATA.addAttribute(
      new Attribute("val", [], () => {
        return {
          linkData: {
            type: mathOperator.getAttribute("lex").value(),
            weight: mathNumber.getAttribute("lex").value(),
          },
        };
      })
    );
    return LINK_DATA;
  },
  op_num_spd: (
    linkDataStart: SemanticContext,
    mathOperator: SemanticContext,
    mathNumber1: SemanticContext,
    linkDataSeperator: SemanticContext,
    mathNumber2: SemanticContext,
    linkDataEnd: SemanticContext
  ) => {
    const LINK_DATA = new SemanticContext();
    LINK_DATA.addAttribute(
      new Attribute("val", [], () => {
        return {
          linkData: {
            type: mathOperator.getAttribute("lex").value(),
            weight: mathNumber1.getAttribute("lex").value(),
            speed: mathNumber2.getAttribute("lex").value(),
          },
        };
      })
    );
    return LINK_DATA;
  },

  TOKEN: {
    _: (token: Token): SemanticContext => {
      const TOKEN = new SemanticContext();
      TOKEN.addAttribute(new Attribute("val", [], () => token.name));
      TOKEN.addAttribute(new Attribute("lex", [], () => token.value));
      return TOKEN;
    },
  },
};

/* 
```flowGraph
[[Hi there]] -(-;11)-> "not your dope"
[[Hi there]] <-( / 2 ; 1 )-> "not your rope"
[[Hi there]] -(/1)-> "not your sope"
*/
