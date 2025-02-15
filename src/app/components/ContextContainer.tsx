export default function ContextContainer() {
	return (
		<div className="bg-slate-100 h-full w-full flex flex-col items-center justify-start z-10 rounded-lg p-5 gap-2">
			<h1 className="text-xl fw-bold">Retrieved Context</h1>
			<span className="text-sm px-5">
				Below you will see a list of document chunks retrieved from the
				knowledge base. These chunks were used for query
				contextualization to assist LLM in preparing the response.
			</span>
		</div>
	);
}
