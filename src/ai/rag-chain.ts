import { ChatPromptTemplate } from '@langchain/core/prompts';
import type { Document } from '@langchain/core/documents';
import { getVectorStore } from './retriever';
import { getLLM } from './llm';

// Prompt template for RAG chain
const promptTemplate = ChatPromptTemplate.fromTemplate(`
Answer the question based only on the context provided.

Context: {context}

Question: {question}`);

/**
 * Function to format retrieved docs.
 * @param docs - Retrieved docs
 * @returns Formatted docs
 */
const formatDocs = (docs: Document[]) => {
	return docs.map((doc) => JSON.stringify(doc)).join('\n\n');
};

/**
 * Function to process query and retrieve answer.
 * @param query - Query to process
 * @returns Object containing answer and retrieved docs
 */
export async function processQuery(query: string) {
	// get retriever
	const vectorStore = await getVectorStore();
	// perform similarity search and retrieve docs based on query
	const retrievedDocs = await vectorStore.similaritySearch(query);
	// format retrieved docs
	const docsContent = retrievedDocs.map((doc) => doc.pageContent).join('\n');
	// Prepare messages for LLM using the prompt template and retrieved docs
	const messages = await promptTemplate.invoke({
		question: query,
		context: docsContent,
	});
	// get LLM
	const llm = getLLM();
	// invoke LLM to generate answer to the query
	const answer = await llm.invoke(messages);
	// return answer and retrieved docs
	return { answer, docs: formatDocs(retrievedDocs) };
}
