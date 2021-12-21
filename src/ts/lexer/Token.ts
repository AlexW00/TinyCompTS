import { Symbol } from "../parser/Symbol";

// ====================================================== //
// ======================== Token ======================= //
// ====================================================== //

// A token is a terminal symbol that's used to represent a class of lexemes.
export default class Token implements Symbol {
  static numOfTokens = 0;

  // Attributed symbol interface attributes
  name: string;
  isTerminal: boolean = true;

  // Token specific attributes
  line: number;
  char: number;
  id: number;
  lex: any; // get the token's lexeme (= the actual string that was matched)

  constructor(type: string, lex: any, line: number, char: number) {
    this.name = type;
    this.lex = lex;
    this.line = line;
    this.char = char;
    this.id = Token.numOfTokens++;
  }
}
