import * as jspb from 'google-protobuf'



export class ChatMessage extends jspb.Message {
  getUser(): string;
  setUser(value: string): ChatMessage;

  getMessage(): string;
  setMessage(value: string): ChatMessage;

  getTimestamp(): number;
  setTimestamp(value: number): ChatMessage;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ChatMessage.AsObject;
  static toObject(includeInstance: boolean, msg: ChatMessage): ChatMessage.AsObject;
  static serializeBinaryToWriter(message: ChatMessage, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ChatMessage;
  static deserializeBinaryFromReader(message: ChatMessage, reader: jspb.BinaryReader): ChatMessage;
}

export namespace ChatMessage {
  export type AsObject = {
    user: string,
    message: string,
    timestamp: number,
  }
}

export class ChatResponse extends jspb.Message {
  getStatus(): string;
  setStatus(value: string): ChatResponse;

  getMessage(): string;
  setMessage(value: string): ChatResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ChatResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ChatResponse): ChatResponse.AsObject;
  static serializeBinaryToWriter(message: ChatResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ChatResponse;
  static deserializeBinaryFromReader(message: ChatResponse, reader: jspb.BinaryReader): ChatResponse;
}

export namespace ChatResponse {
  export type AsObject = {
    status: string,
    message: string,
  }
}

