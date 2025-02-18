'use client';
import dynamic from 'next/dynamic';
import type { RequestDetails } from 'deep-chat/dist/types/interceptors';
import { Response } from 'deep-chat/dist/types/response';
import type { ContextDocument, UsageMetadata } from '@/types/aiTypes';
import { HistoryMessage } from 'deep-chat/dist/types/history';
import { useEffect, useRef } from 'react';
import { DeepChat as DeepChatT } from 'deep-chat';

export default function DeepChatComponent({
	className,
	setContextDocs,
	history,
	setHistory,
	setUsageData,
}: {
	className?: string;
	setContextDocs: (docs: ContextDocument[]) => void;
	history: HistoryMessage[];
	setHistory: (history: HistoryMessage[]) => void;
	setUsageData: (usageData: UsageMetadata) => void;
}) {
	// need to import the component dynamically as it uses the 'window' property
	const DeepChat = dynamic(
		() => import('deep-chat-react').then((mod) => mod.DeepChat),
		{
			ssr: false,
		}
	);

	const chatElementRef = useRef<DeepChatT>(null);

	useEffect(() => {
		import('highlight.js').then((module) => {
			window.hljs = module.default;
			chatElementRef.current?.refreshMessages(); // sometimes hljs may load too late - hence use this method to highlight code
		});
	}, []);

	return (
		<DeepChat
			auxiliaryStyle={`
				#chat-view {
					min-height: 50vh;
					max-height: 70vh;
					overflow-y: auto;
				}
				a {
					color:#2563eb;
				}
			`}
			className={className}
			connect={{ url: '/api/chat' }}
			introMessage={{
				text: 'How can I help you today?',
			}}
			loadHistory={() => {
				console.log('loading history');
				return history;
			}}
			requestBodyLimits={{ maxMessages: -1 }}
			requestInterceptor={(details: RequestDetails) => {
				return details;
			}}
			responseInterceptor={(response: Response) => {
				console.log('processing response');
				if (response.text) {
					console.log('Extracting context docs from response');
					// response we get contains answer and context docs used
					const answer = response.text;
					// set history if available
					if ('history' in response) {
						console.log('Setting history');
						const answerMessage: HistoryMessage = {
							role: 'ai',
							text: answer,
						};
						// get history
						const msgHistory = response.history as HistoryMessage[];
						// add answer message to history
						msgHistory.push(answerMessage);
						// set history
						setHistory(msgHistory);
					}
					// if context docs in response
					if ('contextDocs' in response) {
						console.log('Context docs found in response');
						// context docs are stored in the response as a string
						const contextDocsStr = response.contextDocs as string;
						// parse context docs string to get the actual context docs
						const docs: ContextDocument[] =
							JSON.parse(contextDocsStr);
						// set the context docs in the parent component
						setContextDocs(docs);
					}
					// if usage metadata in response
					if ('usageData' in response) {
						console.log('Usage metadata found in response');
						// usage metadata is stored in the response
						const usageData = response.usageData as UsageMetadata;
						// set the usage metadata in the parent component
						setUsageData(usageData);
					}
					// return response with answer only
					response.text = answer;
				}
				return response;
			}}
			style={{
				height: '100%',
				minHeight: '50vh',
				width: '100%',
				fontSize: '1.05em',
				fontFamily: "'Geist Mono', 'Geist Mono Fallback'",
				border: 'none',
				borderRadius: '15px',
				boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.1)',
			}}
			submitButtonStyles={{
				submit: {
					container: {
						default: {
							backgroundColor: '#e3f0ff',
							padding: '2px',
							// shadow
							boxShadow: '0 0 5px 0 rgba(0, 0, 0, 0.1)',
							transform: 'scale(1.15)',
							marginLeft: '10px',
						},
						hover: { backgroundColor: '#c6e1ff' },
						click: { backgroundColor: '#acd3ff' },
					},
					svg: {
						styles: {
							default: {
								strokeWidth: '2px',
								filter: 'brightness(0) saturate(100%) invert(58%) sepia(53%) saturate(6828%) hue-rotate(214deg) brightness(100%) contrast(100%)',
							},
						},
					},
				},
				disabled: {
					container: {
						default: {
							backgroundColor: '#dee0e1',
							padding: '2px',
							boxShadow: 'unset',
						},
					},
				},
				position: 'outside-right',
			}}
			textInput={{
				styles: {
					container: {
						padding: '2px',
					},
				},
				placeholder: {
					text: 'Enter your query here...',
				},
			}}
			messageStyles={{
				default: {
					shared: {
						bubble: {
							color: 'black',
							padding: '15px',
							backgroundColor: '#e6e6e6',
						},
					},
					user: {
						bubble: { color: 'white', backgroundColor: '#0084FF' },
					},
				},
				intro: {
					bubble: {
						marginTop: '1.5em',
					},
				},
			}}
		/>
	);
}
