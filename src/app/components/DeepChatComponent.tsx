import dynamic from 'next/dynamic';
import { RequestDetails } from 'deep-chat/dist/types/interceptors';

export default function DeepChatComponent({
	className,
}: {
	className?: string;
}) {
	// need to import the component dynamically as it uses the 'window' property
	const DeepChat = dynamic(
		() => import('deep-chat-react').then((mod) => mod.DeepChat),
		{
			ssr: false,
		}
	);

	return (
		<DeepChat
			className={className}
			connect={{ url: '/api/custom/chat' }}
			introMessage={{
				text: 'How can I help you today?',
			}}
			requestBodyLimits={{ maxMessages: -1 }}
			requestInterceptor={(details: RequestDetails) => {
				console.log(details);
				return details;
			}}
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			responseInterceptor={(response: any) => {
				console.log(response);
				return response;
			}}
			style={{
				height: '100%',
				width: '100%',
				fontSize: '1.15em',
				fontFamily: "'Open Sans', 'Open Sans Fallback'",
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
						bubble: { color: 'black', padding: '15px' },
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
