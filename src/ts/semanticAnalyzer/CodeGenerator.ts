import attributeGrammar from "../../config/attributeGrammar/semanticRules";
import SyntaxParseTree from "../parser/SyntaxParseTree";
import AAST from "./AAST";

export default class CodeGenerator {
  attributeGrammar;
  constructor(attributeGrammar: any) {
    this.attributeGrammar = attributeGrammar;
  }

  generate(parseResult: SyntaxParseTree) {
    const semanticParseResult = new AAST(parseResult, attributeGrammar);
    console.log(semanticParseResult);
    console.log(semanticParseResult.getLeaves());
    semanticParseResult.childNodes.forEach((node) => {
      console.log("node type");
      console.log(typeof node === typeof SyntaxParseTree);
    });
    return semanticParseResult.value;
  }
}
