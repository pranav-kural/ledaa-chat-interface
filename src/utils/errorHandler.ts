import { NextRequest, NextResponse } from 'next/server';
import { Response } from 'deep-chat/dist/types/response';
import { ChatResponse } from '@/types/deepChatTypes';

type CallbackFunc = (req: NextRequest) => Promise<NextResponse<ChatResponse>>;

export default function errorHandler(callbacFunc: CallbackFunc) {
	return async (req: NextRequest) => {
		try {
			return await callbacFunc(req);
		} catch (error) {
			console.error('API Error:', error);
			// Sends response back to Deep Chat using the Response format:
			// https://deepchat.dev/docs/connect/#Response
			return NextResponse.json<Response>(
				{ error: error as string },
				{ status: 500 }
			);
		}
	};
}
