import { useState } from 'react';

type ContextDoc = {
	title: string;
	content: string;
};

export default function ContextContainer() {
	// eslint-disable-next-line
	const [contextDocs, setContextDocs] = useState<ContextDoc[]>([]);
	return (
		<div className="bg-slate-100 h-full w-full flex flex-col items-center justify-start z-10 rounded-lg p-5 gap-2">
			<h1 className="text-xl fw-bold">Retrieved Context</h1>
			<span className="text-sm px-5">
				Below you will see a list of document chunks retrieved from the
				knowledge base. These chunks were used for query
				contextualization to assist LLM in preparing the response.
			</span>
			{contextDocs.length > 0 ? (
				contextDocs.map((doc, index) => (
					<div
						key={index}
						className="w-full bg-slate-200 p-2 rounded-lg"
					>
						<h2 className="text-lg fw-bold">{doc.title}</h2>
						<p className="text-sm">{doc.content}</p>
					</div>
				))
			) : (
				<div className="w-full bg-slate-200 p-2 rounded-lg text-center mt-10">
					<h2 className="text-lg fw-bold">
						No documents to display yet
					</h2>
				</div>
			)}
		</div>
	);
}
