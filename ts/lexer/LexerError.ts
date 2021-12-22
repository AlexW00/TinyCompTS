export class LexerError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "LexerError";
    this.message = message;
  }
}

export class InvalidCharacterError extends LexerError {
  constructor(input: string, pos: number, line: number, char: number) {
    const message =
      "Invalid character: '" +
      input.substr(pos, 20) +
      "...' at line: " +
      line +
      ", char: '" +
      char +
      "'";
    super(message);
    this.name = "InvalidCharacterError";
    this.message = message;
  }
}
