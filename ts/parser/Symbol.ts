// ====================================================== //
// ======================= Symbol ======================= //
// ====================================================== //

export interface Symbol {
  name: string; // the name of the Symbol
  isTerminal: boolean; // whether the Symbol is a terminal or not
  quantifier: Quantifier; // the quantifier of the Symbol
}

export enum Quantifier {
  ONE_OR_ZERO,
  ONE,
  ONE_OR_MORE,
  ZERO_OR_MORE,
}

export function makeSymbol(string: string): Symbol {
  return {
    name: _getNameFromSymbolString(string),
    isTerminal: symbolIsTerminal(string),
    quantifier: getSymbolQuantifier(string),
  };
}

function _getNameFromSymbolString(symbolString: string): string {
  if (getSymbolQuantifier(symbolString) !== Quantifier.ONE)
    // return without last char
    return symbolString.slice(0, -1);
  return symbolString;
}

export function symbolIsTerminal(name: string): boolean {
  return name.charAt(0).toUpperCase() !== name.charAt(0);
}

export function getSymbolQuantifier(name: string): Quantifier {
  const lastChar = name.charAt(name.length - 1);
  if (lastChar === "?") return Quantifier.ONE_OR_ZERO;
  else if (lastChar === "*") return Quantifier.ZERO_OR_MORE;
  else if (lastChar === "+") return Quantifier.ONE_OR_MORE;
  return Quantifier.ONE;
}

export function symbolIsOptional(symbol: Symbol): boolean {
  return (
    symbol.quantifier === Quantifier.ONE_OR_ZERO ||
    symbol.quantifier === Quantifier.ZERO_OR_MORE
  );
}

export function symbolIsMore(symbol: Symbol): boolean {
  return (
    symbol.quantifier === Quantifier.ZERO_OR_MORE ||
    symbol.quantifier === Quantifier.ONE_OR_MORE
  );
}
