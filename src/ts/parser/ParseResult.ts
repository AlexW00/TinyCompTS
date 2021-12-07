import Token from "../lexer/Token";

export default class ParseResult {
    name: string;
    results: (Token|ParseResult)[] 

    constructor(name: string, definition: (Token|ParseResult)[] = []) {
        this.name = name;
        this.results = definition;
    }
    
    getValue(): Token[] {
        const value = [];
        for (const item of this.results) {
            if (item instanceof Token) {
                value.push(item);
            } else {
                value.push(...item.getValue());
            }
        }
        return value;
    }
}