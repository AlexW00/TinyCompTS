import attributeGrammar from "../../config/attributeGrammar";
import ParseResult from "../parser/ParseResult";
import SemanticParseResult from "./SemanticParseResult";

export default class CodeGenerator {
  attributeGrammar;
  constructor(attributeGrammar: any) {
    this.attributeGrammar = attributeGrammar;
  }

  generate(parseResult: ParseResult) {
    const semanticParseResult = new SemanticParseResult(
      parseResult,
      attributeGrammar
    );
    return semanticParseResult.value();
  }
}
