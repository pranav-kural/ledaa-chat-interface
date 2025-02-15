import { DeepChatTextRequestBody } from '@/types/deepChatTypes';
import errorHandler from '@/utils/errorHandler';
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

async function handler(req: NextRequest) {
	// Text messages are stored inside request body using the Deep Chat JSON format:
	// https://deepchat.dev/docs/connect
	const messageRequestBody = (await req.json()) as DeepChatTextRequestBody;
	console.log(messageRequestBody);
	// Sends response back to Deep Chat using the Response format:
	// https://deepchat.dev/docs/connect/#Response
	return NextResponse.json({
		text: 'some code below\n```java\nwhile (i < 5) {\n console.log("hi");\n i+= 1;\n}\n```',
	});
}

export const POST = errorHandler(handler);
