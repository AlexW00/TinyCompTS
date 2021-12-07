import Token from "../lexer/Token";
export class ParserError extends Error {
    constructor(message: string) {
      super(message);
      this.name = "ParserError";
      this.message = message;
    }
  }
  
  export class ParseEndError extends ParserError {
    constructor() {
      const message ="Unexpected end of input";
      super(message);
      this.name = "ParseEndError";
      this.message = message;
    }
  }