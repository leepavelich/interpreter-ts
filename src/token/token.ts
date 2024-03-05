export const TokenType = {
  Illegal: "ILLEGAL",
  Eof: "EOF",
  Ident: "IDENT",
  Int: "INT",

  // Operators
  Assign: "=",
  Plus: "+",
  Minus: "-",
  Bang: "!",
  Slash: "/",
  Asterisk: "*",
  LessThan: "<",
  GreaterThan: ">",

  Comma: ",",
  Semicolon: ";",
  LParen: "(",
  RParen: ")",
  LBrace: "{",
  RBrace: "}",

  // Keywords
  Function: "FUNCTION",
  Let: "LET",
  True: "TRUE",
  False: "FALSE",
  If: "IF",
  Else: "ELSE",
  Return: "RETURN",
} as const;

export type TokenItem = (typeof TokenType)[keyof typeof TokenType];

export type Token = {
  type: TokenItem;
  literal: string;
};

export function createToken(type: TokenItem, literal: string): Token {
  return { type, literal };
}

export const Keywords = {
  fn: createToken(TokenType.Function, "fn"),
  let: createToken(TokenType.Let, "let"),
  true: createToken(TokenType.True, "true"),
  false: createToken(TokenType.False, "false"),
  if: createToken(TokenType.If, "if"),
  else: createToken(TokenType.Else, "else"),
  return: createToken(TokenType.Return, "return"),
} as const;
