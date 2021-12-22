import Compiler, { CompilerOptions } from "./ts/Compiler.ts";

import AttributeGrammar from "./ts/attributeGrammar/attributeGrammar.ts";
import { exampleLexicalRuleset } from "./ts/attributeGrammar/lexicalRuleset.ts";
import { exampleSyntaxRuleset } from "./ts/attributeGrammar/syntaxRuleset.ts";
import { exampleSemanticRuleset } from "./ts/attributeGrammar/semanticRuleset.ts";

// ====================================================== //
// ======================= Example ====================== //
// ====================================================== //

// create an attribute grammar object with the example rulesets
const attributeGrammar: AttributeGrammar = {
  lexicalRuleset: exampleLexicalRuleset,
  syntaxRuleset: exampleSyntaxRuleset,
  semanticRuleset: exampleSemanticRuleset,
};

// configure the compiler with the start symbol and the names of the tokens that should be ignored
const compilerOptions: CompilerOptions = {
  startSymbol: "PRINT_FUNCTION",
  ignoreTokensNamed: ["whitespace"],
};

// instantiate the compiler and compile the input
const compiler = new Compiler(attributeGrammar, compilerOptions);
const compileResult = compiler.compile(`print(Hello World)`);

// execute the compiled code (in this case it is a function that prints "Hello World"),
// but it could be any other JavaScript code like e.g. an object
compileResult();
