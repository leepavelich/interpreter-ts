const TokenType = {
  Illegal: "ILLEGAL",
  EOF: "EOF",
  Ident: "IDENT",
  Int: "INT",
  Assign: "=",
  Plus: "+",
  Comma: ",",
  Semicolon: ";",
  LParen: "(",
  RParen: ")",
  LBrace: "{",
  RBrace: "}",
  Function: "FUNCTION",
  Let: "LET",
} as const;

type TokenItem = (typeof TokenType)[keyof typeof TokenType];

export type Token = {
  type: TokenItem;
  literal: string;
};
