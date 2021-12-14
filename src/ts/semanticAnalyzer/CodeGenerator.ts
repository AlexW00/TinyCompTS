import attributeGrammar from "../../config/attributeGrammar/semanticRules";
import AST from "../parser/AST";
import AAST from "./AAST";

export default class CodeGenerator {
  attributeGrammar;
  constructor(attributeGrammar: any) {
    this.attributeGrammar = attributeGrammar;
  }

  generate(parseResult: AST) {
    const semanticParseResult = new AAST(parseResult, attributeGrammar);
    console.log(semanticParseResult);
    console.log(semanticParseResult.getLeafNodes());
    semanticParseResult.childNodes.forEach((node) => {
      console.log("node type");
      console.log(typeof node === typeof AST);
    });
    return semanticParseResult.value;
  }
}
