# TinyCompTS

A tiny Javascript/Typescript compiler written in vanilla Typescript as a hobby project.

## 📖 Guide

### Define an attribute grammar

Create an object that implements [AttributeGrammar](/ts/attributeGrammar/attributeGrammar.ts):

1. Define a lexical ruleset by creating an object that implements [LexicalRuleset](/ts/attributeGrammar/lexicalRuleset.ts)
2. Define a syntax ruleset by creating an object that implements [SyntaxRuleset](/ts/attributeGrammar/syntaxRuleset.ts)
3. Define a semantic ruleset by creating an object that implements [SemanticRuleset](/ts/attributeGrammar/semanticRuleset.ts)

### Configure TinyComp

1. Create an object that implements [TinyCompOptions](/ts/TinyComp.ts)
2. Create an instance of [TinyComp](/ts/TinyComp.ts) using the AttributeGrammar and TinyCompOptions object
3. Use `compiler.compile(input: string)` to compile input

## 📔 Example 

→ see [example.ts](/example.ts)

## Import

### 🦖 Denoland

```
import TinyComp, {AttributeGrammar, LexicalRuleset, SemanticRuleset, SyntaxRuleset, TinyCompOptions} 
    from "https://deno.land/x/tiny_comp_ts@v1.0.0";
```

### ❤️ Npm

Coming soon?

### 🧪 Just test

1. Install the JS/TS runtime [Deno](https://deno.land/)
2. Clone this repo & navigate into the root directory
3. ```deno run ./example.ts```# TinyCompTS

A tiny Javascript/Typescript compiler written in vanilla Typescript as a hobby project.

## 📖 Guide

### Define an attribute grammar

Create an object that implements [AttributeGrammar](/ts/attributeGrammar/attributeGrammar.ts):

1. Define a lexical ruleset by creating an object that implements [LexicalRuleset](/ts/attributeGrammar/lexicalRuleset.ts)
2. Define a syntax ruleset by creating an object that implements [SyntaxRuleset](/ts/attributeGrammar/syntaxRuleset.ts)
3. Define a semantic ruleset by creating an object that implements [SemanticRuleset](/ts/attributeGrammar/semanticRuleset.ts)

### Configure TinyComp

1. Create an object that implements [TinyCompOptions](/ts/TinyComp.ts)
2. Create an instance of [TinyComp](/ts/TinyComp.ts) using the AttributeGrammar and TinyCompOptions object
3. Use `compiler.compile(input: string)` to compile input

## 📔 Example 

→ see [example.ts](/ts/example.ts)

## Import

### 🦖 Denoland

```
import TinyComp, {AttributeGrammar, LexicalRuleset, SemanticRuleset, SyntaxRuleset, TinyCompOptions} 
    from "https://deno.land/x/tiny_comp_ts@v1.0.0";
```

### ❤️ Npm

Coming soon?

### 🧪 Just test

1. Install the JS/TS runtime [Deno](https://deno.land/)
2. Clone this repo & navigate into the root directory
3. ```deno run ./example.ts```
