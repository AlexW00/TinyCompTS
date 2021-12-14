# Compiler structure

## Front end

### Syntactic analysis

#### 1. Lexing

- use LexicalGrammar to define tokens
- Convert input string into sequence of tokens

#### 2. Parsing (= tagging tokens)

- Convert input token sequence to a parse tree
- Context-free grammar

## Semantic analysis (= synthesizing js from tagged tokens)

- Convert input parse tree into a symbol table by adding semantic information
- S-attribute grammar (with support for global variables)
