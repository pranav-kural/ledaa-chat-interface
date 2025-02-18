export type ContextDocument = {
	pageContent: string;
	metadata: {
		url: string;
	};
	id: string;
};

export type UsageMetadata = {
	input_tokens: number;
	output_tokens: number;
	total_tokens: number;
};