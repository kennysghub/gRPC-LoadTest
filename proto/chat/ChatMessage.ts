// Original file: proto/chat.proto

import type { Long } from '@grpc/proto-loader';

export interface ChatMessage {
  'user'?: (string);
  'message'?: (string);
  'timestamp'?: (number | string | Long);
}

export interface ChatMessage__Output {
  'user'?: (string);
  'message'?: (string);
  'timestamp'?: (Long);
}
