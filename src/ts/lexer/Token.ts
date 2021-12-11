import { AttributedSymbol } from "../parser/Symbol";
export default class Token implements AttributedSymbol {
  static numOfTokens = 0;

  // Attributed symbol interface attributes
  name: string;
  isTerminal: boolean = true;
  value: any;

  // Token attributes
  line: number;
  char: number;
  id: number;

  constructor(type: string, value: any, line: number, char: number) {
    this.name = type;
    this.value = value;
    this.line = line;
    this.char = char;
    this.id = Token.numOfTokens++;
  }
}
