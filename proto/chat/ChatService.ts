// Original file: proto/chat.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { ChatMessage as _chat_ChatMessage, ChatMessage__Output as _chat_ChatMessage__Output } from '../chat/ChatMessage';
import type { ChatResponse as _chat_ChatResponse, ChatResponse__Output as _chat_ChatResponse__Output } from '../chat/ChatResponse';

export interface ChatServiceClient extends grpc.Client {
  ChatStream(metadata: grpc.Metadata, options?: grpc.CallOptions): grpc.ClientDuplexStream<_chat_ChatMessage, _chat_ChatMessage__Output>;
  ChatStream(options?: grpc.CallOptions): grpc.ClientDuplexStream<_chat_ChatMessage, _chat_ChatMessage__Output>;
  chatStream(metadata: grpc.Metadata, options?: grpc.CallOptions): grpc.ClientDuplexStream<_chat_ChatMessage, _chat_ChatMessage__Output>;
  chatStream(options?: grpc.CallOptions): grpc.ClientDuplexStream<_chat_ChatMessage, _chat_ChatMessage__Output>;
  
  GetMessagesStream(argument: _chat_ChatMessage, metadata: grpc.Metadata, options?: grpc.CallOptions): grpc.ClientReadableStream<_chat_ChatMessage__Output>;
  GetMessagesStream(argument: _chat_ChatMessage, options?: grpc.CallOptions): grpc.ClientReadableStream<_chat_ChatMessage__Output>;
  getMessagesStream(argument: _chat_ChatMessage, metadata: grpc.Metadata, options?: grpc.CallOptions): grpc.ClientReadableStream<_chat_ChatMessage__Output>;
  getMessagesStream(argument: _chat_ChatMessage, options?: grpc.CallOptions): grpc.ClientReadableStream<_chat_ChatMessage__Output>;
  
  SendMessage(argument: _chat_ChatMessage, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_chat_ChatResponse__Output>): grpc.ClientUnaryCall;
  SendMessage(argument: _chat_ChatMessage, metadata: grpc.Metadata, callback: grpc.requestCallback<_chat_ChatResponse__Output>): grpc.ClientUnaryCall;
  SendMessage(argument: _chat_ChatMessage, options: grpc.CallOptions, callback: grpc.requestCallback<_chat_ChatResponse__Output>): grpc.ClientUnaryCall;
  SendMessage(argument: _chat_ChatMessage, callback: grpc.requestCallback<_chat_ChatResponse__Output>): grpc.ClientUnaryCall;
  sendMessage(argument: _chat_ChatMessage, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_chat_ChatResponse__Output>): grpc.ClientUnaryCall;
  sendMessage(argument: _chat_ChatMessage, metadata: grpc.Metadata, callback: grpc.requestCallback<_chat_ChatResponse__Output>): grpc.ClientUnaryCall;
  sendMessage(argument: _chat_ChatMessage, options: grpc.CallOptions, callback: grpc.requestCallback<_chat_ChatResponse__Output>): grpc.ClientUnaryCall;
  sendMessage(argument: _chat_ChatMessage, callback: grpc.requestCallback<_chat_ChatResponse__Output>): grpc.ClientUnaryCall;
  
  SendMessageStream(metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_chat_ChatResponse__Output>): grpc.ClientWritableStream<_chat_ChatMessage>;
  SendMessageStream(metadata: grpc.Metadata, callback: grpc.requestCallback<_chat_ChatResponse__Output>): grpc.ClientWritableStream<_chat_ChatMessage>;
  SendMessageStream(options: grpc.CallOptions, callback: grpc.requestCallback<_chat_ChatResponse__Output>): grpc.ClientWritableStream<_chat_ChatMessage>;
  SendMessageStream(callback: grpc.requestCallback<_chat_ChatResponse__Output>): grpc.ClientWritableStream<_chat_ChatMessage>;
  sendMessageStream(metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_chat_ChatResponse__Output>): grpc.ClientWritableStream<_chat_ChatMessage>;
  sendMessageStream(metadata: grpc.Metadata, callback: grpc.requestCallback<_chat_ChatResponse__Output>): grpc.ClientWritableStream<_chat_ChatMessage>;
  sendMessageStream(options: grpc.CallOptions, callback: grpc.requestCallback<_chat_ChatResponse__Output>): grpc.ClientWritableStream<_chat_ChatMessage>;
  sendMessageStream(callback: grpc.requestCallback<_chat_ChatResponse__Output>): grpc.ClientWritableStream<_chat_ChatMessage>;
  
}

export interface ChatServiceHandlers extends grpc.UntypedServiceImplementation {
  ChatStream: grpc.handleBidiStreamingCall<_chat_ChatMessage__Output, _chat_ChatMessage>;
  
  GetMessagesStream: grpc.handleServerStreamingCall<_chat_ChatMessage__Output, _chat_ChatMessage>;
  
  SendMessage: grpc.handleUnaryCall<_chat_ChatMessage__Output, _chat_ChatResponse>;
  
  SendMessageStream: grpc.handleClientStreamingCall<_chat_ChatMessage__Output, _chat_ChatResponse>;
  
}

export interface ChatServiceDefinition extends grpc.ServiceDefinition {
  ChatStream: MethodDefinition<_chat_ChatMessage, _chat_ChatMessage, _chat_ChatMessage__Output, _chat_ChatMessage__Output>
  GetMessagesStream: MethodDefinition<_chat_ChatMessage, _chat_ChatMessage, _chat_ChatMessage__Output, _chat_ChatMessage__Output>
  SendMessage: MethodDefinition<_chat_ChatMessage, _chat_ChatResponse, _chat_ChatMessage__Output, _chat_ChatResponse__Output>
  SendMessageStream: MethodDefinition<_chat_ChatMessage, _chat_ChatResponse, _chat_ChatMessage__Output, _chat_ChatResponse__Output>
}
