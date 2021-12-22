# TinyCompTS

A tiny Javascript/Typescript compiler written in vanilla Typescript as a hobby project.

## Usage

### Configure your attribute grammar

1. Define your lexical rules in ./config/attributeGrammar/lexicalRuleset.ts
2. Define your syntax rules in ./config/attributeGrammar/syntaxRuleset.ts
3. Define your semantic rules in ./config/attributeGrammar/semanticRuleset.ts

### Configure ./main.ts 

1. Create a new Compiler object (import from "ts/compiler/Compiler.ts", requires Lexer.ts, Parser.ts, CodeGenerator.ts)
2. Use compiler.compile("input string) to compile

### Run

Install the JS/TS runtime [Deno](https://deno.land/)

Execute
```deno run ./main.ts```
