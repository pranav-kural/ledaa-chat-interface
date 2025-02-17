import Link from 'next/link';

export default function PrototypeMessage() {
	return (
		<div className="flex flex-col gap-2 p-10 w-full text-sm text-gray-500 items-center justify-center mt-2">
			<span>
				This project demonstrates a <strong>conversational AI</strong>{' '}
				assistant that can help answer queries related to{' '}
				<Link
					href="https://fragment.dev/docs"
					className="text-blue-500"
					target="_blank"
				>
					Fragement&apos;s Ledger API
				</Link>
				. Since, this prototype is for demonstration purposes only, the
				assistant may not be able to answer all queries.
			</span>
			<span>
				This a basic{' '}
				<Link
					href="https://github.com/pranav-kural/ledaa-chat-interface"
					className="text-blue-500"
					target="_blank"
				>
					Next.js-based frontend
				</Link>{' '}
				(i.e., you may notice the chat interface re-rendering before
				generating responses). Main priority for this prototype is to
				demonstrate an AI assistant for Ledger API documentation and to
				present a <strong>Retrieval Augmented Generation (RAG)</strong>
				-based pipeline and workflow with automation for handling source
				data updates to ensure AI assistant can answer user queries
				related to the documentation <strong>effectively</strong> and
				<strong>accurately</strong>.
			</span>
			<span>
				To learn more about this project, check{' '}
				<Link href="#" className="text-blue-500" target="_blank">
					RAG Workflow with Efficient Ground Truth Updates: Building
					Ledger API Assistant
				</Link>{' '}
				article.
			</span>
		</div>
	);
}
