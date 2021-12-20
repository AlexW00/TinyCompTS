import attributeGrammar from "../../config/attributeGrammar/semanticRules";
import attributeGrammar2 from "../pro/semanticRules";
import SyntaxParseTree from "../parser/SyntaxParseTree";
import AttributedSyntaxParseTree from "../pro/AttributedSyntaxParseTree";
import AAST from "./AAST";

export default class CodeGenerator {
  attributeGrammar;
  constructor(attributeGrammar: any) {
    this.attributeGrammar = attributeGrammar;
  }

  generate(parseResult: SyntaxParseTree) {
    console.log(parseResult);
    const semanticParseResult = new AttributedSyntaxParseTree(
      parseResult,
      attributeGrammar2
    );
    console.log(semanticParseResult);

    semanticParseResult.childNodes.forEach((node) => {
      console.log("node type");
      console.log(typeof node === typeof SyntaxParseTree);
    });
    return semanticParseResult.value;
  }
}
