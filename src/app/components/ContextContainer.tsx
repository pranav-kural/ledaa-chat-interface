import type { ContextDocument, UsageMetadata } from '@/types/aiTypes';
import { Nunito } from 'next/font/google';

const nunito = Nunito({
	subsets: ['latin'],
});

export default function ContextContainer({
	contextDocs,
	usageMetadata,
}: {
	contextDocs: ContextDocument[];
	usageMetadata?: UsageMetadata;
}) {
	return (
		<div className="bg-slate-100 h-full w-full flex flex-col items-center justify-start z-10 rounded-lg p-5 gap-2 dark:text-black">
			<h1 className={`${nunito.className} text-xl font-bold`}>
				Retrieved Context
			</h1>
			<span className="text-sm px-5">
				Below you will see a list of document chunks retrieved from the
				knowledge base. These chunks were used for query
				contextualization to assist LLM in preparing the response.
			</span>
			<div className="w-full overflow-y-scroll flex flex-col gap-4 mt-3">
				{contextDocs.length > 0 ? (
					contextDocs.map((doc, index) => (
						<div
							key={index}
							className="w-full bg-slate-200 p-5 rounded-lg flex flex-col gap-2 text-xs hover:bg-slate-300"
						>
							<div className="flex flex-row w-full justify-between">
								<div className="flex w-full">
									<span className="fw-bold">ID:</span>
									<span className="ml-2">{doc.id}</span>
								</div>
								<div className="flex w-full">
									<span className="fw-bold">URL:</span>
									<a
										href={doc.metadata.url}
										target="_blank"
										rel="noreferrer"
										className="ml-2 text-blue-600"
									>
										{doc.metadata.url}
									</a>
								</div>
							</div>
							<div className="flex w-full text-sm">
								<span className="ml-2">{doc.pageContent}</span>
							</div>
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
			{usageMetadata && (
				<div className="w-full rounded-lg flex flex-col text-xs mt-auto">
					<div className="flex w-full items-center justify-center mb-1">
						<h2 className="text-sm font-semibold">Query Stats</h2>
					</div>
					<div className="flex flex-row w-full justify-between">
						<div className="flex w-full">
							<span className="fw-bold">Input Tokens:</span>
							<span className="ml-2">
								{' '}
								{usageMetadata.input_tokens}
							</span>
						</div>
						<div className="flex w-full">
							<span className="fw-bold">Output Tokens:</span>
							<span className="ml-2">
								{' '}
								{usageMetadata.output_tokens}
							</span>
						</div>
						<div className="flex w-full">
							<span className="fw-bold">Total Tokens:</span>
							<span className="ml-2">
								{' '}
								{usageMetadata.total_tokens}
							</span>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
