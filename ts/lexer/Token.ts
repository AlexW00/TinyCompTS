import { Symbol } from "../parser/Symbol.ts";
import Attribute from "../semanticAnalyzer/Attribute.ts";
import SemanticContext from "../semanticAnalyzer/SemanticContext.ts";

// ====================================================== //
// ======================== Token ======================= //
// ====================================================== //

// A token is a terminal symbol that's used to represent a class of lexemes.
export default class Token implements Symbol {
  static numOfTokens = 0;

  // Attributed symbol interface attributes
  name: string;
  isTerminal = true;

  // Token specific attributes
  line: number;
  char: number;
  id: number;
  lex: any; // the token's lexeme (= the actual string that was matched)

  constructor(type: string, lex: any, line: number, char: number) {
    this.name = type;
    this.lex = lex;
    this.line = line;
    this.char = char;
    this.id = Token.numOfTokens++;
  }
}

// The standard semantic function for a token (do not touch)
// use .getAttribute("lex"/"val") to get either the name or lex attribute of a token
export const tokenSemanticFunction = (token: Token): SemanticContext => {
  const TOKEN = new SemanticContext();
  TOKEN.addAttribute(new Attribute("val", [], () => token.name));
  TOKEN.addAttribute(new Attribute("lex", [], () => token.lex));
  return TOKEN;
};
