import { ChatGoogleGenerativeAI } from '@langchain/google-genai';

// Constants
const LLM_MODEL_NAME = 'gemini-1.5-pro';
const LLM_TEMPERATURE = 0.7;

// Singleton LLM instance
let llm: ChatGoogleGenerativeAI | undefined;

/**
 * Function to get LLM instance.
 * @returns ChatGoogleGenerativeAI instance for LLM
 */
export function getLLM(): ChatGoogleGenerativeAI {
	// if LLM is not initialized, initialize it
	if (!llm) {
		try {
			// Confirm environment variables are set
			if (!process.env.GOOGLE_API_KEY) {
				throw new Error(
					'getLLM: Required environment variables are not set'
				);
			}

			// Initialize LLM
			llm = new ChatGoogleGenerativeAI({
				apiKey: process.env.GOOGLE_API_KEY,
				model: LLM_MODEL_NAME,
				temperature: LLM_TEMPERATURE,
			});
		} catch (error) {
			throw new Error(`Unable to initialize LLM: ${error}`);
		}
	}
	// Return LLM instance
	return llm;
}
