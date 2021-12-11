export interface Symbol {
  name: string;
  isTerminal: boolean;
}

export interface AttributedSymbol extends Symbol {
  value: any;
}
