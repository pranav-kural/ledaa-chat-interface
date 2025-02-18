import { AIMessageChunk } from '@langchain/core/messages';
import { MessageContent } from 'deep-chat/dist/types/messages';

export interface DeepChatTextRequestBody {
	messages: MessageContent[];
}

export interface ChatResponse {
	text: string;
	contextDocs?: string;
	history?: DeepChatTextRequestBody['messages'];
	usageData?: AIMessageChunk['usage_metadata'];
}
