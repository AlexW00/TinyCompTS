import Token from "./Token.js";
import { InvalidCharacterError } from "./LexerError.js";

// ##################################################################### //
// ############################### Lexer ############################### //
// ##################################################################### //

export default class Lexer {

  lexerGrammar: any[];

  constructor(lexerGrammar: any[]) {
    this.lexerGrammar = lexerGrammar;
  }

  // transforms a string into an array of tokens
  tokenize = (input: string) => {
    let pos: number = 0,
      line: number = 1,
      char: number = 0;

    const tokens = [];

    while (pos < input.length) {
      const matchResult = this.#matchNextToken(input, pos, line, char),
        match = matchResult?.token;

      if (match) {
        // push token to tokens and update pos, line, char
        tokens.push(match);
        ({ pos, line, char } = matchResult);
      } else throw new InvalidCharacterError(input, pos, line, char);
    }
    return tokens;
  };

  // tries to return the next token in the input string
  #matchNextToken = (input: string, pos: number, line: number, char:number): any => {
    let match = {
      type: null,
      token: "",
    };

    // Check if we have a match for a token for each rule in the lexer grammar
    this.lexerGrammar.forEach((rule) => {
      const r = new RegExp("^" + rule.regex.source),
        token = r.exec(input.substr(pos));

      // set result as new match if it's longer
      if (token && token[0].length > match.token.length) {
        match = {
          type: rule.type,
          token: token[0],
        };
      }
    });

    // Increment pos, line, char depending on whether we found a newline or normal token
    if (match.type != null) {
      if (match.type === "newline") {
        line++;
        char = 0;
      } else char += match.token.length;

      pos += match.token.length;

      return {
        token: new Token(match.type, match.token, line, char),
        pos,
        line,
        char,
      };
    } else return null;
  };
}
