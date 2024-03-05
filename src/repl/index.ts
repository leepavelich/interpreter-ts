import { Lexer } from "../lexer/";
import { Token } from "../token/";
import readline from "readline";

const PROMPT = ">> ";

export function startREPL() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: PROMPT,
  });

  rl.prompt();

  rl.on("line", (input) => {
    const lexer = new Lexer(input);

    let token: Token;
    while ((token = lexer.getNextToken())) {
      if (token.type == "EOF") {
        break;
      }
      console.log(token);
    }

    rl.prompt();
  });

  rl.on("close", () => {
    console.log("Goodbye");
  });
}
