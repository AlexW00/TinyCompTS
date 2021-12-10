import ParseResult from "../parser/ParseResult";
import Token from "../lexer/Token";

export default class SemanticParseResult {
  semanticRule: (...args: any) => any;
  semanticParseResults: (Token | SemanticParseResult)[];

  constructor(parseResult: ParseResult, attributeGrammar: any) {
    this.semanticRule = this.findSemanticRule(attributeGrammar, parseResult);
    console.log("init " + parseResult.productionRule.ruleName);
    console.log(parseResult.productionRule.type);
    console.log(this.semanticRule);
    this.semanticParseResults = parseResult.results.map(
      (r: Token | ParseResult) => {
        if (r instanceof Token) {
          return r;
        } else {
          return new SemanticParseResult(r, attributeGrammar);
        }
      }
    );
  }

  findSemanticRule(
    attributeGrammar: any,
    parseResult: ParseResult
  ): (...args: any) => any {
    const f =
      attributeGrammar[parseResult.productionRule.ruleName][
        parseResult.productionRule.type
      ];
    if (f) return f;
    else
      throw new Error(
        "no semantic rule found for rule: " +
          parseResult.productionRule.ruleName +
          " type: " +
          parseResult.productionRule.type
      );
  }
  value() {
    console.log(this.semanticRule);
    return this.semanticRule(...this.semanticParseResults);
  }
}
