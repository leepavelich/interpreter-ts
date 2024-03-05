import { Lexer } from "../lexer/lexer";
import { Token } from "../token/token";
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
      console.log(token);
      if (token.type == "EOF") {
        break;
      }
    }

    rl.prompt();
  });

  rl.on("close", () => {
    console.log("Goodbye");
  });
}
