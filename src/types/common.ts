export type ResponseType =
  | "idk"
  | "freeform"
  | "generate"
  | "edit"
  | "chat_edit"
  | "lsp_edit";

export interface CodeBlock {
  fileId: number;
  text: string;
  startLine: number;
  endLine: number;
}

export type CodeSymbolType = "import" | "function" | "class" | "variable";
interface CodeSymbol {
  fileName: string;
  name: string;
  type: CodeSymbolType;
}

export interface UserMessage {
  sender: "user";
  conversationId: string;
  message: string;
  msgType: ResponseType;
  sentAt: number;
  currentFile: string | null;
  precedingCode: string | null;
  procedingCode: string | null;
  currentSelection: string | null;
  // Other pieces of info encoded
  otherCodeBlocks: CodeBlock[];
  codeSymbols: CodeSymbol[];
  selection: { from: number; to: number } | null;
  maxOrigLine?: number;
}

export type BotMessageType =
  | "edit"
  | "continue"
  | "markdown"
  | "multifile"
  | "location"
  | "interrupt"
  | "chat_edit"
  | "lsp_edit";

export interface BotMessage {
  sender: "bot";
  sentAt: number;
  type: BotMessageType;
  conversationId: string;
  message: string;
  currentFile: string | null;
  lastToken: string;
  finished: boolean;
  interrupted: boolean;
  rejected?: boolean;
  hitTokenLimit?: boolean;
  maxOrigLine?: number;
  useDiagnostics?: boolean | number;
}
