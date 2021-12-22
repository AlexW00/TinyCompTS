# TinyCompTS

A tiny Javascript/Typescript compiler written in vanilla Typescript as a hobby project.

## Usage

### Configure an attribute grammar

1. Define a lexical rules object as shown in ./config/attributeGrammar/lexicalRuleset.ts
    - Create a new Lexer object with the ruleset
2. Definea a syntax rules object as shown in ./config/attributeGrammar/syntaxRuleset.ts
    - Create a new Parser object with the ruleset
3. Define a semantic rules object as shown in ./config/attributeGrammar/semanticRuleset.ts
    - Create a new CodeGenerator object with the ruleset
4. Create a new Compiler object
5. Use compiler.compile("input string") to compile the input

### Run

Install the JS/TS runtime [Deno](https://deno.land/)

Execute
```deno run ./main.ts```

