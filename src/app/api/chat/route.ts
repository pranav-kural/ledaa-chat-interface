import { processQuery } from '@/ai/rag-chain';
import { ChatResponse, DeepChatTextRequestBody } from '@/types/deepChatTypes';
import errorHandler from '@/utils/errorHandler';
import { AIMessageChunk } from '@langchain/core/messages';
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

async function handler(req: NextRequest): Promise<NextResponse<ChatResponse>> {
	// Text messages are stored inside request body using the Deep Chat JSON format:
	// https://deepchat.dev/docs/connect
	const messageRequestBody = (await req.json()) as DeepChatTextRequestBody;

	// extract query from request body
	const query =
		messageRequestBody.messages[messageRequestBody.messages.length - 1]
			.text;

	// if invalid query, return error
	if (!query) {
		throw new Error('Invalid query');
	}

	// process query and get response and retrieved docs used for context
	const {
		answer,
		docs,
	}: {
		answer: AIMessageChunk;
		docs: string;
	} = await processQuery(query);

	// Sends response back to Deep Chat using the Response format:
	// https://deepchat.dev/docs/connect/#Response
	return NextResponse.json<ChatResponse>({
		text: answer.content as string,
		contextDocs: docs,
		history: messageRequestBody.messages,
		usageData: answer.usage_metadata,
	});
}

export const POST = errorHandler(handler);
