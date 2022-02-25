import Token from "../lexer/Token.ts";

export class ParserError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ParserError";
    this.message = message;
  }
}

export class ParseEndError extends ParserError {
  constructor() {
    const message = "Unexpected end of input";
    super(message);
    this.name = "ParseEndError";
    this.message = message;
  }
}

export class ParseRuleError extends ParserError {
  constructor() {
    const message = "No production rule matched";
    super(message);
    this.name = "ParseEndError";
    this.message = message;
  }
}

// error for tokens being left over
export class LeftOverTokenError extends ParserError {
  constructor(numOfTokens: number, tokens: Token[]) {
    const message = `${numOfTokens} token${
      numOfTokens ? "" : "s"
    } could not be parsed and ${
      numOfTokens ? "was" : "were"
    } left over: ${tokens
      .splice(tokens.length - numOfTokens, tokens.length)
      .map((token) => JSON.stringify(token))
      .join(", ")}`;
    super(message);
    this.name = "UnparsedTokenError";
    this.message = message;
  }
}
