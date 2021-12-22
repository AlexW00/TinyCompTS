# TinyCompTS

A tiny Javascript/Typescript compiler written in vanilla Typescript as a hobby project.

## Usage

### Configure an attribute grammar

- Create an object that implements AttributeGrammar: ( → see ./ts/attributeGrammar/attributeGrammar.ts):
    1. Define a lexical ruleset by creating an object that implements LexicalRuleset ( → see ./ts/attributeGrammar/lexicalRuleset.ts)
    2. Define a syntax ruleset by creating an object that implements SyntaxRuleset ( → see ./ts/attributeGrammar/syntaxRuleset.ts)
    3. Define a semantic ruleset by creating an object that implements SemanticRuleset ( → see ./ts/attributeGrammar/semanticRuleset.ts)

### TinyComp

1. Create an object that implements TinyCompOptions
2. Create an instance of TinyComp using the AttributeGrammar and TinyCompOptions object
3. Use compiler.compile(input: string) to compile input

### Import

#### Denoland

```import TinyComp, {AttributeGrammar, LexicalRuleset, SemanticRuleset, SyntaxRuleset, TinyCompOptions} from "https://deno.land/x/tiny_comp_ts@v1.0.0";```

### Just test

1. Install the JS/TS runtime [Deno](https://deno.land/)
2. Clone this repo & open it
3. ```deno run ./main.ts```

