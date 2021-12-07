export default class Token {
  static numOfTokens = 0;
  
  type: string;
  value: any;
  line: number;
  char: number;
  id: number;

  constructor(type: string, value: any, line: number, char: number) {
    this.type = type;
    this.value = value;
    this.line = line;
    this.char = char;
    this.id = Token.numOfTokens++;
  }
}
